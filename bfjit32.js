var ref = require("ref");
var ffi = require("ffi");
var os  = process.platform;

var jitalloc = (function() {
  if (os == "win32") {
    var kernel32 = ffi.Library("kernel32", {
      "VirtualAlloc": ["pointer", ["pointer", "size_t", "int", "int"]],
      "VirtualFree": ["bool", ["pointer", "int", "int"]],
    });

    var MEM_COMMIT  = 0x1000;
    var MEM_RELEASE = 0x8000;
    var PAGE_EXECUTE_READWRITE = 0x40;

    return function(size) {
      var p = kernel32.VirtualAlloc(ref.NULL, size,
                                    MEM_COMMIT, PAGE_EXECUTE_READWRITE);
      var ret = p.reinterpret(size);
      ret.free = function() {
        kernel32.VirtualFree(p, 0, MEM_RELEASE);
      };
      return ret;
    };
  } else {
    var libc = ffi.Library("libc", {
      "mmap": ["pointer", ["pointer", "size_t", "int", "int", "int", "int64"]],
      "munmap": ["int", ["pointer", "size_t"]],
    });

    var PROT_READ   = 1;
    var PROT_WRITE  = 2;
    var PROT_EXEC   = 4;
    var MAP_PRIVATE = 2;
    var MAP_ANON    = os == "linux" || os == "linux2" ? 0x20 : 0x1000;

    return function(size) {
      var p = libc.mmap(ref.NULL, size,
                        PROT_READ | PROT_WRITE | PROT_EXEC,
                        MAP_PRIVATE | MAP_ANON, -1, 0);
      var ret = p.reinterpret(size);
      ret.free = function() {
        libc.munmap(p, size);
      };
      return ret;
    };
  }
})();

// 32ビットの数字をリトルエンディアンに変換する
function conv32(x) {
   return String.fromCharCode( x        & 0xff) +
          String.fromCharCode((x >>  8) & 0xff) +
          String.fromCharCode((x >> 16) & 0xff) +
          String.fromCharCode((x >> 24) & 0xff);
}

function main(src) {

  var codes = "";
  var begin = [];
  codes += "\x56"; // push esi
  codes += "\x8b\x74\x24\x08"; // mov esi, [esp+8]

  for (var pc = 0; pc < src.length; pc++) {
    switch (src[pc]) {
    case "+":
      codes += "\xfe\x06";                 // inc byte ptr[esi]
      break;
    case "-":
      codes += "\xfe\x0e";                 // dec byte ptr[esi]
      break;
    case ">":
      codes += "\x46";                     // inc esi
      break;
    case "<":
      codes += "\x4e";                     // dec esi
      break;
    case "[":
      begin.push(codes.length);
      codes += "\x80\x3e\x00";             // cmp byte ptr[esi], 0
      codes += "\x0f\x84\x00\x00\x00\x00"; // jz near ????
      break;
    case "]":
      var ad1 = begin.pop();
      var ad2 = codes.length + 5;
      codes = codes.substring(0, ad1 + 5) +
              conv32(ad2 - (ad1 + 9)) +
              codes.substring(ad1 + 9);
      codes += "\xe9" + conv32(ad1 - ad2); // jmp near begin
      break;
    case ".":
      codes += "\x0f\xb6\x06";             // movzx eax, byte ptr[esi]
      codes += "\x50";                     // push eax
      codes += "\xff\x54\x24\x10";         // call [esp+16]
      codes += "\x83\xc4\x04";             // add esp, 4
      break;
    case ",":
      codes += "\xff\x54\x24\x10";         // call [esp+16]
      codes += "\x88\x06";                 // mov byte ptr[esi], al
      break;
    }
  }
  codes += "\x5e";                         // pop esi
  codes += "\xc3";                         // ret

  var buf = jitalloc(codes.length);
  buf.binaryWrite(codes, 0);

  var func = ffi.ForeignFunction(buf, "void", ["pointer", "pointer", "pointer"]);
  var mem = new Buffer(30000);
  mem.fill(0, 0, 30000);

  var libcName = os == "win32" ? "msvcrt" : "libc" + ffi.Library.EXT;
  var dl = new ffi.DynamicLibrary(libcName, ffi.RTLD_NOW);
  var getchar = dl.get("getchar");
  var putchar = dl.get("putchar");
  func(mem, putchar, getchar);

  buf.free();
}

if (process.argv.length < 2) {
  console.log('missing argument.');
  return;
}

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, src) {
  main(src);
});


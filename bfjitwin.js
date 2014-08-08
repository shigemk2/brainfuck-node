var ref = require("ref");
var ffi = require("ffi");

var mem = new Uint8Array(30000);
var src = "";
var pc = 0;
var reg = 0;
var buf = "";

function main() {
  var kernel32 = ffi.Library("kernel32", {
    "VirtualAlloc": ["pointer", ["pointer", "size_t", "int", "int"]],
    "VirtualFree": ["bool", ["pointer", "int", "int"]]
  });

  var MEM_COMMIT  = 0x1000;
  var MEM_RELEASE = 0x8000;
  var PAGE_EXECUTE_READWRITE = 0x40;

  function jitalloc(size) {
    var p = kernel32.VirtualAlloc(ref.NULL, size,
                                  MEM_COMMIT, PAGE_EXECUTE_READWRITE);
    var ret = p.reinterpret(size);
    ret.free = function() {
      kernel32.VirtualFree(p, 0, MEM_RELEASE);
    };
    return ret;
  }

  var buf = jitalloc(30000);

  if (ref.sizeof.pointer == 4) {
    // 32bit (i386)
    buf.binaryWrite(
      "\x8b\x44\x24\x04" +    // mov eax, [esp+4]
      "\x03\x44\x24\x08" +    // add eax, [esp+8]
      "\xc3", 0);             // ret
  } else {
    // 64bit (x86-64)
    buf.binaryWrite(
      "\x89\xc8" +            // mov eax, ecx
      "\x01\xd0" +            // add eax, edx
      "\xc3", 0);             // ret
  }

  var func = ffi.ForeignFunction(buf, "int", ["int", "int"]);
  console.log(func(1, 2));

  buf.free();
  for (;;) {
    if (pc >= src.length) process.exit(0);
    // console.log("pc=%d src[pc]=%s reg=%d mem[%d]=%d\n",
    //   pc, src[pc], reg, reg, mem[reg]);
    switch (src[pc]) {
    case "-":
      mem[reg]--;
      break;
    case "+":
      mem[reg]++;
      break;
    case "<":
      reg--;
      break;
    case ">":
      reg++;
      break;
    case "[":
      if (mem[reg] !== 0) {
        break;
      };
      var nest = 0;
      while (pc < src.length) {
        if (src[pc] === "[") {
          nest++;
        } else if (src[pc] === "]") {
          nest--;
          if (nest === 0) {
            break;
          };
        };
        pc++;
      }
      break;
    case "]":
      if (mem[reg] === 0) {
        break;
      };
      var nest = 0;
      while (pc >= 0) {
        if (src[pc] === "]") {
          nest++;
        } else if (src[pc] === "[") {
          nest--;
          if (nest === 0) {
            break;
          };
        }
        pc--;
      }
      break;
    case ".":
//      process.stdout.write(String.fromCharCode(mem[reg]));
      break;
    case ",":
      if (buf.length == 0) return;
      mem[reg] = buf.charCodeAt(0);
      buf = buf.substring(1);
      break;
    default:
      break;
    }
    pc++;
  }

}

if (process.argv.length < 2) {
  console.log('missing argument.');
  return;
}

process.stdin.on('data', function(chunk) {
  buf += chunk;
  main();
});

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, s) {
  src = s;
  main();
});


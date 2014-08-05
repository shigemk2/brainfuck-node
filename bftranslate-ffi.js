function main(src) {
  var data = "", pc = 0;
  data += "var ffi = require('ffi');\n";
  data += "var libcName = process.platform == 'win32' ? 'msvcrt' : 'libc';\n";
  data += "var libc = ffi.Library(libcName, {\n";
  data += "  'putchar': ['int', ['int']],\n";
  data += "  'getchar': ['int', []],\n";
  data += "});\n";
  data += "var mem = new Uint8Array(30000);\n";
  data += "var r = 0;\n";
  while( pc <= src.length ) {
    // console.log(src[pc]);
    switch (src[pc]) {
    case '+':
      data += "mem[r]++; /* + */\n";
      break;
    case '-':
      data += "mem[r]--; /* - */\n";
      break;
    case '>':
      data += "r++; /* > */\n";
      break;
    case '<':
      data += "r--; /* < */\n";
      break;
    case '[':
      data += "while (mem[r]) { /* [ */\n";
      break;
    case ']':
      data += "} /* ] */\n";
      break;
    case '.':
      data += "libc.putchar(mem[r]); /* . */\n";
      break;
    case ',':
      data += "mem[r] = libc.getchar(); /* , */\n";
      break;
    }
    pc++;
  }
  return data;
}

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, src) {
  var data = main(src);
  fs.writeFile(process.argv[3], data , function (err) {
    // console.log(data);
    // console.log(err);
  });
});

var indent = "", data = "";

function write(line) {
  data += indent + line + "\n";
}

function main(src) {
  var pc = 0;
  write("var ffi = require('ffi');");
  write("var libcName = process.platform == 'win32' ? 'msvcrt' : 'libc';");
  write("var libc = ffi.Library(libcName, {");
  write("  'putchar': ['int', ['int']],");
  write("  'getchar': ['int', []],");
  write("});");
  write("var mem = new Uint8Array(30000);");
  write("var r = 0;");
  while( pc <= src.length ) {
    // console.log(src[pc]);
    switch (src[pc]) {
    case '+':
      write("mem[r]++; // +");
      break;
    case '-':
      write("mem[r]--; // -");
      break;
    case '>':
      write("r++; // >");
      break;
    case '<':
      write("r--; // <");
      break;
    case '[':
      write("while (mem[r]) { // [");
      indent += "  ";
      break;
    case ']':
      indent = indent.slice(0, -2);
      write("} // ]");
      break;
    case '.':
      write("libc.putchar(mem[r]); // .");
      break;
    case ',':
      write("mem[r] = libc.getchar(); // ,");
      break;
    }
    pc++;
  }
}

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, src) {
  main(src);
  fs.writeFile(process.argv[3], data , function (err) {
    // console.log(data);
    // console.log(err);
  });
});

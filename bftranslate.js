var mem = new Uint8Array(30000);
var src = "";
var pc = 0;

function main() {
  var data = '';
  console.log(process.argv.length);
  if (process.argv.length < 2) {
    console.log("source nothing\n");
    return data;
  }
  data += "var mem = new Uint8Array(30000);\n";
  data += "var r = 0;\n";
  data += "var buf = '';\n";
  data += "function main() {\n";
  var plus     = "mem[r]++; /* + */\n";
  var minus    = "mem[r]--; /* - */\n";
  var whileo   = "while (mem[r]) { /* [ */\n";
  var whilec   = "}; /* ] */\n";
  var memplus  = "r++; /* > */\n";
  var memminus = "r--; /* < */\n";
  var pchar    = "process.stdout.write(String.fromCharCode(mem[r])); /* . */\n";
  var gchar    = "if (buf.length == 0) return;\n";
  gchar += "mem[r] = buf.charCodeAt(0);\n";
  gchar += "buf = buf.substring(1);\n";
  var gchar_flg = false;

  var return0  = "return;\n";

  while( pc <= src.length ){
    console.log(src[pc]);
    switch (src[pc]) {
    case '+':
      data += plus;
      break;
    case '-':
      data += minus;
      break;
    case '>':
      data += memplus;
      break;
    case '<':
      data += memminus;
      break;
    case '[':
      data += whileo;
      break;
    case ']':
      data += whilec;
      break;
    case '.':
      data += pchar;
      break;
    case ',':
      data += gchar;
      gchar_flg = true;
      break;
    }
    pc++;
  }
  data += "};\n";
  if (gchar_flg === true) {
    data += "process.stdin.on('data', function(chunk) { buf += chunk; main(); });\n";
  } else {
    data += "main();\n";
  };

  return data;
}

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, s) {
  src = s;
  var data = main();
  fs.writeFile(process.argv[3], data , function (err) {
    console.log(data);
    console.log(err);
  });
});

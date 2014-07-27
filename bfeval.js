var mem = new Uint8Array(30000);
var src = "";
var pc = 0;
var gchar_flg = false;
var hascomma = [];
var pos = [0];

function set_data(pc, data) {
  var plus     = "mem[r]++; /* + */\n";
  var minus    = "mem[r]--; /* - */\n";
  var whileo   = "while (mem[r]) { /* [ */\n";
  var whilec   = "} /* ] */\n";
  var memplus  = "r++; /* > */\n";
  var memminus = "r--; /* < */\n";
  var pchar    = "putchar(); /* . */\n";
  var gchar    = "if(! getchar()) return pc = [1, 1]; /* , */ \n";

  var return0  = "return;\n";

  while( pc <= src.length ) {
    // console.log(src[pc]);
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
      if (hascomma[pc]) {
        data += "case " + (++pos[pos.length - 1]) + ":\n";
        data += "while (pc.length || mem[r]) { /* [ */\n";
        data += "switch (pc.pop()) {\n";
        data += "default:\n";
      } else {
        data += whileo;
      }
      pos.push(0);
      break;
    case ']':
      if (hascomma[pc]) {
        data += "}\n";
      }
      pos.pop();
      data += whilec;
      break;
    case '.':
      data += pchar;
      break;
    case ',':
      pos.reverse();
      ++pos[0];
      data += "if(! getchar()) return pc = ["+ pos.join(", ") + "];\n";
      data += "case " + pos[0] + ":\n";
      pos.reverse();
      break;
    }
    pc++;
  }
  return data;
}

function main() {
  var bracket = [];
  for (var i = 0; i < src.length; ++i) {
    hascomma[i] = 0;
    switch (src[i]) {
    case "[":
      bracket.push(i);
      break;
    case "]":
      hascomma[i] = hascomma[bracket.pop()];
      break;
    case ",":
      gchar_flg = true;
      for (var j = 0; j < bracket.length; ++j) {
        ++hascomma[bracket[j]];
      }
      break;
    }
  }
  // console.log(hascomma);
  var data = '';
  // console.log(process.argv.length);
  if (process.argv.length < 2) {
    console.log("source nothing\n");
    return data;
  }

  data += "var mem = new Uint8Array(30000);\n";
  data += "var r = 0;\n";
  data += "var buf = '';\n";
  data += "var pc = [];\n";
  data += "function putchar() { process.stdout.write(String.fromCharCode(mem[r]));}\n";
  data += "function getchar() { if (buf.length == 0) return false; mem[r] = buf.charCodeAt(0); buf = buf.substring(1); return true; }\n";
  data += "function main() {\n";
  if (gchar_flg) {
    data += "switch (pc.pop()) {\n";
    data += "default:\n";
  }
  data = set_data(pc, data);
  if(gchar_flg) {
    data += "}\n";
  }
  data += "process.exit(0);\n";
  data += "}\n";
  if (gchar_flg === true) {
    data += "process.stdin.on('data', function(chunk) { buf += chunk; getchar(); main(); });\n";
  }
  data += "main();\n";

  return data;
}

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, s) {
  src = s;
  var data = main();
  // 無名関数にすると参照関係が自己完結となり、変数のスコープが狭くなるので処理が早くなる
  // http://blog.as-is.net/2008/09/chrome-eval-cont.html
  eval("(function() {" + data + "})();");
});

var mem = new Uint8Array(30000);
var src = "";
var pc = 0;
var gchar_flg = false;
var hascomma = [];
var pos = [0];

function set_data(pc, data) {
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
      if (hascomma[pc]) {
        data += "case " + (++pos[pos.length - 1]) + ":\n";
        data += "while (pc.length || mem[r]) { /* [ */\n";
        data += "switch (pc.pop()) {\n";
        data += "default:\n";
      } else {
        data += "while (mem[r]) { /* [ */\n";
      }
      pos.push(0);
      break;
    case ']':
      if (hascomma[pc]) {
        data += "}\n";
      }
      pos.pop();
      data += "} /* ] */\n";
      break;
    case '.':
      data += "putchar(); /* . */\n";
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
  // console.log('hascomma: %s', hascomma);
  // console.log('bracket: %s', bracket);
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
  fs.writeFile(process.argv[3], data , function (err) {
    // console.log(data);
    // console.log(err);
  });
});

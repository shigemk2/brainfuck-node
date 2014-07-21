var mem = new Uint8Array(30000);
var src = "";
var pc = 0;
var reg = 0;

function main() {
  while (pc < src.length) {
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
      process.stdout.write(String.fromCharCode(mem[reg]));
      break;
    case ",":
      mem[reg] = process.openStdin();
      break;
    default:
      break;
    }
    pc++;
  }
}

if (process.argv.length < 3) {
  console.log('missing argument.');
  return;
}

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, s) {
  src = s;
  main();
});

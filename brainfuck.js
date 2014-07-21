var mem = new Uint8Array(30000);
var src = "";
var pc = 0;

function main() {
  var curmem = 0;

  while (pc < src.length) {
    // console.log("pc=%d src[pc]=%s curmem=%d mem[%d]=%d\n",
    //   pc, src[pc], curmem, curmem, mem[curmem]);
    switch (src[pc]) {
    case "-":
      mem[curmem]--;
      break;
    case "+":
      mem[curmem]++;
      break;
    case "<":
      curmem--;
      break;
    case ">":
      curmem++;
      break;
    case "[":
      if (mem[curmem] !== 0) {
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
      if (mem[curmem] === 0) {
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
      process.stdout.write(String.fromCharCode(mem[curmem]));
      break;
    case ",":
      mem[curmem] = process.openStdin();
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

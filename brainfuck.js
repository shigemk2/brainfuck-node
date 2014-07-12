function main(text) {
  var mem    = [0,0,0,0,0,0,0,0];
  var curmem = 0;
  var i      = 0;
  var nest   = 0;

  while (i < text.length) {
    // console.log("i=%d text[i]=%s curmem=%d mem[%d]=%d nest=%d\n",
    //   i, text[i], curmem, curmem, mem[curmem], nest);
    switch (text[i]) {
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
      nest = 0;
      while (i < text.length) {
        if (text[i] === "[") {
          nest++;
        } else if (text[i] === "]") {
          nest--;
          if (nest === 0) {
            break;
          };
        };
        i++;
      }
      break;
    case "]":
      if (mem[curmem] === 0) {
        break;
      };
      nest = 0;
      while (i >= 0) {
        if (text[i] === "]") {
          nest++;
        } else if (text[i] === "[") {
          nest--;
          if (nest === 0) {
            break;
          };
        }
        i--;
      }
      break;
    case ".":
      console.log(String.fromCharCode(mem[curmem]));
      break;
    case ",":
      // mem[curmem] = Console.in.read;
      break;
    default:
      break;
    }
    i++;
  }
}

if (process.argv.length < 3) {
  console.log('missing argument.');
  return;
}

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, text) {
  main(text);
});

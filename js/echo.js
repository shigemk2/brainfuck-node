var mem = new Uint8Array(30000);
var r = 0;
var buf = '';
function putchar() {
  process.stdout.write(String.fromCharCode(mem[r]));
};

function getchar() {
  if (buf.length == 0) { return false; };
  mem[r] = buf.charCodeAt(0);
  buf = buf.substring(1);
  return true;
};
function main() {
r++; /* > */
r++; /* > */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r++; /* > */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
r--; /* < */
}; /* ] */
r++; /* > */
r++; /* > */
r++; /* > */
r++; /* > */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r++; /* > */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
r--; /* < */
}; /* ] */
r++; /* > */
while (mem[r]) { /* [ */
r--; /* < */
r--; /* < */
// if (buf.length == 0) return;
// console.log('\nbuf: %s', buf);
// mem[r] = buf.charCodeAt(0);
// buf = buf.substring(1);
if(! getchar()) return;
while (mem[r]) { /* [ */
mem[r]--; /* - */
r++; /* > */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
mem[r]++; /* + */
r++; /* > */
r++; /* > */
r++; /* > */
}; /* ] */
r--; /* < */
r--; /* < */
r--; /* < */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r++; /* > */
r++; /* > */
r++; /* > */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
r--; /* < */
}; /* ] */
r++; /* > */
r++; /* > */
r++; /* > */
r++; /* > */
r++; /* > */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r++; /* > */
mem[r]++; /* + */
r++; /* > */
r++; /* > */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
r--; /* < */
}; /* ] */
r++; /* > */
while (mem[r]) { /* [ */
r--; /* < */
r--; /* < */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r++; /* > */
mem[r]++; /* + */
r++; /* > */
r++; /* > */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
r--; /* < */
}; /* ] */
r++; /* > */
r++; /* > */
r++; /* > */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r--; /* < */
r--; /* < */
r--; /* < */
mem[r]++; /* + */
r++; /* > */
r++; /* > */
r++; /* > */
}; /* ] */
r--; /* < */
r--; /* < */
while (mem[r]) { /* [ */
while (mem[r]) { /* [ */
mem[r]--; /* - */
}; /* ] */
r--; /* < */
mem[r]--; /* - */
r++; /* > */
}; /* ] */
r++; /* > */
mem[r]--; /* - */
}; /* ] */
r++; /* > */
r++; /* > */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r--; /* < */
r--; /* < */
r--; /* < */
mem[r]++; /* + */
r++; /* > */
r++; /* > */
r++; /* > */
}; /* ] */
r--; /* < */
r--; /* < */
r--; /* < */
r--; /* < */
r--; /* < */
r--; /* < */
r--; /* < */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r--; /* < */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
mem[r]++; /* + */
r++; /* > */
r++; /* > */
r++; /* > */
}; /* ] */
r--; /* < */
while (mem[r]) { /* [ */
r++; /* > */
r++; /* > */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r--; /* < */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
mem[r]++; /* + */
r++; /* > */
r++; /* > */
r++; /* > */
}; /* ] */
r--; /* < */
r--; /* < */
r--; /* < */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r++; /* > */
r++; /* > */
r++; /* > */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
r--; /* < */
}; /* ] */
r++; /* > */
r++; /* > */
while (mem[r]) { /* [ */
while (mem[r]) { /* [ */
mem[r]--; /* - */
}; /* ] */
r++; /* > */
mem[r]--; /* - */
r--; /* < */
}; /* ] */
r--; /* < */
mem[r]--; /* - */
}; /* ] */
r--; /* < */
r--; /* < */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r++; /* > */
r++; /* > */
r++; /* > */
mem[r]++; /* + */
r--; /* < */
r--; /* < */
r--; /* < */
}; /* ] */
r++; /* > */
r++; /* > */
r++; /* > */
r++; /* > */
r++; /* > */
r--; /* < */
while (mem[r]) { /* [ */
while (mem[r]) { /* [ */
mem[r]--; /* - */
}; /* ] */
r++; /* > */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
r++; /* > */
while (mem[r]) { /* [ */
while (mem[r]) { /* [ */
mem[r]--; /* - */
}; /* ] */
r--; /* < */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
mem[r]--; /* - */
r++; /* > */
}; /* ] */
r--; /* < */
r--; /* < */
}; /* ] */
r++; /* > */
r++; /* > */
while (mem[r]) { /* [ */
mem[r]--; /* - */
}; /* ] */
r--; /* < */
// process.stdout.write(String.fromCharCode(mem[r])); /* . */
putchar();
r++; /* > */
r++; /* > */
}; /* ] */
};
process.stdin.on('data', function(chunk) { buf += chunk; main(); });

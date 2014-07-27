var mem = new Uint8Array(30000);
var r = 0;
var buf = '';
var pc = [];
function putchar() { process.stdout.write(String.fromCharCode(mem[r]))};
function getchar() { if (buf.length == 0) return false; mem[r] = buf.charCodeAt(0); buf = buf.substring(1); return true; }
;function main() {
switch (pc.pop()) {
default:
mem[r]++; /* + */
while (mem[r]) { /* [ */
r++; /* > */
if(! getchar()) return true; /* , */ 
putchar(); /* . */
r--; /* < */
}; /* ] */
};
};
process.stdin.on('data', function(chunk) { buf += chunk; main(); });

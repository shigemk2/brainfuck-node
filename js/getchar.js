var mem = new Uint8Array(30000);
var r = 0;
var buf = '';
var pc = [];
function putchar() { process.stdout.write(String.fromCharCode(mem[r]));}
function getchar() { if (buf.length == 0) return false; mem[r] = buf.charCodeAt(0); buf = buf.substring(1); return true; }
function main() {
switch (pc.pop()) {
default:
mem[r]++; /* + */
case 1:
while (pc.length || mem[r]) { /* [ */
switch (pc.pop()) {
default:
r++; /* > */
if(! getchar()) return pc = [1, 1];
case 1:
putchar(); /* . */
r--; /* < */
}
} /* ] */
}
process.exit(0);
}
process.stdin.on('data', function(chunk) { buf += chunk; getchar(); main(); });
main();

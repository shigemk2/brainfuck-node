var mem = new Uint8Array(30000);
var r = 0;
var buf = '';
var pc = [];
function putchar() { process.stdout.write(String.fromCharCode(mem[r]));}
function getchar() { if (buf.length == 0) return false; mem[r] = buf.charCodeAt(0); buf = buf.substring(1); return true; }
function main() {
mem[r]++; /* + */
r++; /* > */
mem[r]++; /* + */
mem[r]++; /* + */
r++; /* > */
r--; /* < */
r--; /* < */
r++; /* > */
while (mem[r]) { /* [ */
mem[r]--; /* - */
r--; /* < */
mem[r]++; /* + */
r++; /* > */
} /* ] */
r--; /* < */
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
putchar(); /* . */
process.exit(0);
}
main();

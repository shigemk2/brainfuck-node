var mem = new Uint8Array(30000);
var r = 0;
var buf = '';
function main() {
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
while (mem[r]) { /* [ */
r++; /* > */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
mem[r]++; /* + */
r--; /* < */
mem[r]--; /* - */
}; /* ] */
mem[r]++; /* + */
while (mem[r]) { /* [ */
r++; /* > */
process.stdout.write(String.fromCharCode(mem[r])); /* . */
r++; /* > */
if (buf.length == 0) return;
mem[r] = buf.charCodeAt(0);
buf = buf.substring(1);
process.stdout.write(String.fromCharCode(mem[r])); /* . */
r--; /* < */
r--; /* < */
}; /* ] */
};
process.stdin.on('data', function(chunk) { buf += chunk; main(); });

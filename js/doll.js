var ffi = require('ffi');
var libc = ffi.Library('libc.dylib', {
  'putchar': ['int', ['int']],
  'getchar': ['int', []],
});
var mem = new Uint8Array(30000);
var r = 0;
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
} /* ] */
mem[r]++; /* + */
while (mem[r]) { /* [ */
r++; /* > */
libc.putchar(mem[r]); /* . */
r++; /* > */
mem[r] = libc.getchar(); /* , */
libc.putchar(mem[r]); /* . */
r--; /* < */
r--; /* < */
} /* ] */

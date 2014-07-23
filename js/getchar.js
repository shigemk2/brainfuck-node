var mem = new Uint8Array(30000);
var r = 0;
    /* + */ mem[r]++;
    /* [ */ while (mem[r]) {
    /* > */ r++;
    /* , */ process.stdin.on('data', function(chunk) {  mem[r] += chunk; });
    /* . */ process.stdout.write(String.fromCharCode(mem[r]));;
    /* < */ r--;
    /* ] */ };

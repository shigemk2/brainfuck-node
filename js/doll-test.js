var mem = new Uint8Array(30000);
var reg = 0;
var pc  = [];
var buf = "";
 
function putchar() {
    process.stdout.write(String.fromCharCode(mem[reg]));
}
 
function getchar() {
    if (buf.length == 0) return false;
    mem[reg] = buf.charCodeAt(0);
    buf = buf.substring(1);
    return true;
}
 
function main() {
    switch (pc.pop()) {
        default:
            mem[reg] += 6; // ++++++
            while (mem[reg]) { // [
                reg++; // >
                mem[reg] += 6; // ++++++
                reg--; // <
                mem[reg]--; // -
            } // ]
            mem[reg]++; // +
        case 1:
            while (pc.length || mem[reg]) { // [
                switch (pc.pop()) {
                    default:
                        reg++; // >
                        putchar(); // .
                        reg++; // >
                        if (!getchar()) return pc = [1, 1]; // ,
                    case 1:
                        putchar(); // .
                        reg--; // <
                        reg--; // <
                }
            } // ]
    }
    process.exit(0);
}
 
process.stdin.on('data', function(chunk) {
    buf += chunk;
    getchar();
    main();
});
 
main();

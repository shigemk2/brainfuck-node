brainfuck-node
==============

brainfuck interpreter, brainfuck translator and brainfuck JIT compiler by Node.js

### Usage(Interpreter)

```sh
$ node branfuck.js brainfuck/shigemk2.b
              $$                                                $$    $$    .d$$$$$$$b.                
              $b        d$P                                     $$   $$    .d$       Y$b               
.$$$$$$b.     $$        d$P                                     $$  $$                Y$$              
dY$P"         $$                                                $$ $$                d$$               
Y$$b          $$ d$b    $$$  .d$$$b.    .d$$$$$b.   .d d$b d$b  $$$$               d$$                 
 ".$$$$$$.    $$d"  $b  $$$ d$$P""$$b  d$$"    $$   $$"  $$  $b $$ $$            d$$                   
       Y$$b   $$    $$  $$$ $$$   $$$  $$$     $$   $$   $$  $$ $$  $$         d$$                     
        $$$   $$    $$  $$$ Y$$b .$$$  $$$$$$$$$"   $$   $$  $$ $$   $$      d$$                       
Y$b    d$$P   $$    $$  $$$  "Y$$$$$$  q$$"         $$   $$  $$ $$    $$   d$$                         
"$$$$$$$$"    $$    $$  $$$       $$$   "$$$$$$$"   $$   $$  $$ $$     $$  $$$$$$$$$$$$$$$             
                             Y$b d$$P                                                                  
                              "Y$$P"                                                                   
```

### Usage(Translator)

```sh
$ node bftranslate.js brainfuck/getchar.b js/getchar.js
```

getchar.b
```sh
+[>,.<]
```

getchar.js
```js
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
```

### Usage(JIT Compiler)

```sh
$ node bfeval.js brainfuck/helloworld.b
Hello, world!
```

### Special Thanks

@7shi

function es_chapter2 () {
	// 2.1 let和const
    // var   特性：变量提升   并不是块级变量   
    // let   特性：变量不提升 是严格的块级变量 存在暂时性死区
    // const 特性：变量一旦声明就不可修改，一旦修改报错。

    // 基本用法
    if (true) {
        var var_a = 1;
        let let_a = 1;
        const CONST_A = 1;
    }

    // 变量提升
    if (true) {
        console.log(var_b);  // undefined
        var var_b = 2;
        console.log(let_b);  // 报错ReferenceError
        let let_b = 2
    }

    // 暂时性死区
    // ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
    var var_let_a = 1;
    if (true) {
        var_let_a = "1"; // 报错ReferenceError，原因，这个变量已经成为块级变量。执行块级变量的规则。
        let var_let_a;
    }

    // 块级作用域的使用规则情况
    if (true) {
        let_c = 3;           // ReferenceError
        console.log(let_c);  // ReferenceError

        let let_c;
        console.log(let_c);  // undefined

        let_c = 3;
        console.log(let_c);  // 3
    }

    // let在同一个块下是不能重复声明的
    if (true) {
        let let_d = 4;
        var let_d = 4;  // ReferenceError
    }
    if (true) {
        let let_e = 5;
        let let_e = 5;  // ReferenceError
    }
    if (true) {
        let let_f = 6;
        if (true) {
            let let_f = 60;  // 不会报错
        }
    }




    // 2.2 块级作用域
    // 在es6中出现了块级作用函数，在es6之前是不存在的。
    // es6之前要求函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
    if (true) {
        function func_a () {} //es5及以下会报错，es6则不会报错。
    }
    // 但是！！考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
    {
        let let_g = 'secret';
        let func_b = function () {
            return let_g;
        };
    }
    // do表达式（貌似只是个提案，网上暂时也查不到什么相关资料）
    // 现在有一个提案，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式。
    // let let_h = do {
    //     let let_i = f();
    //     let_i * let_i + 1;
    // };
    // 上述代码执行会报错。




    // 2.3 const命令
    // 块级作用域，同样变量不提升。同样与let一样不可重复声明。
    // const声明一个只读的常量。一旦声明，常量的值就不能改变。
    if (true) {
    	const CONST_B = 2;
    	CONST_B = 2;         // 报错ReferenceError
    }
    // 对于const来说，只声明不赋值，就会报错。因为一旦声明之后便不能再赋值。
    const CONST_C;      // 报错SyntaxError

    // 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。
    if (true) {
        const CONST_D = {};
        CONST_D.prop = 123;    // success
        CONST_D = {};          // TypeError: "CONST_D" is read-only
    }
    // 数组本身还是可以改写的，如果真的想将对象冻结，应该使用Object.freeze方法。
    if (true) {
    	// 下面根本没有冻结
        const CONST_E = [];
        CONST_E.push('Hello'); // 可执行
        CONST_E.length = 0;    // 可执行
        CONST_E = ['Dave'];    // 报错

        // 想要冻结得这么用
        const CONST_F = Object.freeze({});
        // 常规模式时，下面一行不起作用；严格模式时，该行会报错
        CONST_F.prop = 123;
    }

    // 下面这是一个将对象冻结的方法。
    var constantize = (obj) => {
        Object.freeze(obj);
        Object.keys(obj).forEach( (key, value) => {
            if ( typeof obj[key] === 'object' ) {
                constantize( obj[key] );
            }
        });
    };




    // 2.4 顶层对象的属性
    // 顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。
    // window.a = 1;
    // a // 1
    // a = 2;
    // window.a // 2
    // 这边不是顶层，然后就没什么用了。

    // 如果在Node的REPL环境，可以写成global.a
    // 或者采用通用方法，写成this.a
    // var a = 1;
    // window.a // 1
    // let b = 1;
    // window.b // undefined
    // let中声明的不算window的顶层变量。
    
    // 有的时候直接在window顶层声明的时候会报错。




    // 2.5 global对象
    // global对象是nodejs中的顶层对象。
    // 暂不讨论。
}
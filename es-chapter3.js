function es_chapter3 () {
    // 3.1 数组的解构赋值
    // ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
    if (true) {    
        let [a, b, c] = [1, 2, 3];              // 这是es6新兴写法
        let [d, [[e], f]] = [1, [[2], 3]];      // d: 1   e: 2   f: 3
        let [ , , g] = ["foo", "bar", "baz"];   // g: "baz"
        let [h, , i] = [1, 2, 3];               // h: 1    i: 3
        let [j, ...k] = [1, 2, 3, 4];           // j: 1    k: [2, 3, 4]
        let [l, m, ...n] = ['a'];               // l: "a"   m: undefined   n: []
        let [o] = [];                           // o: undefined
        let [p, q] = [1];                       //  p: 1    q: undefined
    }

    if (true) {
        // 以下全部会报错,因为等号右边的值，要么转为对象以后不具备Iterator接口（前五个表达式），要么本身就不具备Iterator接口（最后一个表达式）。
        let [a] = 1;
        let [b] = false;
        let [c] = NaN;
        let [d] = undefined;
        let [e] = null;
        let [f] = {};
    }
    if (true) {
        // 在中括号中加的=是默认赋值。
        let [foo = true] = [];             // foo: true
        [x, y = 'b'] = ['a'];              // x='a', y='b'
        [x, y = 'b'] = ['a', undefined];   // x='a', y='b'
        [x, y = 'b'] = ['a', null];   // x='a', y=null
        // 注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。

        //如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
        function f() {
            console.log('aaa');
        }
        let [x = f()] = [1];
        // 上面的代码因为x可以直接取到值1，所以并不会走f()流程，所以不会有log出来
    }




    // 3.2 对象的解构赋值
    if (true) {
        // 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
        var { a, b } = { a: "aaa", b: "bbb" };  // a: aaa  b: bbb
        var { a } = { a: "aaa", b: "bbb" };     // a: undefined
        var { a: b } = { a: 'aaa', b: 'bbb' };  // b: aaa，对应的是a: b = a: 'aaa' === b = 'aaa'，a: undefined
        // 对象结构实际的形式如下，属性名称只是起了对照的作用
        var { a: a, b: b } = { a: 'aaa', b: 'bbb' };
        
        var node = { loc: { start: {
            line: 1,
            column: 5
        }}};
        var { loc: { start: { line }} } = node;
        // line: 1, loc: undefined, start: undefined。因为loc、start都是模式，不是变量

        let obj = {};
        let arr = [];
        ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });    // obj: {prop:123}   arr: [true]
        
    }




    // 3.1 数组的解构赋值


    // 3.1 数组的解构赋值

    // 3.1 数组的解构赋值

    // 3.1 数组的解构赋值

    // 3.1 数组的解构赋值

    // 3.1 数组的解构赋值
}
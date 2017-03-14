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




    // 3.3 字符串的解构赋值
    if (true) {
        const [a, b, c, d, e] = 'hello';
        // a = "h"
        // b = "e"
        // c = "l"
        // d = "l"
        // e = "o"
    }


    // 3.4 数值和布尔值的解构赋值
    if (true) {
        // 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
        // 感觉不重要。。
        let {toString: s} = 123;
        s === Number.prototype.toString // true

        let {toString: s} = true;
        s === Boolean.prototype.toString // true

        // 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
        let { prop: x } = undefined; // TypeError
        let { prop: y } = null; // TypeError
    }



    // 3.5 函数参数的解构赋值
    // 函数解构的赋值是参数的解构赋值
    if (true) {
        function add([x, y]){
            return x + y;
        }
        add([1, 2]); // 3


        function move({x, y} = { x: 0, y: 0 }) {
            return [x, y];
        }
        move({x: 3, y: 8});   // [3, 8]
        move({x: 3});         // [3, undefined]
        move({});             // [undefined, undefined]
        move();               // [0, 0]
    }



    // 3.6 圆括号问题
    // 解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
    // 由此带来的问题是，如果模式中出现圆括号怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
    // 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。
    // （1）变量声明语句中，不能带有圆括号。
    let [(a)] = [1];
    let {x: (c)} = {};
    let ({x: c}) = {};
    let {(x: c)} = {};
    let {(x): c} = {};
    let { o: ({ p: p }) } = { o: { p: 2 } };
    // （2）函数参数中，模式不能带有圆括号。
    function f([(z)]) { return z; }
    // （3）赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
    ({ p: a }) = { p: 42 };
    ([a]) = [5];
    [({ p: a }), { x: c }] = [{}, {}];

    // 正确使用圆括号的情况
    // 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
    [(b)] = [3]; // 正确
    ({ p: (d) } = {}); // 正确
    [(parseInt.prop)] = [3]; // 正确



    // 3.7 用途
    // （1）交换变量的值
    let x = 1;
    let y = 2;
    [x, y] = [y, x];
    // 可以很方便的交换变量的值

    // （2）从函数返回多个值
    // 返回一个数组
    function example() {
        return [1, 2, 3];
    }
    let [a, b, c] = example();

    // 返回一个对象
    function example() {
        return {foo: 1,bar: 2};
    }
    let { foo, bar } = example();

    // （3）函数参数的定义
    // 参数是一组有次序的值
    function f([x, y, z]) {}
    f([1, 2, 3]);

    // 参数是一组无次序的值
    function f({x, y, z}) {}
    f({z: 3, y: 2, x: 1});

    // （4）提取JSON数据
    let jsonData = {
        id: 42,
        status: "OK",
        data: [867, 5309]
    };
    let { id, status, data: number } = jsonData;
    console.log(id, status, number);   // 42, "OK", [867, 5309]
    // 可以快速提取 JSON 数据的值。

    // （5）函数参数的默认值
    jQuery.ajax = function (url, {
        async = true,
        beforeSend = function () {},
        cache = true,
        complete = function () {},
        crossDomain = false,
        global = true,
        // ... more config
    }) {
        // ... do stuff
    };
    // 可以定义函数参数的默认值避免函数内部再合并一下。

    // （6）遍历Map结构
    var map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    // 获取键名以及键值
    for (let [key, value] of map) {
      console.log(key + " is " + value);
    }
    // 只获取键名
    for (let [key] of map) {
      // ...
    }
    // 只获取键值
    for (let [,value] of map) {
      // ...
    }

    //（7）输入模块的指定方法
    // 下面的不太懂。。大概是直接将原先有的方法赋给名字，然后可以直接调用简易的方法名字。
    const { SourceMapConsumer, SourceNode } = require("source-map");
}
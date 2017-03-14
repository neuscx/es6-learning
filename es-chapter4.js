function es_chapter4 () {
	// 第4章字符串的拓展
	// 4.1~4.5讲的是对unicode>0xFFFF（中文生僻字）的不适配会有bug的拓展。


    // 4.1 字符的Unicode表示法
    // JavaScript允许采用\uxxxx形式表示一个字符，其中“xxxx”表示字符的码点。
    '\z' === 'z'     // true
	'\172' === 'z'   // true
	'\x7A' === 'z'   // true
	'\u007A' === 'z' // true
	'\u{7A}' === 'z' // true



	// 4.2 codePointAt() 
	// JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
	// codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
	// 用简单的length在鉴定一些Unicode码点大于0xFFFF的字符时会判断为两个字符。



	// 4.3 String.fromCodePoint()
	// ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）。
	// 于是ES6提供了String.fromCodePoint方法，可以识别0xFFFF的字符，弥补了String.fromCharCode方法的不足。
	String.fromCodePoint(0x20BB7)
	// "𠮷"
	String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
	// true



	// 4.4 字符串的遍历器接口
	// ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
	var text = String.fromCodePoint(0x20BB7);

	for (let i = 0; i < text.length; i++) {
	  console.log(text[i]);
	}
	// " "
	// " "

	for (let i of text) {
	  console.log(i);
	}
	// "𠮷"
	// 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。



	// 4.5 at()
	// 目前貌似只是一个提案，不知道是否最终可用。
	// ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。



	// 4.6 normalize()
	// 内容较多，但是实际意义不太大，可以不看。
	// 许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode提供了两种方法。
	// 一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。
	// 这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别。
	// 于是新增了一个normalize方法来使Unicode正规化。
	'\u01D1'==='\u004F\u030C';                           //false
	'\u01D1'.normalize() === '\u004F\u030C'.normalize(); //true
	// normalize方法可以接受一个参数来指定normalize的方式，参数的四个可选值如下。
	// NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
	// NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
	// NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文。）
	// NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。
	'\u004F\u030C'.normalize('NFC').length // 1
	'\u004F\u030C'.normalize('NFD').length // 2
	// 上面代码表示，NFC参数返回字符的合成形式，NFD参数返回字符的分解形式。
	// 不过，normalize方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过Unicode编号区间判断。



	// 4.7 includes(), startsWith(), endsWith()
	// es5及之前，只有indexOf方法可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。
	// includes()：返回布尔值，表示是否找到了参数字符串。
	// startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
	// endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
	var s = 'Hello world!';
	s.startsWith('Hello');  // true
	s.endsWith('!');        // true
	s.includes('o');        // true

	// 这三个方法都支持第二个参数，表示开始搜索的位置。
	var s = 'Hello world!';
	s.startsWith('world', 6); // true
	s.endsWith('Hello', 5);   // true
	s.includes('Hello', 6);   // false
	// 上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。



	
	// 4.8 repeat()
	// repeat方法返回一个新的字符串，表示将原字符重复n次。
	'x'.repeat(3);     // "xxx"
	'hello'.repeat(2); // "hellohello"
	'na'.repeat(0);    // ""
    
    // 参数如果是小数，会被取整。向下取整。
    // 'na'.repeat(2.9) // "nana"
	
	// 如果repeat的参数是负数或者Infinity，会报错。
	'na'.repeat(Infinity);  // RangeError
	'na'.repeat(-1);        // RangeError
	// 如果是-1到0之间的数字会向上取整到0
	'na'.repeat(NaN);        // "" NaN这时会被视同0
	
	// 如果repeat的参数是字符串，则会先转换成数字。
	'na'.repeat('na');  // ""
	'na'.repeat('3');   // "nanana"



	// 4.9 padStart()，padEnd()
	// 这两个函数用来补全长度，如果不够长就补全。能补多少补多少。
	'x'.padStart(4, 'ab');  // 'abax'
	'x'.padEnd(4, 'ab');    // 'xaba'

	// 如果原字符串长度大于补齐长度，则返回原字符串。
	'xxx'.padStart(2, 'ab'); // 'xxx'
	'xxx'.padEnd(2, 'ab');   // 'xxx'

	// 如果第二个参数为空，则用空格补全长度。
	'x'.padStart(4);  // '   x'
	'x'.padEnd(4);    // 'x   '

	// padStart的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。
	'1'.padStart(10, '0');      // "0000000001"
	'12'.padStart(10, '0');     // "0000000012"
	'123456'.padStart(10, '0'); // "0000123456"

	// 另一个用途是提示字符串格式。
	'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
	'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"




	// 4.10 模板字符串
	// 模板字符串用 ` 符号来表示，它可以当作普通字符串使用，也可以定义多行字符串。
	// 普通字符串
	`In JavaScript '\n' is a line-feed.`

	// 多行字符串
	`In JavaScript this is
	 not legal.`

	// 字符串中嵌入变量，用$符号加{}来扩一下就可以将变量插入其中。
	var name = "Bob", time = "today";
	`Hello ${name}, how are you ${time}?`

	// 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
    var greeting = `\`Yo\` World!`;

    //大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。还能调用函数。
	var x = 1;
	var y = 2;
	`${x} + ${y} = ${x + y}`;           // "1 + 2 = 3"
	`${x} + ${y * 2} = ${x + y * 2}`;   // "1 + 4 = 5"

	var obj = {x: 1, y: 2};
	`${obj.x + obj.y}`;                 // 3

	function fn() {
	    return "Hello World";
	}
	`foo ${fn()} bar`;     // foo Hello World bar

	`Hello ${'World'}`     // "Hello World"  因为$的意思是一段js代码，中间是字符串，最后返回的也是字符串。

	// 模板字符串甚至还能嵌套。
	const tmpl = addrs => `
	    <table>
	    ${addrs.map(addr => `
	        <tr><td>${addr.first}</td></tr>
	        <tr><td>${addr.last}</td></tr>
	    `).join('')}
	    </table>
	`;

	//如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。
	// 写法一
	let str = 'return ' + '`Hello ${name}!`';
	let func = new Function('name', str);
	func('Jack') // "Hello Jack!"
	// 写法二
	let str = '(name) => `Hello ${name}!`';
	let func = eval.call(null, str);
	func('Jack') // "Hello Jack!"



	// 4.11 实例：模板编译
    // 可以使用<%...%>放置JavaScript代码，使用<%= ... %>输出JavaScript表达式。
    var template = `
		<ul>
			<% for(var i=0; i < data.supplies.length; i++) { %>
				<li><%= data.supplies[i] %></li>
			<% } %>
		</ul>
	`;
	// 东西还有很多，看不懂，貌似讲的是原理么。http://es6.ruanyifeng.com/#docs/string



	// 4.12 标签模板
	// 如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
	tag`Hello ${ a + b } world ${ a * b }`; // 等同于
	tag(['Hello ', ' world ', ''], 15, 50); // 等同于

	// “标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。
	var message = SaferHTML`<p>${sender} has sent you a message.</p>`;
	function SaferHTML(templateData) {
	    var s = templateData[0];
	    for (var i = 1; i < arguments.length; i++) {
	        var arg = String(arguments[i]);
	        // Escape special characters in the substitution.
	        s += arg.replace(/&/g, "&amp;")
	                .replace(/</g, "&lt;")
	                .replace(/>/g, "&gt;");
	        // Don't escape special characters in the template.
	        s += templateData[i];
	    }
	    return s;
	}

	//标签模板的另一个应用，就是多语言转换（国际化处理）。
	i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
	// "欢迎访问xxx，您是第xxxx位访问者！"



	// 4.13 String.raw()
	
}
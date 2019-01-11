### JSON对象和字符串之间转换
#### 目前市面上得所有浏览器都支持JSON对象,通常有两种常用方法来处理JSON格式内容.
- JSON.parse(string)    括号内接收一个JSON字符串并返回一个JS对象.
```JavaScript
    var a = '{"name":"tom","sex":"男","age":"24"}'
    var b = JSON.parse(a);
    b;
    //js字符串转换为JSON对象
    {name: "tom", sex: "男", age: "24"}

```
- JSON.stringify(obj)   括号内接收一个JS对象并返回一个JSON字符串
```JavaScript
    var a={"name":"tom","sex":"男","age":"24"};
    var b = JSON.stringify(a);
    b;
    //JS对象转换为JSON对象
    "{"name":"tom","sex":"男","age":"24"}"
```
#### 上面的使用方法讲完,下来看看用在数组上的:
```JavaScript
    var a = ['name', 'sex', 'job', 'address', 'age'];
    var b = JSON.stringify(a);
    b;
    //转换结果
    '["name","sex","job","address","age"]'

```
#### IE6,7,8没有JSON对象,[http://www.json.org/](http://www.json.org/)上面提供了一个 ==json.js== 文件用来兼容IE6,7,8这样就可以使用JSON对象了.[https://github.com/douglascrockford/JSON-js](https://github.com/douglascrockford/JSON-js)获取这个js,现在用的是json2.js
#### ie8(兼容模式),ie7和ie6可以使用eval()将字符串转为JSON对象
```JavaScript
    var a = "['name', 'sex', 'job', 'address', 'age']";
    var b = eval("("+ a +")"); //注意这里必须是两对双引号或单引号
    b;
    console.log(typeof(b));
    //结果
    ["name", "sex", "job", "address", "age"]
    object
```

### ==高级用法==
#### JSON.parse(string),可以接收第二个参数, ==它可以在返回之前转换对象值,看看下面的例子:
```JavaScript
    var person = {
        name: 'yangsen',
        job: 'front',
        email: '1243879@qq.com',
        plan: 'travel'
    };
    var personStr = JSON.stringify(person);
        var newPersonStr = JSON.parse(personStr, (key, value) => {
	    if(typeof(value) === 'string'){
	    return value.toUpperCase();
    }
         return value;
    });
    console.log(newPersonStr);
    //结果
    {name: "YANGSEN", job: "FRONT", email: "1243879@QQ.COM", plan: "TRAVEL"}

```
##### ==尾随逗号在JSON 中无效，所以如果传递给它的字符串有尾随逗号，JSON.parse()将会抛出错误。==

#### JSON.stringify(obj), == 可以接受额外的两个参数,第一个是替换函数,第二个间隔字符串,用来隔开返回字符串==. 以下参数是:
- value: 将要转为JSON字符串的js对象.
- replacer: 该参数可以是多种类型,如果是一个函数的话,就执行js对象在字符串化过程的方法.如果是一个包含String和Number对象的数组,将作为一个名单,只有哪些键存在名单中的键值才会最终生成JSON字符串.如果数值是null或者是省略号,则所有的键值对会最终都包含进生成的JSON字符串中.
- space: 该参数可以是一个Number 或者 String对象,作用是在输出的JSON字符串中插入空白符来增强可读性.如果是number对象的话,表示用多少个空格作为空白符,最大为10,大于10也是取10,最小为1,小于1无效,则不会显示空白符.如果是String对象,表示该字符串本身作为空白符,最长为10个字符,超过的话会截取前10个字符.如果该参数被省略 (或者为null), 则不会显示空白符.

```JavaScript
    var person = {
	    id: '234',
    	name: 'yangsen',
	    email: '1234@qq.vom'
    };
    function replacer(key, value){
    	console.log(typeof(value));
    	if(key === 'email'){
    		return undefined;
    	}
    	return value;
    }
    var personStr = JSON.stringify(person, replacer);
    personStr;
    //结果
    object
    string
    "{"id":"234","name":"yangsen"}"
```
#### 传入一个间隔参数的例子:
```JavaScript
    var person = {
    	id: '234',
    	name: 'yangsen',
    	email: '1234@qq.vom'
    };
    var personStr = JSON.stringify(person, null, '...');
    personStr;
    //结果
    '{
    ..."id": "234",
    ..."name": "yangsen",
    ..."email": "1234@qq.vom"
    }'
```
#### 用JSON.stringify 来格式化对象,在实际使用中,我们可能会格式化一些复杂的对象，这些对象往往对象内嵌套对象。直接看起来并不那么直观,结合上面的的 replacer 和 space 参数,我们可以这样格式化复杂对象：
```JavaScript
    var a = function(key, value){
	if(typeof(value) === 'function'){
		return Function.prototype.toString.call(value)
	}
    	return value;
    }
    var b = {name: 'yyy', age: 1, job:{a: 'doc',b: 'nurse',info: {sex: '男',getsex:function(){return 'sex';}}}};
    console.log(JSON.stringify(b, a, 4));
    
    //格式化的结果
    {
        "name": "yyy",
        "age": 1,
        "job": {
            "a": "doc",
            "b": "nurse",
            "info": {
                "sex": "男",
                "getsex": "function(){return 'sex';}"
            }
        }
    }
```

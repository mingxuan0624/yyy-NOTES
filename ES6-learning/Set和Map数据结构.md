<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-13 08:28:36
 * @LastEditTime: 2019-01-16 00:43:20
 * @LastEditors: Please set LastEditors
 -->
## Set和Map数据结构
#### 刚学习ES6的基础语法时候,主要是看阮一峰老师的[ES6标准入门](http://es6.ruanyifeng.com/#docs/set-map)电子版的,后来买了实体书看.
#### Set和Map的主要应用场景在于 **数组去重和数据存储** ,在读了关于数据结构与算法的书籍后才发现Set是一种叫做**集合**的数据结构,Map是一种叫做 **字典**的数据结构.
#### 集合
- 集合是一种无序且唯一(就是不能重复)的项组成,可以看成是一个既没有重复元素,也没有顺序的数组.
- ES6中提供新的数据结构`Set`.它类似于数组,但是成员都是唯一的,没有重复的值.
- `Set`本身是一个构造函数,用来生成`Set`数据结构.
#### 来看看下面的代码:
```JavaScript		
const a = new Set();
[2,3,4,6,3,2,1].forEach((x) => {a.add(x)});
for(let i of a){
	console.log(i)
}
//2,3,4,6,1
```
#### Set的实例属性和方法
##### Set的实例属性:
- size		返回集合所包含元素的数量
```JavaScript
const a = new Set([2,3,4,2,1,6]);
a.size;
//5
```
#### Set的操作方法:
- add(val)	向集合添加一个新的项
```JavaScript
const b = new Set([2,3,4]);
b.add(10);
b;
// Set(4){2, 3, 4, 10}
```
- delete(val)	从集合中删除一项
```JavaScript
const v = new Set([2,3,4,2,19,1,6]);
v.delete(19);
v;
// Set(5) {2, 3, 4, 1, 6}
```
- has(val)	表示集合中有某项
```JavaScript
var s = new Set([2,1,3,6]);
s.delete(3);
s;
// Set(3) {2, 1, 6}
```
- clear()	清楚集合中所有的项,没有返回值
```JavaScript
var n = new Set([2,1,3,6]);
n.clear();
n;
//Set(0) {}
```
#### Set的遍历方法
- key() 返回一个包含所有键的数组
- values()  返回一个包含所有键值的数组
- entries()	返回一个包含所有键值对的数组.(没什么用处)
- forEach()	对所有的成员进行某种操作,美返回值
##### 这里的话keys()和values()一起来实现,通过ES6对Object的扩展可以实现对应的方法.下面来看看代码:
```JavaScript
//keys()
this.keys = function(){
	//返回遍历集合所有键名的数组
	return Object.keys(items);
}

//values()
this.values = function(){
	//返回遍历集合所有键值的数组
	return Object.values(items);
}
```
##### 由于Set,values,entries方法都是遍历对象的,由于Set结构没有键名,只有键值,所以Set,values方法的操作时完全一致的.下面看看代码:
```JavaScript
let a = new Set(['li','yang','cao','wang']);
for (let item of a.keys()) {
  console.log(item);
}
// li yang cao wang

let a = new Set(['li','yang','cao','wang']);
for (let item of a.values()) {
  console.log(item);
}
// li yang cao wang

let o = new Set(['li','yang','cao','wang']);
for (let item of o.entries()) {
  console.log(item);
}
//["li", "li"]
//["yang", "yang"]
//["cao", "cao"]
//["wang", "wang"]
```
#### forEach()
##### Set()结构的forEach实际是和数组的forEach()方法时一样的.都是对成员进行某种操作.Set结构的键值就是键名,so,第一个参数和一二个参数永远都是一致的.
```JavaScript
//来看看用set方法实现的forEach方法
//forEach(fn, context)
this.forEach = function(fn, context = this){
	for(let i = 0;i < this.size; i++){
		let item = Object.keys(items)[i];
		fn.call(context, item, item ,items)
	}
};
```
##### 使用forEach方法
```JavaScript
//set.js
const Set = require(./Set.js);
let set = new Set();
set.add(1);
set.add(3);
set.add('4');
set.forEach((value, key) => {
	console.log(key + ':' + value);

})
//	1:1
//	4:4
//	3:3

let arr = set.values();
// [1, 3, 4]

//ES5
arr = new Set(arr.map(function(x){
	return x * 2;
})).values();
//[2, 6, 8]

//ES6
arr = new Set(arr.map(x => x*2)).values();
console.log(arr);
//[2, 6, 8]
```
#### 每次往Set()结构中添加元素都要用add()方法,比较麻烦.其实Set是可以接收一个数组作为参数的.下面代码看看:
```JavaScript
function Set(arr = []){//传入接收数组,没有指定的可以传一个空数组为初始值
	let items = {};
	this.size = 0;
	//has方法
	this.has = function(val){
		//hasOwnProperty()判断当前集合中是否有val值
		return items.hasOwnProperty(val)
	}
	//add方法
	this.add = function(val){
		if(!this.has(val)){//判断没有items的话就直接写入
			items[val] = val;
			this.size ++;
			return ture
		}
		return false;
	};
	arr.forEach((val, i) => {//遍历传入的数组
		this.add(val);	//将数组中的元素添加到集合中
	})
}
```
##### 
```JavaScript



```
```JavaScript



```
```JavaScript



```
```JavaScript



```
```JavaScript



```
```JavaScript



```


// import { promises } from "fs";

// //方法异步异步执行的话,在方法前面添加async
// async function testAsync(){
//     return 'hello world'
// } 

// function getsomething(){
//     return 'getsomething';
// }

// //await 必须在async里面
// //代码可以看的出来,await可以接受promise对象,也可以接受普通得返回值
// async function test(){
//     var v1 = await getsomething();
//     var v2 = await testAsync();
//     console.log(v1, v2);
// }
// test();


function takelongtime(){
    return new Promise(resolve =>{
        setTimeout(() => resolve('long-time-value'),3000)
    });
}
// function takelongtime() {
//     return new Promise(function (resolve) {
//         setTimeout(function () {
//             return resolve('long-time-value');
//         }, 1000);
//     });
// }
async function test(){
    const v = await takelongtime();
    console.log(v);
}
test();
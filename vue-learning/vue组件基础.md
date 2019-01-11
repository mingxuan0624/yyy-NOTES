### Vue组件基础
```html
<div id="app">
      <btn-counter></btn-counter>
      <btn-counter></btn-counter>
      <btn-counter></btn-counter>
      <btn-counter></btn-counter>
    </div>
```
```javascript
    <script src="node_modules/vue/dist/vue.js"></script>
    <script>
      Vue.component('btn-counter', {
        template: '<button v-on:click="counter ++">点我加一{{counter}}</button>',
        data: function(){
          return {
            counter: 0
          }
        }
      })
      let vm = new Vue({
        el: '#app',
      })
```
#### 以上vue的一个简单示例.从中可以看到 ==组件时可以复用的==.并且带有名称<btn-counter>.因为组件都是可复用的Vue实例,所以他们有跟new Vue相同的方法,例如: ==data, computed, watch, methods 以及生命周期钩子.== 并且 ==组件中的data必须是一个函数,而不是像Vue根实例中是一个对象.==
```javascript
  //new Vue根实例中data
  data: {
    count: 0
  }
  //组件component中的data--->每一个组件即使是复用的组件,都可以维护一份被返回对象的独立拷贝
  data: function(){
    return {
      ....
    }
  }
```
#### 为了能使用,组件必须先注册才能被vue识别,这里有两种注册类型: ==全局注册和局部注册==.组件是通过 ==Vue.conponent== 来进行全局注册:
```javascript
  Vue.component('component-name', {
    //组件代码
  })
```
#### 组件名: 所有的组件名就是上面示例代码中Vue.component中的第一个参数'component-name'.组件名你可以使用'-'短横线分隔符来定义,就像上面示例一样.你也可以使用驼峰法则.可以这样写:
```javascript
  Vue.component('MyComponentName', {
    //组件代码
  })
```
#### 上面再也没展示出来的组件是<component-name>和<MyComponentName>.两种方式都是可以的!但是还是建议使用'-'短横线分隔符来定义组件名称.
#### 全局组件 -->下面的示例代码是创建的全局组件,它们再注册之后可以用在任何新创建的Vue根实例模板中.
```html
  <div id="app">
    <component-a></component-a>
    <component-b></component-b>
    <component-c></component-c>
  </div>
```
```javascript
  Vue.component('component-a', {...})
  Vue.component('component-b', {...})
  Vue.component('component-c', {...})
  var vm = new Vue({
    el: '#app'
  })
  
```
#### 局部组件 --> 可以通过javascript对象来创建.
```javascript
 let componentA = {...}
 let componentB = {...}
 let componentC = {...}
 //然后再vue根实例中选择你想要的组件
 var vm = new Vue({
    el: '#app',
    components: {
      'component-a': componentA,
      'component-b': componentB
    }
  })
  //components对象中的属性,属性名就是自定义元素名字,属性值就是其组件对象.
```
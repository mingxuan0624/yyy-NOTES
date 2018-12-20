#### 这里主要是从vue.js最基础的语法开始学习.

```html
    <div id="root">
        <!--v-on:click绑定一个点击事件,v-on:可以缩写为@-->
        <!--<div @click="handleclick">{{message}}</div>-->
        <div v-on:click="handleclick">{{message}}</div>
        <item></item>
    </div>
    <script>
        //vue 组建
        Vue.component('item', {
            template: '<div>hello world</div>'
        })
        
        var vm = new Vue({
            //el ->负责定义vue实例接管的最外层的标签
            el: '#root',
            //data -> 用于存放一些数据
            data: {
                message: 'hello world'
            },
            //methods -> 定义事件方法
            methods: {
                handleclick: function(){
                    alert('hello')
                }
            }
        })
        
        //在浏览器控制台输出,vm是vue的一个实例,$表示凡是以$开头的都是vue的实例属性
        vm
        //Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
        vm.$el
        //<div id=​"root">​…​</div>​
        vm.$children
        //[VueComponent]0: VueComponent {_uid: 1, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}length: 1__proto__: Array(0)
        vm.__proto__
        //{_init: ƒ, $set: ƒ, $delete: ƒ, $watch: ƒ, $on: ƒ, …}
    </script>
    
    <div id="app">
        <!--v-model vue的双向数据绑定-->
        <input type="text" v-model="inputValue">
        <button v-on:click="handleClick">提交</button>
        <ul>
            <!--v-for item从list数组内循环出来-->
            <li v-for="item in list">{{item}}</li>
        </ul>
    </div>
    <script>
        let app = new Vue({
            el: '#app',
            data:{
                list: [],
                inputValue: '',
            },
            methods: {
                handleClick: function () {
                    this.list.push(this.inputValue);
                    this.inputValue = '';
                }
            }
        })
    </script>
```
### 局部组件和全局组建

```html
<div id="app">
        <input type="text" v-model="inputValue">
        <button v-on:click="handleClick">提交</button>
        <ul>
            <!--<li v-for="item in list">{{item}}</li>-->
            
            <!--v-bind:绑定v-for里面list传来的item值,用变量content接收-->
            <todo-item v-bind:content="item" v-for="item in list"></todo-item>
            <!--v-bind可以直接简写为冒号':'-->
            <todo-item :content="item" v-for="item in list"></todo-item>
        </ul>

    </div>
    <script>
        //全局组jian
        // Vue.component("TodoItem",{
        //     //props接受传来的变量
        //     props: ['content'],
        //     template: "<li>{{content}}</li>"
        // })

        //局部组件
        let TodoItem = {
            props: ['content'],
            template: "<li>{{content}}</li>"
        }
        let app = new Vue({
            el: '#app',
            //创建局部组件要添加components属性,
            components: {
                TodoItem: TodoItem
            },
            data:{
                list: [],
                inputValue: '',
            },
            methods: {
                handleClick: function () {
                    this.list.push(this.inputValue);
                    this.inputValue = '';
                }
            }
        })
    </script>
```
### 简单的组件间传值问题

```html
<div id="app">
        <input type="text" v-model="inputValue">
        <button v-on:click="handleClick">提交</button>
        <ul>
            <!--<li v-for="item in list">{{item}}</li>-->
            <!--v-bind:绑定v-for里面list传来的item值,用变量content接收,index来接收下标-->
            <todo-item v-bind:content="item"
                       v-bind:index="index"
                       v-for="(item,index) in list"
                        @delete="handleItemDelete">
                <!--父组件在创建子组件的同时,可以监听delete事件-->
            </todo-item>
        </ul>

    </div>
    <script>
        //局部组件
        let TodoItem = {
            //props,接收子组件的传来的值和下标
            props: ['content','index'],
            template: "<li @click='handleItemClick'>{{content}}</li>",
            methods: {
                handleItemClick: function(){
                    //$emit向父组件出发事件
                    //点击子组件的时候会向外触发一个delete事件,监听下标
                    this.$emit("delete",this.index)
                }
            }
        }
        let app = new Vue({
            el: '#app',
            components: {
                TodoItem: TodoItem
            },
            data:{
                list: [],
                inputValue: '',
            },
            methods: {
                handleClick: function () {
                    this.list.push(this.inputValue);
                    this.inputValue = '';
                },
                handleItemDelete: function (index) {
                    //父组件监听删除当前下标的内容.
                    this.list.splice(index,1);
                    //alert(index)
                }
            }
        })
    </script>
```

### Vue实例的生命周期---钩子

```html
<div id="app">{{message}}</div>
    <script>
        //生命周期函数就是vue实例在某一个时间点会自动执行的函数
        var vm = new Vue({
            el: '#app',
            data: {
              message: 'hello world'
            },
            //生命周期函数不会放在methods里面,而是放在vue实例里面
            beforeCreate: function () {
                console.log('beforeCreate')
            },
            created: function () {
                console.log('created')
            },
            beforeMount: function () {
                console.log('beforeMount');
                console.log(this.$el);
            },
            mounted: function () {
                console.log('mounted');
                console.log(this.$el);
            },
            beforeDestroy: function () {
                console.log('beforeDestroy');
            },
            destroyed: function () {
                console.log('destroyed');
            },
            //beforeUpdate和updated在数据发生变化时会自动执行的函数
            beforeUpdate: function () {
                console.log('beforeUpdate');
            },
            updated: function () {
                console.log('updated');
            }
        })
    </script>
```

### 计算属性,方法和侦听器

```html
<!--计算属性--性能比方法很高-->
<div id="app">{{fullName}}</div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                firstName: 'Yang',
                lastName: 'yongyong',
                age: 29
            },
            //vue计算属性->有个缓存概念,计算过了, 如果依赖的值没有改变,就不会去重新计算
            computed: {
                fullName: function () {
                    console.log('重新计算了一次!')
                    return this.firstName + ' ' + this.lastName
                }
            }
        })
    </script>
    
    
//方法
<!--fullName加小括号(),调用fullName()函数-->
<!--方法是不如计算属性有效的,内部没有缓存机制,-->
<div id="app">{{fullName()}}</div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                firstName: 'Yang',
                lastName: 'yongyong',
                age: 29
            },
            methods: {
                fullName: function () {
                    console.log('重新计算了一次!');
                    return this.firstName + ' ' + this.lastName
                }
            }
        })
    </script>
    
    
<!--侦听器-watch-->
<div id="app">{{fullName}}{{age}}</div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                firstName: 'Yang',
                lastName: 'yongyong',
                fullName: 'Yang yongyong',
                age: 29

            },
            //侦听器-同样具有缓存机制,但是方法复杂度要比methods和computed要高,一般不建议用
            watch: {
                firstName: function () {
                    console.log('重新计算了一次!');
                    return this.fullName = this.firstName + ' ' + this.lastName
                },
                lastName: function () {
                    console.log('重新计算了一次!');
                    return this.fullName = this.firstName + ' ' + this.lastName
                }
            }
        })
    </script>
```
### 计算属性的getter和setter


```html
<div id="app">{{fullName}}</div>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                firstName: 'Yang',
                lastName: 'Yongyong',
            },
            computed:{
                //computed什么时候会重新计算呢,当他依赖的值发生变化的时候,它就会去重新计算,
                //当set 设置fullName的时候,this.firstName发生变化.恰好this.firstName又是fullName
                //所依赖的值,所以就会引起fullName的重新计算,fullName变了,页面上的fullName也就跟着变了.
                fullName: {
                    get: function () {
                        return this.firstName + ' ' + this.lastName
                    },
                    //当在设置值的时候,会把值打散成数组分别赋值给firstName和lastName,
                    //
                    set: function (value) {
                        //把fullName传递过来的value值打散,达成一个数组
                        let arr = value.split(" ");
                        this.firstName = arr[0];
                        this.lastName = arr[1];
                        // console.log(value);
                    }
                }
            }
        })
    </script>

```

### Vue中的样式绑定
### 第一种

```html
<div id="app">
        <!-- class对象的样式绑定 -->
        <div @click="HandleClckDiv" 
        v-bind:class="{activated: isActivated}">Hello World</div>
    </div>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                isActivated: false
            },
            methods: {
                HandleClckDiv: function(){
                    //做个取反操作
                   this.isActivated = !this.isActivated; 
                }
            }
        })
    </script> 
```
### 第二种

```html
<div id="app">
        <div v-bind:style="styleObj" @click="HandleClckDiv">Hello World</div>
    </div>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                styleObj: {
                    color: 'black'
                }
            },
            methods: {
                HandleClckDiv: function(){
                    this.styleObj.color = this.styleObj.color === 'black' ? 'red' : 'black';
                }
            }
        })
    </script> 
```
### 第三种

```html
<div id="app">
        <!-- class对象的样式绑定 -->
        <div @click="HandleClckDiv" 
            v-bind:class="[activated,activatedOne]"><!--activated指的是页面上div元素上会显示class,显示的class是activated这个变量里面的内容-->
        Hello World</div>
    </div>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                activated: "",
                activatedOne: "activated-one"
            },
            methods: {
                HandleClckDiv: function(){
                   //this.activated = "activated";
                //    if(this.activated === "activated"){
                //         this.activated = ""
                //    }else{
                //         this.activated = "activated"
                //    }
                    this.activated = this.activated === "activated" ? "" : "activated"
                }
            }
        })
    </script> 
```
### vue条件渲染
```html
<div id="app">
        <!-- v-if: v-if指令对应的dom节点直接从dom结构移除了 -->
            <!-- v-if 中的show等于的值和data数据中的值匹配则为true,显示This is A,
                若show===b等于的值和data数据中的值匹配则为true,则显示This is B,若A和B都不匹就显示yang yongyong-->
        <!-- <div v-if="show === 'a'">This is A</div>
        <div v-else-if="show === 'b'">This is B</div>
        <div v-else="">yang yongyong</div>v-if和v-else中间不能添加任何的标签,紧贴一起使用,否则会报错. -->
        <!--v-show: v-show对应的dom节点没有被移除,只是被设置了display:none ,性能比v-if更高些,不会频繁的删除dom节点 -->
        <!-- <div v-show="show" data-message="v-show">{{meessage}}</div> -->
        <div v-if="show">
            <!-- 为什么要加key: 当你给某个元素标签加key时,vue会知道它时页面上唯一的一个元素,如果两个key不一样,就不会去尝试复用以前的标签 -->
            用户名: <input type="text" key="userName">
        </div>
        <div v-else="">
            邮箱名: <input type="text" key="userEmal">
        </div>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                show: false,
            }
        })
    
    </script>
```
### 非父子组件传值(Bus/总线/发布订阅模式/观察者模式)

```html
<div id="app">
        <child content="dell"></child>
        <child content="yongyong"></child>
    </div>
    <script>
        //一般来说解决非父子组件传值有2中办法
        //1.使用vuex
        //2.发布订阅模式-总线机制
        Vue.prototype.bus = new Vue();
        Vue.component('child',{
            data: function(){
                return {
                    selfContent: this.content
                }
            },
            props: {
                content: String,
            },
            template: '<div @click="handleClick">{{selfContent}}</div>',
            methods:{
                handleClick: function(){
                    // alert(this.content)
                    //this.bus指的是vue实例上面的bus,每一个vue实例都会有bus属性
                    this.bus.$emit('change',this.selfContent)
                }
            },
            // 每一个组件都有生命周期钩子mounted,也就这个组件被挂载的时候,执行的一个函数
            mounted: function(){
                //function(msg)的this作用域发生了变化
                var this_ = this;
                this.bus.$on('change',function(msg){
                    // alert(msg);
                    //this_.content = msg这样写后台会报错,原因是vue有单向数据流,父组件传递给子组件的数据,子组件不能修改,只能在子组件中定义data数据
                    this_.selfContent = msg;
                })
            }
        })
        let vm= new Vue({
            el: '#app',

        }) 
    </script>
```

### 在vue中使用插槽


```html
    <div id="app">
        <child>
            <!-- 给插槽起名字 slot="名字"-->
            <div class="header" slot="header">header</div>
            <div class="footer" slot="footer">footer</div>
        </child>
    </div>
    <script>
        //父组件向子组件传递dom结构--->插槽slot 
        Vue.component('child', {
            template: '<div>'+
                            //slot插槽标签内添加name=""
                            '<slot name="header"></slot>' +
                            '<div class="content">content</div>'+
                            '<slot name="footer"></slot>' +
                       '</div>'
        })

        let vm = new Vue({
            el: '#app',

        })
    </script>
```

### 作用域插槽


```html
<div id="app">
        <child>
            <!-- 自定义插槽必须是template开头结尾的标签 -->
            <template slot-scope="props">
                <li>{{props.item}}</li>
            </template>
        </child>
    </div>
    <script>
        //父组件在调用子组件时候,给子组件传了个插槽,这个插槽叫做作用域插槽
        //作用域插槽必须是以template开头和结尾的内容,同时这个插槽要声明我要从子组件接收的数据,
        //都放在哪里?放在props里面.然后告诉子组件一个模板信息li标签读数据进行展示

        //什么时候使用作用域插槽 
        //当子组件循环或者某一部分他的dom结构应该由外部传递的时候,这个时候用作用域插槽
        //子组件可以向父组件的插槽传数据,父组件传递插槽如果想接收这个数据呢,必须在外层使用template
        //同时通过slot-scope对应的属性,在接收传递过来的数据
        Vue.component('child', {
            data: function(){
                return {
                    list: [1,2,3,4]
                }
            },
            template:'<div><ul><slot v-for="item of list" :item=item></slot></ul></div>' 
        })
        let vm = new Vue({
            el: '#app',

        })
    </script>
```

### vue动态组件


```html
<div id="app">
        <!-- 动态组件 -->
        <!-- 动态组件会根据is里面的数据的变化,自动的加载不同的组件 -->
        <component :is="type"></component>
        <!-- <child-one v-if='type === "child-one"'></child-one>
        <child-two v-if='type === "child-two"'></child-two> -->
        <button @click="handleClick">change</button>
    </div>
    <script>
        Vue.component('child-one', {
            template: '<div>child-one</div>'
        })
        Vue.component('child-two', {
            template: '<div>child-two</div>'
        })


        let vm = new Vue({
            el: '#app',
            data: {
                type: 'child-one'
            },
            methods: {
                handleClick: function(){
                    console.log(this);
                    this.type = this.type === "child-one" ? "child-two" : "child-one"
                }
            }
        })
    </script>
```

### vue的v-once指令


```html
<div id="app">
        <component :is="type"></component>
        <!-- <child-one v-if='type === "child-one"'></child-one>
        <child-two v-if='type === "child-two"'></child-two> -->
        <button @click="handleClick">change</button>
    </div>
    <script>
        //每次切换组件的时候,底层都会销毁一个组件,创建一个组件,这种操作耗费性能
        //如果每次创建的内容都一样,可以在下面加一个v-once指令.好处,切换过过的组件直接放内存里面,而不需要套重新创建,提高了一定的性能
        Vue.component('child-one', {
            template: '<div v-once>child-one</div>'
        })
        Vue.component('child-two', {
            template: '<div v-once>child-two</div>'
        })


        let vm = new Vue({
            el: '#app',
            data: {
                type: 'child-one'
            },
            methods: {
                handleClick: function(){
                    console.log(this);
                    this.type = this.type === "child-one" ? "child-two" : "child-one"
                }
            }
        })
    </script>
```

### 列表渲染
#### 对列表渲染我们使用v-for来进行渲染,v-for指令需要使用 ==item in items== 的形式特殊语法,todos是源数据源数组并且todo是数组元素迭代的别名.
```html
<li v-for="todo in todos">
    {{todo.text}}
</li>
var vm = new Vue({
    el: '#app',
    data: {
        todos: [
            {text: '学习js'},
            {text: '学习angular'},
            {text: '学习vue'},
            {text: '学习react'},
          ]
        }
    })
```
#### v-for可以使用一各对象的属性来进行迭代,例如 ==value,key,index==作为参数. ==在遍历对象的时候,是按照 Object.keys()的结果来进行遍历,当时不能保证它的结果是在不同的js引擎下是一致的.
```
<li v-for="(key, value, index) in message">
    {{index}}--{{key}}--{{value}}
</li>
```
```javascript
var vm = new Vue({
    el: '#app',
    data: {
        message :{
            firstname: 'yang',
            middlename: 'yong',
            lastname: 'sen',
            age: 30,
            job: 'web front'
        }
    }
})
//输出结果
0--yang--firstname
1--yong--middlename
2--sen--lastname
3--30--age
4--web front--job
//vue不能检测对象属性的添加或者删除
//对于已经创建的vue实例,vue是不能动态的添加根级别的响应式属性.当时可以使用Vue.set(object, key, value),或者是vm.$set(object, key, value)它只是全局的Vue.set的别名.
Vue.set(vm.message, 'mother', 'dongliying')
vm.$set(vm.message, 'father', 'yangguisheng')
//输出结果
5--dongliying--mother
6--yangguisheng--father
```
#### 如果是要为已有得对象添加多个新属性,可以使用 ==Object.assign()或者_.extend==.这时应该用两个对象属性来创建一个新的对象
```
    vm.message = Object.assign({}, vm.message, {
        sister: 'dansan',
        brother: 'yang kai'
    })
```

### 显示过滤/排序结果
```html
<div id="app">
    <ul>
      <!-- computed方法 -->
      <!-- <li v-for="n in evenNumber">{{n}}</li> -->

      <!-- mothod方法 -->
      <li v-for="n in even(numbers)">{{n}}</li>
    </ul>
</div>
```
```
    <script src="node_modules/vue/dist/vue.js"></script>
    <script>
      var vm = new Vue({
        el: '#app',
        data: {
          numbers: [1,2,3,4,5,6,7,8,9]
        },
        // computed: {
        //   evenNumber: function(){
        //     return this.numbers.filter(function(number){
        //       return number % 2 === 0
        //     })
        //   }
        // }

        //在计算属性不适用得情况下(比如在v-for嵌套),你可以使用method方法
        methods: {
          even: function(numbers){
            return numbers.filter(function(number){
              return number % 2 === 0
            })
          }
        }
        
      })
    </script>

```
### v-for with v-if
```html
<ul id="app">
    <!-- 如果是处于同节点的时候,v-for 比v-if的优先级高,v-if在将在v-for中循环 -->
    <!-- 下面的代码只是加载了未完成的todis -->
    <li v-for="todo in todos" v-if="!todo.isComplete">{{todo}}</li>
</ul>

<!-- 如果你是想有条件的跳过驯化执行,那就把v-if放在v-for外层 -->
<ul v-if="todos.something">
    <li v-for="todo in todos"></li>
</ul>
<p v-else>No todos left!</p>
```
### 例子:
```html
<div id="app-input">
    <form action="" v-on:submit.prevent="addNewTodo">
      <label for="new-todo">添加一个任务项:</label>
      <input type="text"
        v-model="newTodoText"
        id="new-todo"
        placeholder="E.g Feed the cat"
      >
      <button>AddMessage</button>
    </form>
    <ul>
      <!-- li中的is特性,是跟html模板限制有关,正常情况下面像ul,ol,table,select等包含的子标签(li,tr,option)是固定的.如果在
        以上标签中使用组件标签,就会报错.这时候is 的特性就展现出来了.你可以这样写:
        <li is="my-componentName"><li>
        以上子标签同样使用方法.也没输出为:
        <my-componentNam></my-componentNam>
      -->
      <li is="todo-item"
        v-for="(todo, index) in todos"
        v-bind:key="todo.id"
        v-bind:title="todo.title"
        v-on:remove="todos.splice(index,1)">

      </li>
    </ul>
  </div>
```
```javascript
Vue.component('todo-item', {
        //$emit- 触发实例上的remove事件,后面附件参数都会回调给监听器回调
        template: '\
          <li>\
            {{ title }}\
            <button v-on:click="$emit(\'remove\')">Remove</button>\
          </li>\
        ',
        props: ['title']
      })
      var vm = new Vue({
        el: '#app-input',
        data: {
          newTodoText: '',
          todos: [
            {id: 1,title: 'do the dished'},
            {id: 2,title: 'take out the trash'},
            {id: 3,title: 'now the law'}
          ],
          nextTodoId: 4
        },
        methods: {
          addNewTodo: function(){
            this.todos.push({
              id: this.nextTodoId++,
              title: this.newTodoText
            })
            this.newTodoText = ''
          }
        }
      })
```
### 事件处理
#### 监听DOM事件可以用vue中的指令v-on,触发指令时运行一些代码.
```html
    <div id="app">
        <button v-on:click="btnClick">点击</button>
        <p>按钮点击加一: {{counter}}</p>
    </div>
```
```javascript
    var vm = new Vue({
        el: '#app',
        data: {
            counter: 0
        },
        methods: {
            btnClick: function(){
                this.counter += 1
            }
        }
    })
```
#### 有时候需要在内联语句中访问原始的DOM事件,可以使用vue提供的特殊变量 ==$event== 把他传入方法.
```html
    <div id="app">
        <button v-on:click="btnClick('i am b', $event)">submit</button>
    </div>
```
```javascript
    //上面的代码就省略了...
    methods: {
        btnClick: function(message, event){
            //这样我们就可以在这里访问原生事件对象了
            if(event){
                //取消该对象的默认事件
                event.preventDefault()
            }
            console.log(message)
        }
    }
```
#### 事件的修饰符








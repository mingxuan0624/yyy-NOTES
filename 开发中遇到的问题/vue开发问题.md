### Vue开发中遇到的问题
#### 一.今天主要是遇到的问题是以vue+element为主,在开发后端管理系统页面跳转传参和接收参数的问题.
```javascript
//A页面路由跳转
methods: {
    //根据id完善用户列表
    //之前传参用的params,查找资料是query
    infoperfectBtn(id, index, row) {
      this.$router.push({
        path: "/infoPerfect",
        query: {
          id: id
        }
      });
    }
}

```
#### 那么你在B页面该这么接收呢?==你有想过在creat()函数中接收这个id么?==,反正我是没有想到,导致找了很久才找到问题所在.
```javascript
//vue传参的原理主要在于 Vue.route.params(也有route.query)
//route是Vue的属性.params是route的属性,用来储存数据的键值对.就是说它对象,储存很多属性(键值对,属性,属性值)在里面.
export default {
    data() {
        return {
            id: this.$route.params.id,
        }
    },
    creat(){//你得在页面初始化加载的时候就得拿到id值,并通过id值查找相关得数据,并赋值给页面
        this.id = this.$route.query.id;
        console.log(this.id);
    }

}

```
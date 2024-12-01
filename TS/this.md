
### this指向为题

  1. 普通函数下，谁调用该函数，this指向谁
  2. 箭头函数下，谁创建该箭头函数，this指向谁
  3. a() 相当于是全局调用，要分清楚现在全局是谁 
      1. 严格模式下全局是undefined
      2. 非严格模式下
        - 浏览器全局是window
        - node环境全局是global
        - node xx.js模式下调用时，直接打印this是{}，在函数中调用打印this是global
  4. 以及全局中有没有this.b 
    如果全局var b = 123 此时全局对象中会有window.b或global.b
    如果全局let/const b = 123 此时全局对象中不会有window.b或global.b
  5. 手动修改this的指向
      1. bind  定义函数的时候绑定this指向,箭头函数不能绑定this
        参数格式同call，适用于确定参数个数的情况
        ```
          function fun(...arg) {
            console.log(this, arg)
          }
          let xx = fun.bind({a: 1}, 1, 2, 3)
          xx() 
        ```
        ```
          let obj = {
            a: 22,
            fun: function(a, b, c) {
              console.log(this, a, b, c)
            }.bind({a: 122}, 1, 2, 3)
          }
          obj.fun()
        ```
      2. call 调用的时候修改,适用于确定参数个数的情况
        ```
          function fun(a, b, c) {
            console.log(this, a, b, c)
          }
          fun.call({a: 1}, 1, 2, 3) 
          //  {a: 1} 1 2 3
        ```
      3. apply 调用的时候修改，适用于参数不定的情况,参数传数组
        ```
          let params = [1, 2, 3, 4]
          function fun(...arg) {
            console.log(this, arg)
          }
          fun.apply({a: 1}, params) 
          //  {a: 1} [1, 2, 3, 4]
        ```
  6. 回调函数  遵循1.2的原则
      1. 延时函数为例，普通函数，指向调用者。
        在obj.foo()是创建函数，然后加入到延时系统中，等待调用，等到延时时间到，调用这个时候调用者是全局。
      ```
        var a = 'win'
        var obj = {
          a: 'obj',
          foo: function() {
            setTimeout(function() {
              console.log(this.a)
            }, 100);
          }
        }
        var x = obj.foo()
        // 'win'
      ```
      2. 延时函数为例，箭头函数，指向创建者。
      在obj.foo()是创建函数，创建者是obj，然后加入到延时系统中，等待调用，等到延时时间到，调用这个时候调用者是全局，但是this指向创建者obj。
      ```
        var a = 'win'
        var obj = {
          a: 'obj',
          foo: function() {
            setTimeout(() => {
              console.log(this.a)
            }, 100);
          }
        }
        var x = obj.foo()
        // 'obj'
      ```
      3. 普通非延时函数, 永远指向全局
      ```
        var obj = {
          a: 'obj',
          foo: (c) => {
            return c
          }
        }
        function c() {
          console.log(this)
        }
        var x = obj.foo(c)
        x()
      ```

  ----

- JavaScript里，this的值在函数被调用的时候才会指定。  
顶级的非严格模式调用会将 this视为window。 
（注意：在严格模式下， this为undefined而不是window）。
箭头函数能保存函数创建时的 this值，而不是调用时的值.
举个例子说明箭头函数中this和普通函数中this的区别：
    ```
    var a = 'win'
    var obj = {
      a: 'obj',
      foo: function() {
        return function() {
          // 谁调用指向谁
          console.log('a', this.a)
        }
      }
    }
    var x = obj.foo()
    console.log(x());  // 'win'
    ```
    ```
    var a = 'win'
    var obj = {
      a: 'obj',
      foo: function() {
        return () => {
          <!-- 谁创建这个函数，this指向谁 -->
          console.log('a', this.a)
        }
      }
    }
    var x = obj.foo()  // obj创建
    console.log(x());  // 'obj'  
    ```
    ```
    var a = 'win'
    var obj = {
      a: 'obj',
      foo: function() {
        return () => {
          <!-- 谁创建这个函数，this指向谁 -->
          console.log('a', this.a)
        }
      }
    }
    var x = obj.foo  
    console.log(x()());  // x()window创建 x()()调用'win'  
    ```
    - 但是如果外面的a不是用var定义，是用let或const定义，就不同了
    var a = 'win'同时会创建window.a = 'win'所以全局window调用的时候this.a会打印出'win'，但是如果let或const，全局window并不会创建window.a = 'win'，此时window.a = undefined。
    eg:
    ```
    let a = 'win'
    var obj = {
      a: 'obj',
      foo: function() {
        return () => {
          <!-- 谁创建这个函数，this指向谁 -->
          console.log('a', this.a)
        }
      }
    }
    var x = obj.foo  
    console.log(x()()); 
    // x()window创建 x()()window调用 window.a是 undefined 
    ```
    ```
    let a = 'win'
    var obj = {
      a: 'obj',
      foo: function() {
        return function() {
          // 谁调用指向谁
          console.log('a', this.a)
        }
      }
    }
    var x = obj.foo()  // obj创建
    console.log(x()); 
    //  x() window调用 window.a是 undefined 
    ```

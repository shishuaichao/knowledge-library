
### this指向为题

  1. 普通函数下，谁调用该函数，this指向谁
  2. 箭头函数下，谁创建该箭头函数，this指向谁
  3. a() 相当于是全局调用，要分清楚现在全局是谁 
      1. 严格模式下全局是undefined
      2. 非严格模式下
        - 浏览器全局是window
        - node环境全局是global
        - node xx.js模式下调用时，全局是空对象{}
  4. 以及全局中有没有this.b 
    如果全局var b = 123 此时全局对象中会有window.b或global.b
    如果全局let/const b = 123 此时全局对象中不会有window.b或global.b

  ---

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

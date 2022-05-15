
const Vue = () => {
  let arr = []
  return {
    use: (str) => {
      if (arr.indexOf(str) < 0) {
        arr.push(str)
        console.log('调用了', str);
      }
    }
  }
}

let app = Vue()

app.use('xxx')
app.use('xxx')
app.use('hhh')
app.use('hhh')

// 调用了 xxx
// 调用了 hhh

/**
 * 类似于vue中的插件调用，多次调用只会执行一次
 * 利用闭包原理，在构造函数中定义变量存储调用过程
 */
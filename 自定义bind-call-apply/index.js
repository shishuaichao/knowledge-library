// 自定义实现 bind/call/apply

// myBind/myCall/myApply

let obj = {a: 1}
let foo = function(a, b) {
  console.log(this, a + b)
  return 'sss'
}
// let f = foo.bind(obj, 1, 2)
// f()
// console.log(`f()`, f());
// foo.call(obj, 1, 2)
// foo.apply(obj, [1, 2])




// 自定义实现
// 核心 
// 1. 先写call，然后调用apply时，修改参数格式调用call，bind时return一个空函数，空函数中调用call
// 2. 3个都要有return，因为函数可能会有返回值
// 3. 在bind中判断传入的this指定是对象还是null/undefined，如果是后者this指向全局


Function.prototype.myCall = function(obj, ...args) {
  let fn = this
  Object.prototype.fn = fn
  if (obj) {
    return obj.fn(...args)
  } else {
    return fn(...args)
  }
}
// foo.myCall(obj, 1, 2)


Function.prototype.myApply = function(obj, args) {
  let fn = this
  return fn.myCall(obj, ...args)
}
foo.myApply(obj, [1, 2])



Function.prototype.myBind = function(obj, ...args) {
  let fn = this
  return function() {
    return fn.myCall(obj, ...args)
  }
}
// let mb = foo.myBind(obj, 1, 2)
// mb()




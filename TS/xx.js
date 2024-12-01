

// 回调函数中的this

// var a = 'win'
// var obj = {
//   a: 'obj',
//   foo: function() {
//     setTimeout(() => {
//       console.log(this.a)
//     }, 100);
//   }
// }

// var x = obj.foo()


// var obj = {
//   a: 'obj',
//   foo: (c) => {
//     return c
//   }
// }
function c() {
  // global && console.log(global)
  console.log('xxx')
}
// var x = obj.foo(c)
global && console.log(global.global)
// console.log(this)
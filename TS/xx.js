
var a = 'win'
var obj = {
  a: 'obj',
  foo: function() {
    return () => {
      console.log('a', this.a)
    }
  }
}

var x = obj.foo()
console.log(x());

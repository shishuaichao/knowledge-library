## 类

  - 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。
  - public
    - 在TypeScript里，成员都默认为 public。
  - private
    - 当成员被标记成 private时，它就不能在声明它的类的外部(也就是实例、派生类)访问。
    - 私有属性不能从外部获取，但是可以通过内部方法让实例可以获取，(js中静态私有属性也是如此)
  - protected
    - 修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问，但是实例中也不能访问。
    - protected修饰符与 private修饰符的行为很相似，实例中都不能访问，但有一点不同， protected成员在派生类中仍然可以访问。
    - 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
  - readonly
    - 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
    - 仅在构造函数里使用 readonly name: string参数来创建和初始化 name成员。 我们把声明和赋值合并至一处。constructor(readonly name: string)
    - 其次，只带有 get不带有 set的存取器自动被推断为 readonly。
  - abstract
    - 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
  - 如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。
    ```javascript
      class Point {
        x: number;
        y: number;
      }
      interface Point3d extends Point {
          z: number;
      }

      let point3d: Point3d = {x: 1, y: 2, z: 3};
    ```
  



#### JS和TS中Class的区别与比较
  - private 
    js中用#xxx, 
    ts中用private xxx,
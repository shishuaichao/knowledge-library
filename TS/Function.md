
## 函数

  - 可选参数必须跟在必须参数后面。
    ```
    function buildName(firstName: string, lastName?: string) 
    ```
  - 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数。 在TypeScript里，你可以把所有参数收集到一个变量里：
    ``` 
    function buildName(firstName: string, ...restOfName: string[]) {
      return firstName + " " + restOfName.join(" ");
    }
    ```
  

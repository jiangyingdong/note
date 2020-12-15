## Java的三大特性

> - 封装
> - 继承
> - 多态
>

### 封装

> 避免直接访问修改类中的属性，通过提供相应的方法来访问或修改类的属性，如此我们可以在这些方法中添加逻辑控制，限制对属性的不合理访问。
>
> 封装是基于Java提供的访问控制符实现的：private、protected、public、default（jdk8新增，主要使用于接口中，定义实例方法）

### 继承

> 继承就是基于一个已存在的类（即父类），在创建一个新类（既子类）时，子类继承父类的属性和方法，同时还能覆写从父类继承过来的属性和方法、新定义其他的属性和方法。

> 优点：
>
> - 实现代码复用，提高程序编写效率
> - 使类功能易于拓展
>

### 多态

> 所谓多态就是指程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编译时并不确定（方法的重载是根据参数列表的不同来区分不同的函数，通过编译之后会变成两个不同的函数），而是在程序运行期间才确定，即一个引用变量倒底会指向哪个类的实例对象，该引用变量发出的方法调用到底是哪个类中实现的方法，必须在由程序运行期间才能决定。因为在程序运行时才确定具体的类，这样，不用修改源程序代码，就可以让引用变量绑定到各种不同的类实现上，从而导致该引用调用的具体方法随之改变，即不修改程序代码就可以改变程序运行时所绑定的具体代码，让程序可以选择多个运行状态，这就是多态性。
>
> 多态的实现基于：继承、覆写、向上转型

> - 编译时多态
>     - 方法重载
> - 运行时多态
>     - 当一个父类变量调用被子类重写的方法时，随着父类变量指向的子类实例的不同，该方法所执行的实例也不一样
>

## 抽象类、接口

> - 抽象类是一个类，具有一般类的特征，细节方面有些不同。
> - 声明与继承实现的关键字不同
> - 单继承与多实现
>     - 子类只能继承一个父类，但是可以实现多个接口。
>     - 接口可以继承多个接口，不能实现接口。
> - 权限修饰符的使用：
>     - 抽象类和一般类一样，权限修饰符默认的就是没有权限修饰符（缺省），表示只有同包和本类中可以访问。
>     - default只能在接口中使用，只能修饰方法（被修饰的方法必须有方法体），且只能单独使用，无法与static、final一起使用。
>     - 抽象类中abstract只能和public、protected一起使用，且只能修饰方法，也无法与static、final一起使用。
>     - 接口属性默认且只能被public final static修饰，方法默认public修饰，无法被final修饰，使用static的方法需要有方法体，此外只能被default单独修饰。
>     - 抽象类中private修饰的无法继承；接口中default修饰的方法必须有具体实现，重写的时候修改为public。
> - 两者都无法抽象成员属性，只能抽象方法，而且无法抽象静态方法。
>     - 接口中成员属性默认且只能被public final static修饰，必须实例化，不可修改；抽象类的成员属性不可被abstract修饰。	
> - 静态成员（static修饰）的处理不同
>     - 抽象类中的静态**成员**可以继承，但是接口中的静态**方法**无法继承。
> - 抽象类可以有构造函数，接口没有；虽然都无法创建实例。
>

## 集合

> - [List、Set、Map](https://blog.csdn.net/qq_30711091/article/details/88847892)
> - ![img](https://img-blog.csdn.net/20180725145224835?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjMxMTU0MA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70) 
> - ![img](https://img-blog.csdnimg.cn/20190327175421590.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwNzExMDkx,size_16,color_FFFFFF,t_70) 
>

## 字符串对象

| String                                                       | StringBuffer                                                 | StringBuilder    |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| String的值是不可变的，这就导致每次对String的操作都会生成新的String对象，不仅效率低下，而且浪费大量优先的内存空间 | StringBuffer是可变类，和线程安全的字符串操作类，任何对它指向的字符串的操作都不会产生新的对象。每个StringBuffer对象都有一定的缓冲区容量，当字符串大小没有超过容量时，不会分配新的容量，当字符串大小超过容量时，会自动增加容量 | 可变类，速度更快 |
| 不可变                                                       | 可变                                                         | 可变             |
|                                                              | 线程安全                                                     | 线程不安全       |
|                                                              | 多线程操作字符串                                             | 单线程操作字符串 |

## 常见异常

> - NullPointerExcetion
> - OutOfMemoryError
> - IOExcetion
> - FileNotFoundException
> - ClassNotFoundException
> - ClassCastException
> - NoSuchMethodException
> - IndexOutBoundsException
> - ArithmeticExcecption
> - SQLException
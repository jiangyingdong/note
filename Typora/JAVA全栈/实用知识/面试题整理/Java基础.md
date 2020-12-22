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

## 集合详情

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

## [四种线程](https://www.cnblogs.com/duanjiapingjy/p/9434244.html)：

- 继承Thread类，重写run方法

- 实现Runnable接口，重写run方法

- 实现Callable接口，重写call方法，可返回参数

    - 使用Callable实现类（指定泛型，跟call返回值对应）对象作为参数，创建一个FutureTask类对象；利用FutureTask类对象作为参数创建一个Thread类对象作为一个线程对象；FutureTask对象方法get用于获取call方法的返回值。

- [使用线程池（四种）](https://www.cnblogs.com/jiawen010/p/11855768.html)

    > 线程池的好处：
    >
    > - 降低资源消耗
    > - 提高响应速度
    > - 提高线程的可管理性

    - 方法1：使用Executors的类方法newFixedThreadPool获取一个指定池大小的ExecutorService类对象，使用ExecutorService对象方法submit传入Runnable实现类对象作为参数来添加线程并启动；可以使用ExecutorService对象方法shutdown（和平的）shutdownNow（立即的）来关闭线程池。
    - 方法2：...

### 并发编程：

- 原子性
    - 即一个操作或者多个操作 要么全部执行并且执行的过程不会被任何因素打断，要么就都不执行。
- 可见性
    - 可见性是指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。
- 有序性
    - 即程序执行的顺序按照代码的先后顺序执行。因为为了提高代码执行效率可能会进行代码重排序，只是最后结果保持不变。

###  [线程安全](https://blog.csdn.net/csdnnews/article/details/82321777)：

> 限制多线程访问互斥资源，使互斥资源一次只能被一个线程访问。

- [synchronized关键字](https://blog.csdn.net/weixin_36759405/article/details/83034386)
- Lock类，使用对象方法lock、unlock来获取或者释放锁 

### [线程通信](https://blog.csdn.net/u010919402/article/details/105446136?utm_medium=distribute.pc_relevant.none-task-blog-title-2&spm=1001.2101.3001.4242)：

> 都是基于俩种通信模型：共享内存、消息传递

- [volatile关键字](https://www.cnblogs.com/dolphin0520/p/3920373.html)

- [Object类对象方法wait、notify、notifyAll](https://www.cnblogs.com/moongeek/p/7631447.html)

    > 配合synchronized使用，在互斥区中使用

    - wait方法阻塞当前线程，并且自动释放获得的锁；[跟sleep有区别](https://blog.csdn.net/qq_20009015/article/details/89980966)
    - notify方法唤醒指定的阻塞线程，但是不会自动释放锁；notifyAll唤醒所有阻塞的线程

- ...

## Lambda

> 函数式编程。
>
> 为接口方法编辑方法体（该接口只能有一个方法），类似于匿名类。已实现的方法无法编辑。
>
> lambda 表达式只能引用标记了 final 的外层局部变量，这就是说不能在 lambda 内部修改定义在域外的局部变量，否则会编译错误。

> ```java
> // 1. 不需要参数,返回值为 5  
> () -> 5  
>   
> // 2. 接收一个参数(数字类型),返回其2倍的值  
> x -> 2 * x  
>   
> // 3. 接受2个参数(数字),并返回他们的差值  
> (x, y) -> x – y  
>   
> // 4. 接收2个int型整数,返回他们的和  
> (int x, int y) -> x + y  
>   
> // 5. 接受一个 string 对象,并在控制台打印,不返回任何值(看起来像是返回void)  
> (String s) -> System.out.print(s)
> ```


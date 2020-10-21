## HTTP协议

### 路由 URL

- [url：统一资源定位符](https://baike.baidu.com/item/URL%E6%A0%BC%E5%BC%8F/10056474?fr=aladdin)

### [请求方式](https://www.cnblogs.com/weibanggang/p/9454581.html)

- 一共有八种![img](https://images2018.cnblogs.com/blog/1418466/201808/1418466-20180810112625596-2103906128.png)

- HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法。

  HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法

- 常用俩种：Post、Get

- [Post 与 Get 的区别](https://www.cnblogs.com/logsharing/p/8448446.html)

### [响应状态](https://www.cnblogs.com/lyraLee/p/11588417.html)

- 100-199信息响应
- 200-299成功响应
- 300-399重定向消息
- 400-499客户端错误响应
- 500-599服务器错误响应

## JSP九大内置对象

1.request：对象主要用于处理客户端请求，在（页面转发，获取cookie）用到

2.response：用于处理响应客户端请求，在（页面重定向）中使用

3.session：在网络中被称为会话，一个会话就是浏览器与服务器之间的一次通话（保存登录状态时）

4.application：就像全局变量，用于保存应用程序中的共有数据（上传时获取真实路径）

5.out：对象用于在web浏览器内输出信息，数据输出完，要及时关闭输出流

6.pageContext：用于获取页面的上下文，通过此对象可以获取页面的其他8个内置对象

7.config:用于取得服务器的配置信息

8.page:代表jsp本身，只有在jsp页面内才是合法的

9.exception:用于处理jsp页面发生的异常

## [Servlet生命周期](https://blog.csdn.net/zhaohong_bo/article/details/89671888)

1. init()初始化阶段
2. service()处理客户端请求阶段
3. destroy()终止阶段

## [拦截器和过滤器的区别](https://blog.csdn.net/longzhongxiaoniao/article/details/85727725)

（1）、Filter需要在web.xml中配置，依赖于Servlet；
（2）、Interceptor需要在SpringMVC中配置，依赖于框架；
（3）、Filter的执行顺序在Interceptor之前，具体的流程见下图；

![è¿éåå¾çæè¿°](https://img-blog.csdn.net/20180603133007923?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p4ZDE0MzU1MTM3NzU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

（4）、两者的本质区别：拦截器（Interceptor）是基于Java的反射机制，而过滤器（Filter）是基于函数回调。从灵活性上说拦截器功能更强大些，Filter能做的事情，都能做，而且可以在请求前，请求后执行，比较灵活。Filter主要是针对URL地址做一个编码的事情、过滤掉没用的参数、安全校验（比较泛的，比如登录不登录之类），太细的话，还是建议用interceptor。不过还是根据不同情况选择合适的。
## 过滤器(Filter)

------

过滤器实际上就是对web资源进行拦截，做一些处理后再交给下一个过滤器或servlet处理
通常都是用来拦截request进行处理的，也可以对返回的response进行拦截处理

大概流程图如下

![这里写图片描述](https://img-blog.csdn.net/20180730175152255?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**应用场景**
自动登录
统一设置编码格式
访问权限控制
敏感字符过滤等

------

## 创建Filter

在Servlet中我们一般都会对request和response中的字符集编码进行配置，如果Servlet过多字符集编码发生变化时修改起码会很麻烦，这些通用的字符集编码配置等工作我们可以放到Filter中来实现。
下面我们来创建一个处理字符集编码的Filter。

右键包名—>new ---->Filter

![这里写图片描述](https://img-blog.csdn.net/20180731100951984?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

输入过滤器名称，跟创建Servlet一样，这里我们直接使用 **@WebFilter** 注解，不再去web,xml中进行配置了。

![这里写图片描述](https://img-blog.csdn.net/2018073110104143?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

创建完成后默认代码，可以看到，CharsetFilter实现了Filter接口,实现了3个方法。3个方法的作用已经在注释中写清楚了。

```java
package filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "CharsetFilter")
public class CharsetFilter implements Filter {
    public void destroy() {
        /*销毁时调用*/
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        /*过滤方法 主要是对request和response进行一些处理，然后交给下一个过滤器或Servlet处理*/
       
        chain.doFilter(req, resp);//交给下一个过滤器或servlet处理
    }

    public void init(FilterConfig config) throws ServletException {

        /*初始化方法  接收一个FilterConfig类型的参数 该参数是对Filter的一些配置*/

    }

}
```

## 配置Filter

可配置的属性有这些

![这里写图片描述](https://img-blog.csdn.net/2018073110130175?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

常用配置项
**urlPatterns**
配置要拦截的资源

1. 以指定资源匹配。例如`"/index.jsp"`
2. 以目录匹配。例如`"/servlet/*"`
3. 以后缀名匹配，例如`"*.jsp"`
4. 通配符，拦截所有web资源。`"/*"`

**initParams **
配置初始化参数，跟Servlet配置一样

例如

```
initParams = {
        @WebInitParam(name = "key",value = "value")
}
```

**dispatcherTypes **
配置拦截的类型，可配置多个。默认为**DispatcherType.REQUEST**
例如

```
dispatcherTypes = {DispatcherType.ASYNC,DispatcherType.ERROR}
```

其中DispatcherType是个枚举类型，有下面几个值

```
	FORWARD,//转发的
    INCLUDE,//包含在页面的
    REQUEST,//请求的
    ASYNC,//异步的
    ERROR;//出错的
```

下面我们来对CharsetFilter 代码进行一下修改

```java
package filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;
import java.io.IOException;

@WebFilter(filterName = "CharsetFilter",
        urlPatterns = "/*",/*通配符（*）表示对所有的web资源进行拦截*/
        initParams = {
                @WebInitParam(name = "charset", value = "utf-8")/*这里可以放一些初始化的参数*/
        })
public class CharsetFilter implements Filter {
    private String filterName;
    private String charset;

    public void destroy() {
        /*销毁时调用*/

        System.out.println(filterName + "销毁");
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        /*过滤方法 主要是对request和response进行一些处理，然后交给下一个过滤器或Servlet处理*/
		System.out.println(filterName + "doFilter()");
        req.setCharacterEncoding(charset);
        resp.setCharacterEncoding(charset);
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

        /*初始化方法  接收一个FilterConfig类型的参数 该参数是对Filter的一些配置*/

        filterName = config.getFilterName();
        charset = config.getInitParameter("charset");

        System.out.println("过滤器名称：" + filterName);
        System.out.println("字符集编码：" + charset);

    }

}
```

这样一个简单的字符集编码处理的过滤器就完成了
我们看看执行打印的结果
![这里写图片描述](https://img-blog.csdn.net/20180731104002131?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

需要注意的是
过滤器是在**服务器启动时**就会创建的，只会创建**一个实例**，常驻内存，也就是说服务器一启动就会执行Filter的init(FilterConfig config)方法.
当Filter被移除或服务器正常关闭时，会执行destroy方法

------

## 多个Filter的执行顺序

在我们的请求到达Servle之间是可以经过多个Filter的，一般来说，建议Filter之间不要有关联，各自处理各自的逻辑即可。这样，我们也无需关心执行顺序问题。
如果一定要确保执行顺序，就要对配置进行修改了，执行顺序如下

1. 在web.xml中，filter执行顺序跟`<filter-mapping>`的顺序有关，**先声明的先执行**
2. 使用注解配置的话，filter的执行顺序跟名称的**字母顺序**有关，例如AFilter会比BFilter先执行
3. 如果既有在web.xml中声明的Filter，也有通过注解配置的Filter，那么会**优先执行web.xml中配置的Filter**

我们写个小例子看一下

新建3个Filter，加上之前的CharsetFilter一共四个

![这里写图片描述](https://img-blog.csdn.net/20180731111947661?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

其中**CharsetFilter**和**ABFilter**是通过**注解**声明的

**CharsetFilter注解配置**

```
@WebFilter(filterName = "CharsetFilter",
        urlPatterns = "/*",/*通配符（*）表示对所有的web资源进行拦截*/
        initParams = {
                @WebInitParam(name = "charset", value = "utf-8")/*这里可以放一些初始化的参数*/
        })
```

**ABFilter**

```
@WebFilter(filterName = "ABFilter",urlPatterns = "/*")
1
```

**AFilter**和**BFilter**是在**web.xml**配置的。
执行顺序跟`<filter>`的顺序**无关**
`<filter-mapping>`的顺序才决定执行顺序

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <filter>
        <filter-name>AFilter</filter-name>
        <filter-class>filter.AFilter</filter-class>
    </filter>
    <filter>
        <filter-name>BFilter</filter-name>
        <filter-class>filter.BFilter</filter-class>
    </filter>

    <!--这里BFilter在AFilter之前-->
    <filter-mapping>
        <filter-name>BFilter</filter-name>
        <url-pattern>/filter.jsp</url-pattern>
    </filter-mapping>

    <filter-mapping>
        <filter-name>AFilter</filter-name>
        <url-pattern>/filter.jsp</url-pattern>
    </filter-mapping>

   
</web-app>
```

每个Filter添加了打印语句，如下
以ABFilter为例

```java
package filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "ABFilter",urlPatterns = "/*")
public class ABFilter implements Filter {
    private String filterName;

    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        System.out.println(filterName + "  doFilter()");
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {
        filterName= config.getFilterName();
        System.out.println("过滤器名称：" + filterName +" init");
    }

}
```

下面我们来访问filter.jsp看看打印结果

![这里写图片描述](https://img-blog.csdn.net/20180731113112781?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可以看到，执行结果符合预期。
BFilter和AFilter是在web.xml中声明的，且BFilter的`<filter-mapping>`在前，故BFilter在AFilter之前执行。
ABFilter和CharsetFilter是通过注解声明的，故他俩在BFilter和AFilter之后执行，但是ABFilter的名称以A开头，故在CharsetFilter之前执行

![这里写图片描述](https://img-blog.csdn.net/20180731113157169?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

------

## 访问权限控制小例子##

下面我们写一个访问控制权限控制的小例子。
我们在浏览一些网站经常有这个情况，没有登录时是不允许我们访其主页的，只有登录过后才能访问。
下面我们就用Filter简单实现一下。

**需求分析**

1. 登录时将登录的账号密码保存到cookie中，下次访问时携带账号和密码，过滤器中进行校验
2. 用户没有登录直接访问主页时，要跳转到登录页面
3. 登录过滤器不对登录页面进行过滤

我们先来看一下项目结构

![这里写图片描述](https://img-blog.csdn.net/20180731164749317?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

这里主要看一下LoginFilter的代码

我们在LoginFilter中对非登录页面的其他jsp都会进行过滤，判断cookie中是否携带了account和pwd。
如果有这两个数据表示之前登录过，那么对数据进行校验，正确的话就进行下一个操作。
否则的话，跳转到登录界面

```
package filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "LoginFilter", urlPatterns = "*.jsp", dispatcherTypes = {})
public class LoginFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {


        System.out.println("LoginFilter doFilter");

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;

        String url = request.getRequestURI();

        System.out.println("请求的url：" + url);
        /*登录页面不需要过滤*/

        int idx = url.lastIndexOf("/");
        String endWith = url.substring(idx + 1);


        if (!endWith.equals("login.jsp")) {
            /*不是登录页面  进行拦截处理*/

            System.out.println("不是登录页面，进行拦截处理");

            if (!isLogin(request)) {
                System.out.println("没有登录过或者账号密码错误，跳转到登录界面");
                response.sendRedirect("login.jsp");
            } else {
                System.out.println("已经登录，进行下一步");
                chain.doFilter(req, resp);
            }

        } else {

            System.out.println("是登录页面，不进行拦截处理");
            chain.doFilter(req, resp);
        }


    }


    private boolean isLogin(HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();

        String account = "";
        String pwd = "";

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("account")) {
                    account = cookie.getValue();
                } else if (cookie.getName().equals("pwd")) {
                    pwd = cookie.getValue();
                }
            }
        }

        if (account.equals("") || pwd.equals("")) {
            return false;

        } else if (account.equals("yzq") && pwd.equals("123")) {
            return true;
        }


        return false;
    }

    public void init(FilterConfig config) throws ServletException {
        System.out.println("LoginFilter  init");
    }

}
```

执行效果

![这里写图片描述](https://img-blog.csdn.net/2018073116542785?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhpcWlhbmdfMTk5Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可以看到，我们在没有登录的情况下直接去访问index.jsp页面时会自动跳转到登录页面，在登录成功后，再次直接访问index页面则可以访问。

下面是demo

[访问控制demo](https://download.csdn.net/download/yuzhiqiang_1993/10575083)
## JSP+Servlet项目构建

### 导入相关包

- servlet-api
- mysql-connector-java
- jstl

### MVC模式（model、view、controller）

#### controller

- [Servlet的三种实现方式](https://blog.csdn.net/zhiaini06/article/details/52729604?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param)

- 新建一个servlet类，继承HttpServlet类，重写doPost、doGet方法（也有其他选择）

- doGet中调用doPost

- 对V层提交的数据的处理在doPost中做

  - 通过HttpServletRequest类对象获取参数值之前需要调用.setCharacterEncoding("utf-8");来设置字符编码，防止中文乱码；当然使用Filter进行编码设置更方便。

  - 实现跳转页面的俩种方式

    - 使用HttpServletResponse对象，重定向，不可以使用HttpServletRequest对象传值

      ```java
      //HttpServletResponse resp
      resp.sendRedirect(String 要调转的路由);
      ```

    - 使用HttpServletRequest对象，请求转发，可以使用HttpServletRequest对象传值

      ```java
      //HttpServletRequest req
      req.getRequestDispatcher(String 要调转的路由).forward(req,resp);
      ```

- 在web.xml文件中配置Servlet类，和字符编码过滤器

  - ```xml
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <servlet-name>/*</servlet-name>
    </filter-mapping>
    ```

  - ![img](https://images2015.cnblogs.com/blog/874710/201702/874710-20170216094053504-915571176.png)

- 通过配置的url可以进入该servlet类

#### model

- 各种功能组件，包括数据实体类和数据库操作类及其他组件
- 连接数据库时注意设置时区和字符编码，以防连接数据库效果不如意

#### view

- 使用[EL表达式](https://blog.csdn.net/pan_junbiao/article/details/88567466)配合[jstl](https://blog.csdn.net/tianjindong0804/article/details/80562565)来操作controller传过来的数据
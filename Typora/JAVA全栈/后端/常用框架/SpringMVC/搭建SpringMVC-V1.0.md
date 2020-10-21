## 需要的包

### SpringMVC

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>4.2.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>4.2.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>4.2.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>4.2.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-beans</artifactId>
    <version>4.2.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>4.2.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-expression</artifactId>
    <version>4.2.4.RELEASE</version>
</dependency>
```

## 配置Web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/j2ee/web-app_2_5.xsd">
    <welcome-file-list>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>

    <!-- 配置 springMVC 的核心控制器 -->
    <servlet>
        <servlet-name>SpringMVCDispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- 配置初始化参数, 用于读取 SpringMVC 的配置文件 -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc-config.xml</param-value>
        </init-param>
        <!-- 配置 servlet 的对象的创建时间点: 应用加载时创建. 取值只能是非0正整数,表示启动顺序 -->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>SpringMVCDispatcherServlet</servlet-name>
        <!-- ‘/’这个设置会使Spring拦截所有路由，需要在下面配置不拦截-->
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!-- 配置 springMVC 不拦截某资源；不能设置jsp，否则网页将无效 -->
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.css</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.js</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.gif</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.png</url-pattern>
    </servlet-mapping>


    <!-- 配置 springMVC 编码过滤器，支持中文 -->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <!-- 设置过滤器中的属性值 -->
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <!-- 启动过滤器 -->
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <!-- 过滤所有请求 -->
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

## 配置spring-mvc-config.xml

**该文件的位置需要跟Web.xml文件中配置的路由相对应；根目录是webapp或者src（resources）**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans
        xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:mvc="http://www.springframework.org/schema/mvc"

        xsi:schemaLocation="http://www.springframework.org/schema/beans
					http://www.springframework.org/schema/beans/spring-beans-4.1.xsd
					http://www.springframework.org/schema/context
					http://www.springframework.org/schema/context/spring-context-4.1.xsd
					http://www.springframework.org/schema/mvc
					http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!-- 配置spring容器要扫描的包 注解支持 注解都要写在这个范围内才有用 以下一定要写具体包名-->
    <context:component-scan base-package="controller"></context:component-scan>
    <context:component-scan base-package="model"></context:component-scan>

    <!-- 配置视图解析器 就是解析控制器返回视图的路由-->
    <!-- 这里是将控制器返回String拼接为正确路由的配置，最终路由为 prefix+String+suffix-->
    <bean id="InternalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/"></property>
        <property name="suffix" value=".jsp"></property>
        <!-- 以上配置之后，意味着控制器将无法跳转到另一个控制器，因为会自动加上你配置的前后缀 -->
    </bean>

    <!-- 配置 springMVC 的相关操作 -->
    <mvc:annotation-driven />

</beans>
```

## 控制器的构建

```java
@RestController //该注解修饰的类就是一个控制器
@RequestMapping(path = "/") //该注解为修饰的类或方法设置路由
public class Controller {

    @Autowired //该注解为变量自动创建实例，前提是该类型已被 @Service、@Repository 注解修饰过
    private UserService userService;

    /**
     * 这是一个映射模板
     * @param o
     * @return
     */
    @RequestMapping(path = "/model",params = {},method = RequestMethod.POST)//该注解为修饰的类或方法设置路由，和接受参数或者参数提交方式等等
    public ModelAndView model(Map map){
        ModelAndView mav = new ModelAndView();//创建ModelAndView        
        mav.addObject("data","data");//==>request.setAttribute("data",data);//将数据存到 ModelAndView 对象中,,也会把数据存入到request对象        
        mav.setViewName("index");//设置要跳转的页面        
        return mav;//跳转
    }
}
```
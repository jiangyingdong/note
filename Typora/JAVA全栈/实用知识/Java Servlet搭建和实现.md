# Java Servlet搭建和实现

### 环境设置

Java开发环境

Tomcat环境

### 创建javaWeb工程

#### 新建Project

![img](https://img-blog.csdn.net/20180524211059269?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

#### Project命名

![img](https://img-blog.csdn.net/20180524211210681?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

#### Project结构 

![img](https://img-blog.csdn.net/20180524211359949?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### Web工程设置

#### 创建 classes 和 lib 两个目录

classes目录用于存放编译后的class文件，lib用于存放依赖的jar包

![img](https://img-blog.csdn.net/20180524211853569?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

#### Project Structure

File --> Project Structure...，进入 Project Structure窗口，点击 Modules --> 选中项目“JavaWeb” --> 切换到 Paths 选项卡 --> 勾选 “Use module compile output path”，将 “Output path” 和 “Test output path” 都改为之前创建的classes目录

即将后面编译的class文件默认生成到classes目录下

![img](https://img-blog.csdn.net/20180524223807174?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**点击 Modules --> 选中项目“JavaWeb” --> 切换到 Dependencies 选项卡 --> 点击右边的“+”，选择 “JARs or directories...”，选择创建的lib目录**

![img](https://img-blog.csdn.net/20180524220601161?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**选择Jar Directory**

**<img src="https://img-blog.csdn.net/20180524223952971?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="img" style="zoom:67%;" />
**

**![img](https://img-blog.csdn.net/20180524224223547?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
**

 **配置打包方式Artifacts：点击 Artifacts选项卡，IDEA会为该项目自动创建一个名为“JavaWeb:war exploded”的打包方式，表示 打包成war包，并且是文件展开性的，输出路径为当前项目下的 out 文件夹，保持默认即可。另外勾选下“Build on make”，表示编译的时候就打包部署，勾选“Show content of elements”，表示显示详细的内容列表。
**

**![img](https://img-blog.csdn.net/20180524225022500?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
**

**Tomcat配置**

Run -> Edit Configurations，进入“Run Configurations”窗口，点击"+"-> Tomcat Server -> Local，创建一个新的Tomcat容器

<img src="https://img-blog.csdn.net/20180524225413559?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="img" style="zoom:50%;" />

在"Name"处输入新的服务名，点击“Application server”后面的“Configure...”，弹出Tomcat Server窗口，选择本地安装的Tomcat目录 -> OK

在“Run Configurations”窗口的“Server”选项板中，去掉勾选“After launch”，设置“HTTP port”和“JMX port”，点击 Apply -> OK，至此Tomcat配置完成。

![img](https://img-blog.csdn.net/2018052422550286?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

Run -> Edit Configurations，进入“Run Configurations”窗口，选择之前配置好的Tomcat，点击“Deployment”选项卡，点击“+” -> “Artifact”-> 选择创建的web项目的Artifact...

修改“Application context”-> Apply -> OK

![img](https://img-blog.csdn.net/20180524230635996?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


在index.jsp文件中的body之间添加要显示的内容，然后点击“运行”的绿色三角


![img](https://img-blog.csdn.net/20180524225743552?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

浏览器输入http://localhost:8087/javaweb/

![img](https://img-blog.csdn.net/20180524230724626?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

javaweb工程搭建完成，以下为Servlet编程学习

二、Servlet简单实现


1. 编写servlet源文件

   在src目录下新建HelloWorld.java，并编写一下代码并进行编译

```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
/**
 * Created by on 18/5/24.
 */
public class HelloWorld extends HttpServlet{
    private String message;
    @Override
    public void init() throws ServletException {
        message = "Hello world, this message is from servlet!";
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置响应内容类型
        resp.setContentType("text/html");
        //设置逻辑实现
        PrintWriter out = resp.getWriter();
        out.println("<h1>" + message + "</h1>");
    }
    @Override
    public void destroy() {
        super.destroy();
    }
}
```

编译后在classes目录下生成了HelloWorld.class文件

<img src="https://img-blog.csdn.net/20180524234427724?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="img" style="zoom:50%;" />


2. 部署servlet

   - 方法一：

     在WEB-INF目录下web.xml文件的<web-app>标签中添加如下内容：

     ```html
     <servlet>  
         <servlet-name>HelloWorld</servlet-name>  
         <servlet-class>HelloWorld</servlet-class>  
     </servlet>  
     <servlet-mapping>  
         <servlet-name>HelloWorld</servlet-name>  
         <url-pattern>/HelloWorld</url-pattern>  
     </servlet-mapping>  
     ```

   - 方法二：
     在HelloWorld文件的类前面加上：@WebServlet("/HelloWorld")

3. 运行servlet


   点击运行按钮

   控制台出现successfully则tomcat服务启动成功！打开浏览器输入：http://localhost:8087/javaweb/HelloWorld即可查看servlet运行状态了.

   ![img](https://img-blog.csdn.net/20180524235316236?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21lbmd0YW8wNjA5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
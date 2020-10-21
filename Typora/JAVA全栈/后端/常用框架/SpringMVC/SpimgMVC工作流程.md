#         SpimgMVC工作流程

第1步：浏览器发送指定的请求都会交给DispatcherServlet,他会委托其他模块进行真正的业务和数据处理
第2步：DispatcherServlet会查找到HandleMapping,根据浏览器的请求找到对应的Controller，并将请求交给目标Controller
第3步：目标Controller处理完业务后，返回一个ModelAndView给DispatcherServlet
第4步：DispatcherServlet通过ViewResolver视图解析器找到对应的视图对象View
第5步：视图对象View负责渲染，并返回到浏览器

# 案例分析

下面通过案例图解的方式理解下上面的工作原理

## 第1步-浏览器请求

![这里写图片描述](https://img-blog.csdn.net/20180705165420927?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTA0NTIzODg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

------

## 第2、3步-找到对应Controller

![这里写图片描述](https://img-blog.csdn.net/20180705170904918?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTA0NTIzODg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

------

## 第4、5步-解析视图对象，返回浏览器

![这里写图片描述](https://img-blog.csdn.net/20180705172405861?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTA0NTIzODg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

------

## 浏览器结果

![这里写图片描述](https://img-blog.csdn.net/20180705172648713?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTA0NTIzODg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


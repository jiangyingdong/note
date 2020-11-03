
## 前言

使用前请在网页<head></head>中写入以下代码，请将jui放在网站根目录下，不是tomcat根目录

```html
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jui/css/jui.css" />
<script src="${pageContext.request.contextPath}/jui/jquery-3.5.1.min.js"></script>
<script src="${pageContext.request.contextPath}/jui/jui.js"></script>
```

## 页面布局

![image-20201016192410773](image-20201016192410773.png)

```html
<div class="jui-body-top">
    <div class="jui-test-div">				
        这里是TOP
    </div>
</div>
<div class="jui-body-middle">
    <div class="jui-body-middle-left">
        <div class="jui-test-div">
            这里是MIDDLE-LEFT<br>
            大小随内容变化
        </div>
    </div>	
    <div class="jui-body-middle-middle">
        <div class="jui-test-div">
            这里是MIDDLE-MIDDLE<br>
            大小随内容变化
        </div>
    </div>	
    <div class="jui-body-middle-right">
        <div class="jui-test-div">
            这里是MIDDLE-RIGHT<br>
            大小随内容变化
        </div>
    </div>	
</div>			
<div class="jui-body-bottom">
    <div class="jui-test-div">
        这里是BOTTOM
    </div>
</div>
```

## 对齐方式

![image-20201022104050239](image-20201022104050239.png)

```html
<div class="jui-inside-horizontal">
    <div class="jui-outside-left">
        <div class="jui-test-div">左对齐</div>
    </div>
    <div class="jui-outside-center">
        <div class="jui-test-div">居中</div>             
    </div>
    <div class="jui-outside-right">
        <div class="jui-test-div">右对齐</div>    
    </div>
</div>
```

## 导航

### 顶部导航

![image-20201022104651685](image-20201022104651685.png)

```html
<div class="jui-inside-horizontal">
    <div class="jui-outside-center">
        <ul class="jui-ul-navbar" style="width: 1400px;">
            <div class="jui-outside-left jui-inside-horizontal">
                <li><a href="login.jsp">首页</a></li>
            </div>
            <div class="jui-outside-right jui-inside-horizontal">
                <li><a href="login.jsp">登录</a></li>
                <li><a href="login.jsp">注册</a></li>
            </div>
        </ul>
    </div>
</div>
```
## input

### 搜索

![image-20201021204116990](image-20201021204116990.png)

```html
<!--jui.search(this,跳转的参数名,跳转的路由,event)；回车跳转-->
<input class="jui-input-search" type="text" placeholder="搜索..." onkeydown="jui.search(this,'search','index.html',event)"/>
```

> ![image-20201031192213133](image-20201031192213133.png)
>
> 独立样式，需要jQuery支持

```html
<div id="search-1" style="display: flex;flex-wrap: nowrap;">
    <script>$(function () {$('#search-1').children('div').hover(function () {this.style.color='#ff1e1e'},function () {this.style.color='#0a0a0a'})})</script>
    <input type="text" placeholder="在线搜索" style="padding: 0px 10px 0px 10px;line-height: 40px;width:300px;outline:none;border: 1px solid #dddddd;border-right-width: 0px;background-color: #fff3f3;"/>
    <div style="border: 1px solid #dddddd;border-left-width: 0px;width: 50px;display: inline-flex;background-color: #ffc9c9;">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin: auto;">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
    </div>
</div>
```



### 一般输入框

> jui-input-1 css类，效果只有聚焦时变黑
>
> ![image-20201027161240434](image-20201027161240434.png)![image-20201027161407626](image-20201027161407626.png)

```html
<input class="jui-input-w100" type="text" name="" id="" value="" placeholder="账号"/>
```

### 日期选择

![image-20201022101332203](image-20201022101332203.png)

```html
<!--jui.dateSelect(id),设置默认日期为今天-->
<input class="jui-input-search" type="date" name="" id="dateSlect"/><script>jui.dateSelect('dateSlect')</script>
```
## 按钮

![image-20201020152844193](image-20201020152844193.png)

```html
<button type="button" class="jui-btn btn-dark">黑色</button>
<button type="button" class="jui-btn btn-danger">红色</button>
<button type="button" class="jui-btn btn-secondary">灰色</button>
```
## 文件上传

![image-20201020161056594](image-20201020161056594.png)

```html
<form action="updateFile" method="post" enctype="multipart/form-data">
    <button type="button" class="jui-btn btn-dark" onclick="jui.fileSelect('file',this)">选择文件</button>
    <input type="file" style="display: none;" name="file" id="file"/>
    <button type="submit" class="jui-btn btn-dark">上传文件</button>
</form>
```
## 表格

## 弹窗

### 提示弹窗

![image-20201027101545586](image-20201027101545586.png)

```html
<!--调用 jui.createPopup('这是你要显示的内容') 即可弹窗，2秒后隐藏-->
<button class="jui-btn btn-dark" type="button" onclick="jui.createPopup('这是你要显示的内容')">弹窗</button>
```

### 功能弹窗

> 效果：全屏幕布，只可操作弹窗
>
> jui-popup-1 css类，使div铺满全屏，半透明，z-index: 20;子元素背景为白色，居中
>
> jui.createPopup_1_hide(this)  js函数，隐藏
>
> jui.createPopup_1_show(this) js函数，显示
>
> div必须在调用jui.createPopup_1_show(this)函数的元素的下一个元素

```html
<a href="#" onclick="jui.createPopup_1_show(this)">注册</a>
<div class="jui-popup-1">
    <div class="jui-bg-opacity-00">
        <div class="jui-opacity-00 jui-inside-horizontal jui-row"  onclick="jui.createPopup_1_hide()">
            <svg class="jui-radius-50 jui-bg-opacity-10 jui-opacity-07" width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        <div class="jui-inline-block">
            自己页面
        </div>
    </div>
</div>
```

## 分页

![image-20201020204849568](image-20201020204849568.png)

```html
<div class="jui-row">
    <div class="jui-outside-center" id="paging">
        <!-- jui.paging()有四个参数，第一个时div的id，第二个是当前页面，第三个是总页面，第四个是要跳转的路由，跳转带有currentPage属性是目标页码 -->
        <script>jui.paging('paging',5,10,'#')</script>
    </div>
</div>
```
## 表单

### 表单验证

### 登录表单-v1

> 带有验证功能，错误提示是弹窗，显示1秒
>
> ![image-20201026144639878](image-20201026144639878.png)

```html
<form class="jui-form-v1" action="" method="post" onsubmit="return jui.check.onsubmit(this)">
    <div class="">
        <label>用户名</label>
        <input type="text" class="" name="username" onchange="jui.check.username(this)">
    </div>
    <div class="">
        <label>密码</label>
        <input type="password" class="" name="password" onchange="jui.check.password(this)">
    </div>
    <div class="">
        <div class="jui-outside-center">
            <button class="jui-btn btn-dark" type="submit" onclick="">登录</button>
            <a href="#"><button class="jui-btn btn-dark" type="reset">注册</button></a>
        </div>
    </div>
</form>
```

## 动画

### 动画-1

![动画](%E5%8A%A8%E7%94%BB.gif)

```html
<!--放在body中即可-->
<div class="jui-div-animation-1-100px">
    <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg" >
</div>
```


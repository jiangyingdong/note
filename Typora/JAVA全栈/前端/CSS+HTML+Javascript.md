做好一个漂亮的网页一般需要三部分：

- HTML语句
- CSS语句
- script语句

## HTML

### 文件结构

- 文件扩展名是html
- 所有内容包含在<html></html>标签中，**html**标签内部又有<head></head>标签和<body></body>标签
- 我们常把CSS代码放在**head**标签中，把script代码放在**body**标签的上面

- 这是一个完整的模板：

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="utf-8">
  		<title>这是网页标题</title>
  		<meta name="renderer" content="webkit">
  		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  		
  		<!-- 这是引入外部CSS样式 -->
          <link rel="stylesheet" href="" media="all">
  		<!-- 内部CSS样式 -->
  		<style type="text/css">
  			* img{
  				width: 100%;
  			}
  		</style>		
  	</head>
  		<!-- 这是引入外部script代码 -->
  		<script src="" charset="utf-8"></script>
  		<!-- 这里是内部script代码 -->
  		<script type="text/javascript">
  			// 代码块
  		</script>
  	<body>
  		<!-- body标签里面是网页显示的内容 -->
  		<div class="">
  			你好！HTML
  		</div>	
  		
  	</body>
  </html>
  ```

## CSS

### CSS+DIV为主做网页

#### 1. 书写规范

- 利用通配选择器来去除所有元素的 外边距、内边距

  ```css
  *{
  	margin:0px;
  	padding:0px;
  }
  ```

- 一般的网页都分为 顶部、底部、主体 三部分，这三部分都需要分别用一个div标签容纳

- div的样式使用css的类选择器为主来制作

## Javascript

### 在JS中引用El表达式中的值

- 先在js中声明一个全局变量

  ```js
  var msg = “${message}”;
  ```

  一定一定要加""，然后就可以在js中使用了。


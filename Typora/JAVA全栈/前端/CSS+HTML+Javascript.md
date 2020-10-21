做好一个漂亮的网页一般需要三部分：

- HTML语句
- CSS语句
- script语句

## HTML

### 文件结构

- 文件扩展名是html
- 所有内容包含在<html></html>标签中，**html**标签内部又有<head></head>标签和<body></body>标签
- 我们常把CSS代码放在**head**标签中，把script代码放在**body**标签的底部

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
  	
  	<body>
  		<!-- body标签里面是网页显示的内容 -->
  		<div class="">
  			你好！HTML
  		</div>
  		
  		<!-- 这是引入外部script代码 -->
  		<script src="" charset="utf-8"></script>
  		<!-- 这里是内部script代码 -->
  		<script type="text/javascript">
  			// 代码块
  		</script>
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

#### 2. 实现div下元素水平对齐

- 因为div是块级元素，会自动换行

- 使用

  ```
  display: flex;
  flex-wrap: wrap;
  ```

  属性来设定子元素水平对齐

- 若还想做水平分左右对齐的话，可以在中间放一个干干净净的div，右边div的则设置右外边距为0px，做外边距auto

#### 3. 图片上显示文字

- [利用定位 **Positioning** 属性](https://www.w3school.com.cn/css/css_positioning.asp)

- CSS 定位属性

  | 属性                                                         | 描述                                                         |
  | :----------------------------------------------------------- | :----------------------------------------------------------- |
  | [position](https://www.w3school.com.cn/cssref/pr_class_position.asp) | 把元素放置到一个静态的、相对的、绝对的、或固定的位置中。     |
  | [top](https://www.w3school.com.cn/cssref/pr_pos_top.asp)     | 定义了一个定位元素的上外边距边界与其包含块上边界之间的偏移。 |
  | [right](https://www.w3school.com.cn/cssref/pr_pos_right.asp) | 定义了定位元素右外边距边界与其包含块右边界之间的偏移。       |
  | [bottom](https://www.w3school.com.cn/cssref/pr_pos_bottom.asp) | 定义了定位元素下外边距边界与其包含块下边界之间的偏移。       |
  | [left](https://www.w3school.com.cn/cssref/pr_pos_left.asp)   | 定义了定位元素左外边距边界与其包含块左边界之间的偏移。       |
  | [overflow](https://www.w3school.com.cn/cssref/pr_pos_overflow.asp) | 设置当元素的内容溢出其区域时发生的事情。                     |
  | [clip](https://www.w3school.com.cn/cssref/pr_pos_clip.asp)   | 设置元素的形状。元素被剪入这个形状之中，然后显示出来。       |
  | [vertical-align](https://www.w3school.com.cn/cssref/pr_pos_vertical-align.asp) | 设置元素的垂直对齐方式。                                     |
  | [z-index](https://www.w3school.com.cn/cssref/pr_pos_z-index.asp) | 设置元素的堆叠顺序。                                         |

- 相对定位

  - 设置该元素定位类型为相对定位，它是相对于该元素正常位置的定位

  - 设置该元素的偏移量，实质是与原来位置的距离

  - ```css
    position:relative;
    left:20px
    ```

    

## Javascript

### 在JS中引用El表达式中的值

- 先在js中声明一个全局变量

  ```js
  var msg = “${message}”;
  ```

  一定一定要加""，然后就可以在js中使用了。


# 一. 基础知识

## 1）分组查询

https://www.cnblogs.com/friday69/p/9389720.html

## 2）子查询

https://www.cnblogs.com/fzxey/p/10896244.html

### 1. from子查询

> FROM子查询就是将一个查询结构（一般多行多列）作为主查询的数据源

```
select *
from (select * from table_1)别名
where 别名.列名>0
```



## 3）连接

### 1. 左外连接

```sql
select * from table_1 left join (table_2,...) on (条件1,...)
```



## 4）游标

```sql
DECLARE @username varchar(20),@UserId varchar(100)
DECLARE cursor_name CURSOR FOR --定义游标
    SELECT TOP 10 UserId,UserName FROM UserInfo
    ORDER BY UserId DESC
OPEN cursor_name --打开游标
FETCH NEXT FROM cursor_name INTO  @UserId,@username  --抓取下一行游标数据
WHILE @@FETCH_STATUS = 0
    BEGIN
        PRINT '用户ID：'+@UserId+'            '+'用户名：'+@username
        FETCH NEXT FROM cursor_name INTO @UserId,@username
    END
CLOSE cursor_name --关闭游标
DEALLOCATE cursor_name --释放游标
```

## 5）MySql高级语言部分

### 1. 声明变量

> [     MySQL中变量的定义和变量的赋值使用（转）        ](https://www.cnblogs.com/EasonJim/p/7966918.html)
>
> **MySQL里面的变量是不严格限制数据类型的，它的数据类型根据你赋给它的值而随时变化** 。（SQL SERVER中使用declare语句声明变量，且严格限制数据类型。） 

### 2. 流程控制语句

> if 条件 then 执行操作
>
> [elseif 条件 then 执行操作]
>
> [else 执行操作]
>
> end if

### 3. 循环语句

> while 条件 do 循环体 end while

## 6）Sql Server高级语言部分

**I.学习sql之前回忆一下，什么是变量？**

- 变量：能存储数据的值。
- 变量是一块内存空间的表示。
- 数组一连串空间
- 变量是存储数据的容器（通俗讲）

**II.变量分为局部变量和全局变量**

　  局部变量的使用是先申明再赋值。

　  全局变量由系统定义和维护，可以直接使用，但一般不自定义全局变量。

　　　　**1：局部变量：**

　　　　　  局部变量的名称必须以标记@作为前缀

​        声明局部变量的语句如下：

​        declare @variable name(局部变量名称) DataType(数据类型)

局部变量赋值有两种方法：Set语句或Select语句

**如图所示：**

![img](https://images2015.cnblogs.com/blog/903753/201603/903753-20160305191136971-157135944.png)

 

 

**2：全局变量**

SqlServer中的所有全局变量都使用两个@符号作为前缀

**常用的几个全局变量：（@@error重点）**

| @@error       | 上一条SQL错误号           |
| ------------- | ------------------------- |
| @@identity    | 最后一次插入的标识值      |
| @@rowcount    | 受上一个SQL语句影响的行数 |
| @@serviceName | 该计算机上的SQL服务名称   |
| @@Version     | SQLServer的版本信息       |

>  

 

　　

　

**注**：程序员不能自己定义全局变量，不能给全局变量赋值

Ⅲ：select语句和set语句区别

|                    | Set              | Select                     |
| ------------------ | ---------------- | -------------------------- |
| 同时对多个变量赋值 | 不支持           | 支持                       |
| 表达式返回多个值时 | 出错             | 将返回的最后一个值赋给变量 |
| 表达式未返回值时   | 变量将赋值为NULL | 变量保持原值               |

 

 

 

 

**注**：被赋值的变量的数据来源于数据表的时候，不要用set，选用select

　　如下图所示：

```
Declare` `@stuName nvarchar(32)``Select` `@stuName=studentname ``from` `student``Where` `studentno=23
```

　　

**Ⅳ：数据类型转换**

　　**cast()与convert()函数**

　　**基本语法：**

　　cast(表达式 as  数据类型)

　　convert(数据类型[(长度)],表达式[,样式])

　　二者在本质上无任何区别

　　**唯一不同之处是**：在将日期时间类型的数据转换为字符串数据时，convert()函数可以通过第三个参数指定转换后字符数据的显示格式不同。

**Ⅴ：逻辑控制语句**

　　**1：顺序结构控制语句**

　　　　begin 

   　　语句或语句块

　　　　end

　　**2：If-else条件语句（重点）**

　　例如：

　　　　统计并显示2013-08-09 的oop考试平均分

　　　 　如果平均分在70以上，显示“考试成绩优秀”，并显示前三名学生的考试信息

​      如果在70分以下，显示“考试成绩较差”，并显示后三名学生的考试信息

 　　　![img](https://images2015.cnblogs.com/blog/903753/201603/903753-20160305191844955-1810803250.png)

 

　　**3：while循环语句**

　　　　示例：

　　　　　检查学生“oop”课最近一次考试是否有不及格（60分及格）的学生。

　　　　　如有，每人加2分，高于95分的学生不再加分，直至所有学生这次考试成绩均及格

 　　　　　![img](https://images2015.cnblogs.com/blog/903753/201603/903753-20160305192050080-193282457.png)

 　　　　　![img](https://images2015.cnblogs.com/blog/903753/201603/903753-20160305192107362-145809811.png)

注：在SQL 中，只有while一种循环，没有do-while和for循环

 

　　**4：case多分支语句**

　　case-end语句计算一组条件表达式，并返回其中一个符合条件的结果

　　**基本语法：**

　　case

  　　when  条件1  then  结果1

  　 when  条件2  then  结果2

  　 [ else 其他结果]

　　end

　　示例：

　　ABCDE五级打分制显示学生oop课最近一次考试成绩（姓名和等级）

　　A级:  90分以上,B级：80－分,C级:  70－分,D级：60－分,E级：60分以下

 　![img](https://images2015.cnblogs.com/blog/903753/201603/903753-20160305192210815-1665447902.png)

 

**批处理**

**GO指令**：GO关键字标志着批处理的结束，它是一条或多条SQL语句的集合 

　 **作用**： 能简化数据库的管理；

　　　　  批处理可以提高语句执行的效率；

　 **提示**： GO是SQL Server特有的批处理命令，只有SQL Server的查询编辑器才能识别并处理，编辑其他应用程序时不能使用该命令。　

# 二. 实际应用

## 1. 将查询到的结果插入一个表中

```
insert into table_name1(列名1,列名2...) select 列名1,列名2... from table_name2 where 条件
```

## 2. 从其他表中恢复缺失的信息表

```sql
truncate member;
insert into member(card_id,creadits)
select user.card_id, ifnull(expense_money-return_money,0) as creadits 
    from 
        (
            select user.card_id, user.name, ifnull(return_money,0) as return_money
                from user
                left join (select card_id,sum(return_money) as return_money from back group by card_id)back
                on user.card_id=back.card_id
                where ismember=1
        )user 
    left join (select name,sum(expense_money) as expense_money from sales group by name)sales
    on user.name=sales.name
```

## 3. 绿盟大赛第一阶段相关笔记

-   clock_timestamp()
    描述：实时时钟的当前时间戳。
    返回值类型：timestamp with time zone
    示例：
    
    ```
    postgres=# SELECT clock_timestamp();
            clock_timestamp        
    -------------------------------
     2017-09-01 16:57:36.636205+08
    (1 row)
    ```

-   date\_part\(text, timestamp\)
    描述：
    获取小时的值。
    等效于extract\(field from timestamp\)。
    返回值类型：double precision
    示例：
    
    ```
    postgres=# SELECT date_part('hour', timestamp '2001-02-16 20:38:40');
     date_part 
    -----------
            20
    (1 row)
    ```

-   date\_trunc\(text, timestamp\)

    描述：截取到参数text指定的精度。

    返回值类型：timestamp

    示例：

    ```
    postgres=# SELECT date_trunc('hour', timestamp  '2001-02-16 20:38:40');
         date_trunc      
    ---------------------
     2001-02-16 20:00:00
    (1 row)
    ```

-   numtodsinterval\(num, interval\_unit\)

    描述：将数字转换为interval类型。num为numeric类型数字，interval\_unit为固定格式字符串（'DAY' | 'HOUR' | 'MINUTE' | 'SECOND'）。

    可以通过设置参数[IntervalStyle](区域和格式化.html#zh-cn_topic_0237124733_zh-cn_topic_0059778109_s89302a8dcd7f46ecb7167574d6397dc0)为a，兼容该函数interval输出格式。

    示例：

    ```
    postgres=# SELECT numtodsinterval(100, 'HOUR');
     numtodsinterval 
    -----------------
     100:00:00
    (1 row)
    
    postgres=# SET intervalstyle = a;
    SET
    postgres=# SELECT numtodsinterval(100, 'HOUR');
            numtodsinterval
    -------------------------------
     +000000004 04:00:00.000000000
    (1 row)
    ```


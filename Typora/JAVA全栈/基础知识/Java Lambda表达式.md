# Filter过滤

```java
//返回一个新的集合，返回的类型与Collectors.to...的函数有关
//"未知"处根据集合类型来确定，例如Map就是(key,val);若是List就是 val ;
集合.stream().filter(未知 -> 条件).collect(Collectors.toList());
```

# forEach 结合 lambda表达式来循环集合

```java
//"未知"处根据集合类型来确定，例如Map就是(key,val);若是List就是 val ;
集合对象名.forEach( 未知->{执行的操作} );
```


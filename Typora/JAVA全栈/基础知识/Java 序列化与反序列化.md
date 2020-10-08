## 1. 含义

- **序列化：将对象写入到IO流中**
- **反序列化：从IO流中恢复对象**
- **意义：序列化机制允许将实现序列化的Java对象转换位字节序列，这些字节序列可以保存在磁盘上，或通过网络传输，以达到以后恢复成原来的对象。序列化机制使得对象可以脱离程序的运行而独立存在。**
- **使用场景：所有可在网络上传输的对象都必须是可序列化的，**比如RMI（remote method invoke,即远程方法调用），传入的参数或返回的对象都是可序列化的，否则会出错；**所有需要保存到磁盘的java对象都必须是可序列化的。通常建议：程序创建的每个JavaBean类都实现Serializeable接口。**

## 2. 序列化实现的方法

> 如果需要将某个对象保存到磁盘上或者通过网络传输，那么这个类应该实现**Serializable**接口或者**Externalizable**接口之一。
>
> 并且该类涉及到的类都应该是可序列化的，否则会报错。

> 创建 ObjectOutputStream 输出流，可以调用该类对象的 writeObject(object o) 方法来序列化对象.
>
> ```java
> public class Test {
>     public static void main(String[] args) {
>         String filePath = "src/demo.ser";//序列化文件的路径
>         try{
>             FileOutputStream fileOutputStream = new FileOutputStream(filePath);//若文件夹不存在则会报错,.ser文件不存在不要紧
>             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
>             objectOutputStream.writeObject(0);//.ser文件不存在则创建
>             //不 .close() 也不会报错,在close之前连续write会向文件中连续追加内容,反序列化时要需要多次调用反序列化函数
>             //相同对象多次write也会写入多个对象
>             fileOutputStream.close();
>             objectOutputStream.close();
>         }catch (Exception e){
>             System.out.println("序列化失败!");
>         }
>     }
> }
> ```

## 3. 反序列化

> 创建 ObjectInputStream 输入流，可以调用该类对象的 readObject(object o) 方法来反序列化对象.

```java
public class Test {
    public static void main(String[] args) {
        String filePath = "./src/demo.ser";//反序列化文件的路径
        try{
            FileInputStream fileInputStream = new FileInputStream(filePath);
            ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
            //若.ser文件不存在则会报错;多次调用时,读取对象的顺序与序列化时一致
            //若write了3个对象,你read超过3个就会报错
            int i = (int)objectInputStream.readObject();
            fileInputStream.close();
            objectInputStream.close();
        }catch (Exception e){
            System.out.println("数据库反序列化失败!");
        }
    }
}
```


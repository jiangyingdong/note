# 单机模式
## 环境准备
> [安装JDK](https://www.cnblogs.com/sxdcgaq8080/p/7492426.html)

## 安装zookeeper
**1. 下载压缩包**
>选定或新建一个文件目录作为安装的位置，这里选择  **~/soft/** 
>然后执行下面的命令下载压缩包

>`wget https://mirrors.cnnic.cn/apache/zookeeper/zookeeper-3.6.1/apache-zookeeper-3.6.1-bin.tar.gz`

> 		或者先进入[https://mirrors.cnnic.cn/apache/zookeeper/](https://mirrors.cnnic.cn/apache/zookeeper/)选择版本，复制连接，再使用wget下载，记得选择带有 ‘-bin’ 的压缩包

**2.	解压**
> `[root@node1 soft]# tar -zxvf apache-zookeeper-3.6.1-bin.tar.gz`

> 如果解压时权限不够，则提升权限为root
> `[root@node1 soft]# su root`

**3.	设置配置文件**

拷贝zookeeper配制文件 **~/soft/apache-zookeeper-3.6.1-bin/conf/zoo_sample.cfg** 并重命名 **zoo.cfg**
> `[root@node1 conf]# cp zoo_sample.cfg zoo.cfg`   

修改 **zoo.cfg**，配置文件内容如下所示
```xml
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/opt/soft/zooData
clientPort=2181
server.1=192.168.83.130:2888:3888
```
如果没有目录 **/opt/soft/zooData**，则需自己创建，其中**192.168.83.130** 是本节点的IP

```xml
[root@node1 ~]# cd /opt
[root@node1 opt]# mkdir soft
[root@node1 opt]# cd soft
[root@node1 soft]# mkdir zooData
```

启动 **zookeeper** 的端口 **2181，2888，3888**

```xml
[root@node1 ~]# firewall-cmd --zone=public --add-port=2181/tcp --permanent
[root@node1 ~]# firewall-cmd --zone=public --add-port=2888/tcp --permanent
[root@node1 ~]# firewall-cmd --zone=public --add-port=3888/tcp --permanent
[root@node1 ~]# firewall-cmd --reload
```
查看 已开启的端口
```xml
[root@node1 ~]# firewall-cmd --list-ports
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020080816315067.png)

**4. 配置 zookeeper 环境变量**
```xml
#zookeeper environment
export ZOOKEEPER_HOME=~/soft/apache-zookeeper-3.6.1-bin
export PATH=$PATH:$ZOOKEEPER_HOME/bin
```
在 /etc/profile 文件末尾加上以上代码
		

```xml
[root@node1 ~]# vim /etc/profile
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200808164059950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0Mjc4NTE3,size_16,color_FFFFFF,t_70)

然后是环境变量立即生效
		

```xml
[root@node1 ~]# source /etc/profile
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200808164356419.png)
**5. 启动 zookeeper·**

```xml
[root@node1 ~]# zkServer.sh start
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200808164741416.png)
**6. 查看状态**

```xml
[root@node1 ~]# zkServer.sh status
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200808164906986.png)

> standalone 是单机模式，至此zookeeper安装成功. 集群模式需要在zoo.cfg中设置多个server
> 并且，在每个节点的 zooData 目录下要新建一个 myid文件 内容是 zoo.cfg 中 server. 后面的数字
# 集群模式
>此模式以上面单机模式为基础

**1. 在多个节点都要安装 zookeeper**
>这里选择俩个节点 **node1  node2**
>对应的IP分别是 **192.168.83.130  192.168.83.129**

**2. 实现节点之间SSH免密码登录**

> 在登录节点（设为node1，被登录节点设为node2）上生成密钥, 然后将公钥发送给被登录节点,然后测试连接, 同样的操作在被登录节点也要做一次,才能实现互相免密登录

```xml
ssh-keygen -t dsa //-t dsa 是密钥类型，还有个默认的rsa
ssh-copy-id -i ~/.ssh/id_dsa.pub root@node2	//将公钥发送给被登录节点，需要输入被登录节点的登陆密码
ssh node2 //测试连接
```

**3. 修改 zoo.cfg 配置文件**
>配置文件修改为如下, 每个节点都是如此,这里只有俩个节点, 所以 **server.** 只有2个
```xml
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/opt/soft/zooData
clientPort=2181
server.10=192.168.83.130:2888:3888
server.2=192.168.83.129:2888:3888
```
**4. 新建myid文件**
>在各节点的 **zooData** 文件目录下新建 **myid** 文件, 内容是 **zoo.cfg**文件中对应的 **server.** 后面的数字，数字越大的那个就是leader，其他都是follower

**5. 启动或者重启 zookeeper**

>使用 **zkServer.sh start** 或者 **zkServer.sh restart**
>
>停止zookeeper 使用 **zkServer.sh stop**

**6. 查看状态，最好等一会再查看，不然很可能报错**

>Mode: leader 或者 follower
>集群配置成功
>![在这里插入图片描述](https://img-blog.csdnimg.cn/20200815155045148.png#pic_center)


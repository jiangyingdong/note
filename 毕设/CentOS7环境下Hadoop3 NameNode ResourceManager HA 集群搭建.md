# CentOS7环境下Hadoop3 NameNode ResourceManager HA 集群搭建

![img](https://csdnimg.cn/release/phoenix/template/new_img/original.png)

[青羿之羽](https://me.csdn.net/shshheyi) 2018-12-08 20:25:24 ![img](https://csdnimg.cn/release/phoenix/template/new_img/articleReadEyes.png) 369 ![img](https://csdnimg.cn/release/phoenix/template/new_img/tobarCollect.png) 收藏

分类专栏： [大数据](https://blog.csdn.net/shshheyi/category_8512504.html)

版权

# 1、集群规划

| IP              | HostName | 用途      | 安装软件         |
| --------------- | -------- | --------- | ---------------- |
| 192.168.100.131 | lzjnn1   | NameNode1 | hadoop           |
| 192.168.100.132 | lzjnn2   | NameNode2 | hadoop           |
| 192.168.100.141 | lzjdn1   | DateNode1 | hadoop,zookeeper |
| 192.168.100.142 | lzjdn2   | DateNode2 | hadoop,zookeeper |
| 192.168.100.143 | lzjdn3   | DateNode3 | hadoop,zookeeper |

# 2、CentOS7环境准备

## 2.1、CentOS操纵系统安装

这就不写了，操作系统安装一般都会。规划的5台服务器都装好操作系统

## 2.2、主机名、网络设置

按照集群规划配置好相应的IP地址和主机名。
修改/etc/hosts文件，增加如下内容：

```shell
192.168.100.131 lzjnn1
192.168.100.132 lzjnn2
192.168.100.141 lzjdn1
192.168.100.142 lzjdn2
192.168.100.143 lzjdn3
```

## 2.3、建立hadoop用户

所有服务器上新建用户

```shell
#新建hadoop用户
useradd hadoop

#设置hadoop用户的密码 
passwd hadoop xxxx
```

## 2.4、各服务器间的ssh无密码访问

```shell
#每台服务器上使用hadoop用户登录执行以下命令生成公私钥文件
ssh-keygen -t rsa

#统一在一台f服务器上整合authorized_keys文件，这里选lzjnn1
#lzjnn1上执行

cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

#在lzjnn1以外的f服务器上执行，按需输入对应用户的密码
ssh-copy-id -i ~/.ssh/id_rsa.pub hadoop@lzjnn1

#在lzjnn1上执行以下命令将authorized_keys文件复制到其他所有服务器上
scp ~/.ssh/authorized_keys lzjnn2:~/.ssh/
scp ~/.ssh/authorized_keys lzjdn1:~/.ssh/
scp ~/.ssh/authorized_keys lzjdn2:~/.ssh/
scp ~/.ssh/authorized_keys lzjdn3:~/.ssh/

#每台服务器上分别对其他服务器执行ssh命令测试免密登录
ssh 主机名
```

# 3、JDK安装配置

每台服务器上都需要安装配置jdk

## 3.1、下载

进入Oracle官网下载jdk，这里使用的是jdk8u192
[下载页面链接](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
选择jdk-8u192-linux-x64.tar.gz下载

## 3.2、安装

```shell
#在/usr/local目录下新建java目录
mkdir /usr/local/java

#复制下载的jdk文件到此目录下
cp /download/path/jdk-8u192-linux-x64.tar.gz /usr/local/java

#cd到对应目录下解压文件
tar zxvf jdk-8u192-linux-x64.tar.gz
```

## 3.3、配置

在/etc/profile.d目录下新建 hadoop.sh文件，新增如下内容：

```shell
# for java
export JAVA_HOME=/usr/local/java/jdk1.8.0_192
export JRE_HOME=/usr/local/java/jdk1.8.0_192/jre  
export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH  
export PATH=$JAVA_HOME/bin:$PATH
```

# 4、zookeeper安装配置

在规划需要安装zookeeper的服务器上安装zookeeper

## 4.1、下载

进入zookeeper官网下载，这里使用的是zookeeper-3.4.13
[下载页面链接](http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.13/)
选择zookeeper-3.4.13.tar.gz下载

## 4.2、安装

```shell
#在/usr/local目录下新建zookeeper目录
mkdir /usr/local/zookeeper

#复制下载的文件到此目录下
cp /download/path/zookeeper-3.4.13.tar.gz /usr/local/zookeeper

#cd到对应目录下解压文件
tar zxvf zookeeper-3.4.13.tar.gz
```

## 4.3、配置

1、在/etc/profile.d目录下刚才新建的hadoop.sh文件中，新增如下内容：

```shell
#for zookeeper
export ZOOKEEPER_HOME=/usr/local/zookeeper/zookeeper-3.4.13
```

2、修改 $ZOOKEEPER_HOME/conf/zoo.cfg文件，对应配置改为如下：

```shell
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/app/zookeeper/data
clientPort=2181
server.1=lzjdn1:2888:3888
server.2=lzjdn2:2888:3888
server.3=lzjdn3:2888:3888
```

3、在dataDir所指定的目录下创建myid文件
每台服务器取zoo.cfg文件中对应 server.A=B:C:D中的A的值

```shell
echo A的值 > /app/zookeeper/data/myid
```

## 4.4、修改zookeeper的日志配置

***修改zookeeper的日志配置，分日期存放日志在指定目录下，是为了便于查看管理日志，不需要修改的可以略过本节***
1、修改$ZOOKEEPER_HOME/conf/log4j.properties文件，找到对应zookeeper.root.logger的配置改为如下:

```shell
zookeeper.root.logger=INFO, ROLLINGFILE
```

2、修改$ZOOKEEPER_HOME/bin/zkEnv.sh文件中的对应内容如下:

```shell
if [ "x${ZOO_LOG_DIR}" = "x" ]
then
    ZOO_LOG_DIR="/app/logs/zookeeper"
fi

if [ "x${ZOO_LOG4J_PROP}" = "x" ]
then
    ZOO_LOG4J_PROP="INFO,ROLLINGFILE"
fi
```

## 4.5、运行zookeeper

1、在所有zookeeper节点上启动zookeeper：

```shell
$ZOOKEEPER_HOME/bin/zkServer.sh start
1
```

2、查看节点状态：

```shell
$ZOOKEEPER_HOME/bin/zkServer.sh status
1
```

正常情况下有一台节点会是leader，其他节点是follower

3、测试zookeeper
任意一台节点上执行以下命令行进入client模式，可以create一些node，修改查看数据的同步情况，这里不再赘述了

```shell
$ZOOKEEPER_HOME/bin/zkCli.sh -server 127.0.0.1:2181
1
```

# 5、Hadoop安装配置

在规划中需要安装hadoop的服务器上安装hadoop

## 5.1、下载

进入hadoop官网下载，这里使用的是hadoop-3.1.1
[下载页面链接](https://hadoop.apache.org/releases.html)
选择hadoop-3.1.1对应的binary包hadoop-3.1.1.tar.gz下载

## 5.2、安装

```shell
#在/usr/local目录下新建hadoop目录
mkdir /usr/local/hadoop

#复制下载的文件到此目录下
cp /download/path/hadoop-3.1.1.tar.gz /usr/local/hadoop

#cd到对应目录下解压文件
tar zxvf hadoop-3.1.1.tar.gz
```

## 5.3、配置

1、在/etc/profile.d目录下刚才新建的hadoop.sh文件中，新增如下内容：

```shell
# for hadoop
export HADOOP_HOME=/usr/local/hadoop/hadoop-3.1.1
```

2、修改$HADOOP_HOME/etc/hadoop/core-site.xml：

```xml
<configuration>
  <!--hdfs的nameservice为lzjcluster-->
  <property>
    <name>fs.defaultFS</name>
    <value>hdfs://lzjcluster</value>
  </property>
  
  <!--指定hadoop数据临时存放目录-->
  <property>
    <name>hadoop.tmp.dir</name>
    <value>/app/hadoop/temp</value>
  </property>

  <property>
    <name>io.file.buffer.size</name>
    <value>4096</value>
  </property>
 
  <!--指定zookeeper地址-->
  <property>
    <name>ha.zookeeper.quorum</name>
    <value>lzjdn1:2181,lzjdn2:2181,lzjdn3:2181</value>
  </property>
</configuration>
```

3、修改$HADOOP_HOME/etc/hadoop/hdfs-site.xml:

```xml
<configuration>
  <!--指定hdfs的nameservice为lzjcluster，需要和core-site.xml中的保持一致-->
  <property>
    <name>dfs.nameservices</name>
    <value>lzjcluster</value>
  </property>
  
  <!--lzjcluster下面有两个NameNode，分别是lzjnn1,lzjnn2-->
  <property>
    <name>dfs.ha.namenodes.lzjcluster</name>
    <value>lzjnn1,lzjnn2</value>
  </property>
  
  <!--lzjnn1的RPC通信地址-->
  <property>
    <name>dfs.namenode.rpc-address.lzjcluster.lzjnn1</name>
    <value>lzjnn1:9000</value>
  </property>
  
  <!--lzjnn1的http通信地址-->
  <!--Hadoop3开始http默认端口已经改为9870，这里为了兼容之前的，还是设置成50070-->
  <property>
    <name>dfs.namenode.http-address.lzjcluster.lzjnn1</name>
    <value>lzjnn1:50070</value>
  </property>
  
  <!--lzjnn2的RPC通信地址-->
  <property>
    <name>dfs.namenode.rpc-address.lzjcluster.lzjnn2</name>
    <value>lzjnn2:9000</value>
  </property>
  
  <!--lzjnn2的http通信地址-->
  <property>
    <name>dfs.namenode.http-address.lzjcluster.lzjnn2</name>
    <value>lzjnn2:50070</value>
  </property>
  
  <!--指定NameNode的元数据在JournalNode上的存放位置-->
  <property>
    <name>dfs.namenode.shared.edits.dir</name>
    <value>qjournal://lzjdn1:8485;lzjdn2:8485;lzjdn3:8485/lzjcluster</value>
  </property>
  
  <!--指定JournalNode在本地磁盘存放数据的位置-->
  <property>
    <name>dfs.journalnode.edits.dir</name>
    <value>/app/hadoop/journal/data</value>
  </property>
  
  <!--开启NameNode故障时自动切换-->
  <property>
    <name>dfs.ha.automatic-failover.enabled</name>
    <value>true</value>
  </property>
  
  <!--配置失败自动切换实现方式-->
  <property>
    <name>dfs.client.failover.proxy.provider.lzjcluster</name>
    <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
  </property>
  
  <!--配置隔离机制，如果ssh是默认22端口，value直接写sshfence即可-->
  <!--如果不是22端口，则写sshfence(hadoop:22022)，其中22022为新的ssh端口号-->
  <property>
    <name>dfs.ha.fencing.methods</name>
    <value>sshfence</value>
  </property>
  
  <!--使用隔离机制时需要ssh免登陆-->
  <property>
    <name>dfs.ha.fencing.ssh.private-key-files</name>
    <value>/home/hadoop/.ssh/id_rsa</value>
  </property>

  <!--namenode中name数据存放目录-->
  <property>
    <name>dfs.namenode.name.dir</name>
    <value>file:/app/hadoop/hdfs/name</value>
  </property>

  <!--datanode数据存放目录-->
  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file:/app/hadoop/hdfs/data</value>
  </property>
  
  <!--数据备份数量-->
  <property>
    <name>dfs.replication</name>
    <value>2</value>
  </property>
  
  <!-- 在NN和DN上开启WebHDFS (REST API)功能,不是必须 -->
  <property>
    <name>dfs.webhdfs.enabled</name>
    <value>true</value>
  </property>
</configuration>
```

4、修改$HADOOP_HOME/etc/hadoop/mapred-site.xml：

```xml
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
</configuration>
```

5、修改$HADOOP_HOME/etc/hadoop/yarn-site.xml：

```xml
<configuration>
  <!--指定nodemanager启动时加载server的方式为shuffle server-->
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
  
  <property>
    <name>yarn.nodemanager.aux-services.mapreduce_shuffle.class</name>
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
  </property>
  
  <!--ResourceManager高可用激活-->
  <property>
    <name>yarn.resourcemanager.ha.enabled</name>
    <value>true</value>
  </property>
  
  <!--定义集群的ID,确保RM不会在其他集群中接管成为活跃RM-->
  <property>
    <name>yarn.resourcemanager.cluster-id</name>
    <value>lzjcluster</value>
  </property>
  
  <property>
    <name>yarn.resourcemanager.ha.rm-ids</name>
    <value>lzjrm1,lzjrm2</value>
  </property>
  
  <property>
    <name>yarn.resourcemanager.hostname.lzjrm1</name>
    <value>lzjnn1</value>
  </property>
  
  <property>
    <name>yarn.resourcemanager.hostname.lzjrm2</name>
    <value>lzjnn2</value>
  </property>

  <property>
    <name>yarn.resourcemanager.webapp.address.lzjrm1</name>
    <value>lzjnn1:8088</value>
  </property>
  
  <property>
    <name>yarn.resourcemanager.webapp.address.lzjrm2</name>
    <value>lzjnn2:8088</value>
  </property>
  
  <property>
    <name>yarn.resourcemanager.zk-address</name>
    <value>lzjdn1:2181,lzjdn2:2181,lzjdn3:2181</value>
  </property>
</configuration>
```

6、$HADOOP_HOME/etc/hadoop下新建workers文件，写入如下内容（删除原先的localhost）：

```shell
lzjdn1
lzjdn2
lzjdn3
```

7、配置hadoop的日志目录（不需要修改的可以跳过这段）：
$HADOOP_HOME/etc/hadoop/hadoop-env.sh 找到HADOOP_LOG_DIR修改：

```shell
export HADOOP_LOG_DIR=/app/logs/hadoop/logs
```

## 5.4、运行Hadoop

第一次启动比较繁琐，之后直接start-all就好了
1、初始化zookeeper的命名空间：

```shell
$HADOOP_HOME/bin/hdfs zkfc -formatZK
```

2、在每个journalnode节点用如下命令启动journalnode：

```shell
$HADOOP_HOME/bin/hdfs --daemon start journalnode
```

3、在主namenode节点格式化namenode和journalnode目录

```shell
$HADOOP_HOME/bin/hdfs namenode -format
```

4、全新安装的集群，可在主namenode节点执行start-all.sh启动

```shell
$HADOOP_HOME/sbin/start-all.sh
```

5、如果是运行中的集群，hdfs从非HA模式修改为HA模式，需要如下操作：

```shell
#在备namenode节点执行如下命令，格式化并复制主节点的元数据
$HADOOP_HOME/bin/hdfs namenode -bootstrapStandby

#在主节点执行如下命令，初始化JournalNodes的edit数据
$HADOOP_HOME/bin/hdfs namenode -initializeSharedEdits

#然后在备节点上启动namenode
$HADOOP_HOME/bin/hdfs --daemon start namenode
```

## 5.5、验证HA

### 5.5.1、验证NameNode的HA

1、查看NameNode的状态，应该是一个active，一个standby

```shell
$HADOOP_HOME/bin/hdfs haadmin -getAllServiceState
```

2、模拟故障

```shell
#在NameNode为active的服务器上jps查看进程和进程号
jps

#kill NameNode进程，模拟程序crash的情况
kill -9 NameNode的进程号
12345
```

3、等待一会，再次查看节点状态：如果一切正常，是会自动切换Active的NameNode到备用服务器上。如果没有正常切换，请检查之前的配置是否正常。如果都正确，则查看standby节点上$HADOOP_LOG_DIR下的zkfc日志来找具体的问题。

4、问题小记
**我在首次测试的时候遇到了无法正常切换的问题，查找日志定位到了问题。由于centos是最小安装的，日志中报了几个错误:**

```shell
fuser: 未找到命令
nc: 未找到命令
12
```

应该是hadoop采用的是ssh的shell方式来实现切换的，我的CentOS是最小安装的，缺少了这些命令导致无法正常切换，**解决方法如下：**
在2台namenode上：

```shell
#安装psmisc包解决fuser命令找不到问题
yum install psmisc

#安装nmap-ncat包解决nc命令找不到问题
yum install nmap-ncat
12345
```

安装完成后等待一会，再检查状态，发现已经自动切换。

5、强制手动切换的方法（不推荐，谨慎操作）

```shell
$HADOOP_HOME/bin/hdfs haadmin -transitionToActive --forcemanual lzjnn2
1
```

### 5.5.2、验证ResourceManager的HA

1、查看ResourceManager的状态，应该是一个active，一个standby

```shell
$HADOOP_HOME/bin/yarn rmadmin -getAllServiceState
1
```

2、模拟故障

```shell
#在ResourceManager为active的服务器上jps查看进程和进程号
jps

#kill ResourceManager进程，模拟程序crash的情况
kill -9 ResourceManager的进程号
12345
```

3、等待一会，再次查看节点状态：如果一切正常，是会自动切换Active的ResourceManager到备用服务器上。如果没有正常切换，请检查之前的配置是否正常。如果都正确，则查看standby节点上$HADOOP_LOG_DIR下的yarn日志来找具体的问题。

4、强制手动切换的方法

```shell
$HADOOP_HOME/bin/yarn rmadmin -transitionToActive lzjnn2
1
```

# 6、参考资料

[Hadoop3.1.1官方HDFS的HA文档页面](https://hadoop.apache.org/docs/r3.1.1/hadoop-project-dist/hadoop-hdfs/HDFSHighAvailabilityWithQJM.html)
[Hadoop3.1.1官方RM的HA文档页面](http://hadoop.apache.org/docs/r3.1.1/hadoop-yarn/hadoop-yarn-site/ResourceManagerHA.html)
# linux下flume安装

![img](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[xl.zhang](https://me.csdn.net/u011254180) 2018-04-19 10:22:25 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes.png) 6681 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect.png) 收藏

分类专栏： [【大数据的学路历程】](https://blog.csdn.net/u011254180/category_9274316.html) 文章标签： [flume](https://www.csdn.net/gather_2c/MtTaEg0sMzMwMzgtYmxvZwO0O0OO0O0O.html) [hadoop](https://www.csdn.net/gather_28/MtTaYgzsMDE1Mi1ibG9n.html) [linux](https://www.csdn.net/gather_2d/MtjaQg5sMDY0MC1ibG9n.html)

版权

## 1.1 运行机制



1、 Flume分布式系统中最**核心的角色是agent**，flume采集系统就是由一个个agent所连接起来形成



2、每一个agent**相当于一个数据传递员**，内部有三个组件：

- Source：采集源，用于跟数据源对接，以获取数据

- Sink：下沉地，采集数据的传送目的，用于往下一级agent传递数据或者往最终存储系统传递数据

- Channel：angent内部的数据传输通道，用于从source将数据传递到sink

## 1.2.Flume采集系统结构图

### 1.2.1 简单结构

单个agent采集数据

![img](https://img-blog.csdn.net/20180419101055985)

### 1.2.2 复杂结构



多级agent之间串联

![img](https://img-blog.csdn.net/20180419101132861)





## 1.3 Flume实战案例 

### 1.3.1 Flume的安装部署

1、Flume的安装非常简单，只需要解压即可，当然，前提是已有hadoop环境

- 上传安装包到数据源所在节点上

- 然后解压 tar -zxvf apache-flume-1.6.0-bin.tar.gz

- 然后进入flume的目录，修改conf下的flume-env.sh，在里面配置JAVA_HOME

2、根据数据采集的需求**配置采集方案**，描述在配置文件中(文件名可任意自定义)

3、**指定采集方案配置文件**，在相应的节点上启动flume agent

> 先用一个最简单的例子来测试一下程序环境是否正常
>
> 1、先在flume的conf目录下新建一个文件
>
> ```properties
> vi netcat-logger.conf
> # 定义这个agent中各组件的名字
> a1.sources = r1
> a1.sinks = k1
> a1.channels = c1
> 
> # 描述和配置source组件：r1
> a1.sources.r1.type = netcat
> a1.sources.r1.bind = localhost
> a1.sources.r1.port = 44444
> 
> # 描述和配置sink组件：k1
> a1.sinks.k1.type = logger
> 
> # 描述和配置channel组件，此处使用是内存缓存的方式
> a1.channels.c1.type = memory
> a1.channels.c1.capacity = 1000
> a1.channels.c1.transactionCapacity = 100
> 
> # 描述和配置source  channel   sink之间的连接关系
> a1.sources.r1.channels = c1
> a1.sinks.k1.channel = c1
> ```
>
> 2、启动agent去采集数据
>
> ```groovy
> bin/flume-ng agent -c conf -f conf/netcat-logger.conf -n a1  -Dflume.root.logger=INFO,console
> ```
>
> - -c conf  指定flume自身的配置文件所在目录
>
> - -f conf/netcat-logger.con  指定我们所描述的采集方案
>
> - -n a1  指定我们这个agent的名字
>
> 3、测试
>
> ​	先要往agent采集监听的端口上发送数据，让agent有数据可采
>
> ​	随便在一个能跟agent节点联网的机器上
>
> ```apache
> telnet anget-hostname  port   （telnet localhost 44444）
> ```
>
> ![img](https://img-blog.csdn.net/20180419101738970)
>

### 1.3.2 采集案例 

#### 1、采集目录到HDFS

采集需求：某服务器的某特定目录下，会不断产生新的文件，每当有新文件出现，就需要把文件采集到HDFS中去

根据需求，首先定义以下3大要素

- 采集源，即source——监控文件目录 :  spooldir
- 下沉目标，即sink——HDFS文件系统  :  hdfs sink
- source和sink之间的传递通道——channel，可用file channel 也可以用内存channel

配置文件编写：

```ini
#定义三大组件的名称
agent1.sources = source1
agent1.sinks = sink1
agent1.channels = channel1

# 配置source组件
agent1.sources.source1.type = spooldir
agent1.sources.source1.spoolDir = /home/hadoop/logs/
agent1.sources.source1.fileHeader = false

#配置拦截器
agent1.sources.source1.interceptors = i1
agent1.sources.source1.interceptors.i1.type = host
agent1.sources.source1.interceptors.i1.hostHeader = hostname

# 配置sink组件
agent1.sinks.sink1.type = hdfs
agent1.sinks.sink1.hdfs.path =hdfs://hdp-node-01:9000/weblog/flume-collection/%y-%m-%d/%H-%M
agent1.sinks.sink1.hdfs.filePrefix = access_log
agent1.sinks.sink1.hdfs.maxOpenFiles = 5000
agent1.sinks.sink1.hdfs.batchSize= 100
agent1.sinks.sink1.hdfs.fileType = DataStream
agent1.sinks.sink1.hdfs.writeFormat =Text
agent1.sinks.sink1.hdfs.rollSize = 102400
agent1.sinks.sink1.hdfs.rollCount = 1000000
agent1.sinks.sink1.hdfs.rollInterval = 60
#agent1.sinks.sink1.hdfs.round = true
#agent1.sinks.sink1.hdfs.roundValue = 10
#agent1.sinks.sink1.hdfs.roundUnit = minute
agent1.sinks.sink1.hdfs.useLocalTimeStamp = true
# Use a channel which buffers events in memory
agent1.channels.channel1.type = memory
agent1.channels.channel1.keep-alive = 120
agent1.channels.channel1.capacity = 500000
agent1.channels.channel1.transactionCapacity = 600

# Bind the source and sink to the channel
agent1.sources.source1.channels = channel1
agent1.sinks.sink1.channel = channel1
```

Channel参数解释：

capacity：默认该通道中最大的可以存储的event数量

trasactionCapacity：每次最大可以从source中拿到或者送到sink中的event数量

keep-alive：event添加到通道中或者移出的允许时间

#### 2、采集文件到HDFS

采集需求：比如业务系统使用log4j生成的日志，日志内容不断增加，需要把追加到日志文件中的数据实时采集到hdfs

根据需求，首先定义以下3大要素

- 采集源，即source——监控文件内容更新 :  exec  ‘tail -F file’
- 下沉目标，即sink——HDFS文件系统  :  hdfs sink
- Source和sink之间的传递通道——channel，可用file channel 也可以用 内存channel

配置文件编写：

```ini
agent1.sources = source1
agent1.sinks = sink1
agent1.channels = channel1

# Describe/configure tail -F source1
agent1.sources.source1.type = exec
agent1.sources.source1.command = tail -F /home/hadoop/logs/access_log
agent1.sources.source1.channels = channel1

#configure host for source
agent1.sources.source1.interceptors = i1
agent1.sources.source1.interceptors.i1.type = host
agent1.sources.source1.interceptors.i1.hostHeader = hostname

# Describe sink1
agent1.sinks.sink1.type = hdfs
#a1.sinks.k1.channel = c1
agent1.sinks.sink1.hdfs.path =hdfs://hdp-node-01:9000/weblog/flume-collection/%y-%m-%d/%H-%M
agent1.sinks.sink1.hdfs.filePrefix = access_log
agent1.sinks.sink1.hdfs.maxOpenFiles = 5000
agent1.sinks.sink1.hdfs.batchSize= 100
agent1.sinks.sink1.hdfs.fileType = DataStream
agent1.sinks.sink1.hdfs.writeFormat =Text
agent1.sinks.sink1.hdfs.rollSize = 102400
agent1.sinks.sink1.hdfs.rollCount = 1000000
agent1.sinks.sink1.hdfs.rollInterval = 60
agent1.sinks.sink1.hdfs.round = true
agent1.sinks.sink1.hdfs.roundValue = 10
agent1.sinks.sink1.hdfs.roundUnit = minute
agent1.sinks.sink1.hdfs.useLocalTimeStamp = true

# Use a channel which buffers events in memory
agent1.channels.channel1.type = memory
agent1.channels.channel1.keep-alive = 120
agent1.channels.channel1.capacity = 500000
agent1.channels.channel1.transactionCapacity = 600

# Bind the source and sink to the channel
agent1.sources.source1.channels = channel1
agent1.sinks.sink1.channel = channel1
```
# Mysql设置远程连接

## 1. 创建其他用户

1）使用root账户进行其他用户创建

> % 代表所有、任意

```mysql
create user '用户名'@'%' identified by '密码';
```

2）给用户相应的权限

> ALL PRIVILEGES 是所有权限

```mysql
GRANT ALL PRIVILEGES ON *.* TO '用户名'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
```

3）在同一网络下的其他客户端使用以上新建的账户连接即可

```cmd
mysql -h IP地址 -u 账户名 -p -P 3306
```


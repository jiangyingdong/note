- 需要：数据库，数据库连接驱动
- 连接数据库：
  - 调用Class类方法**forName(String 驱动名)**来加载驱动
  
  - 调用DriverManager类方法**getConnection(String 连接串,String 用户,String 密码)**来获取数据库连接类Connection对象，每次用完需要调用对象方法**close**来释放资源
  
    - 常用连接串：
  
      ```xml
      jdbc:mysql://localhost:3306/数据库名?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=UTF-8
      ```
  
  - 使用Connection对象调用对象方法**prepareStatement(String sql语句)**来获取PreparedStatement数据库操作类对象，同上，用完关闭
  
  - 使用PreparedStatement对象方法execute来执行先前传入的sql语句，或者使用executeQuery方法用来查询数据库，返回一个ResultSet对象
  
  - 使用ResultSet对象方法next来遍历每条记录，结束返回false；使用getxxx方法根据字段位置来获取每个字段的值，起始位置是1，同上，用完关闭

- 通用抽象类 **DBOperator.java**

  ```java
  import java.sql.*;
  import java.util.ArrayList;
  import java.util.List;
  
  /**
   * 专门操作数据库的抽象类
   * dao层各类需要继承该类
   * 调用excuteSQL、querySQL之前需要设置连接属性
   * address 连接地址：如localhost:3306
   * DBName 数据库名
   * user 账户名
   * password 账号密码
   */
  public abstract class DBOperator {
      private Connection conn = null;
      private PreparedStatement ps = null;
      private ResultSet rs = null;
      private String address = "192.168.101.43:3306";
      private String DBName = "exam1016";
      private String user = "other";
      private String password = "other";
  
      /**
       * 获取数据库连接对象
       * @return
       */
      public boolean getConn(){
          try {
              Class.forName("com.mysql.cj.jdbc.Driver");//8.0版本的mysql的驱动名是com.mysql.cj.jdbc.Driver
          } catch (ClassNotFoundException e) {
              e.printStackTrace();
              System.out.println("数据库驱动加载失败！");
              return false;
          }
          try {
              conn = DriverManager.getConnection("jdbc:mysql://"+address+"/"+DBName+"?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=UTF-8", user, password);//数据库连接
              return true;
          } catch (SQLException throwables) {
              throwables.printStackTrace();
              System.out.println("数据库连接失败！");
              return false;
          }
      }
  
      /**
       * 根据指定的带问号的sql语句和对象数组，增删改，
       * @param sql
       * @param objs 表中各字段的值
       * @return
       */
      public boolean excuteSQL(String sql, Object[] objs){
          if (getConn()){
              try {
                  ps = conn.prepareStatement(sql);
                  for (int i = 0; i < objs.length; i++) {
                      ps.setObject(i+1,objs[i]);
                  }
                  ps.execute();
                  close();
                  return true;
              } catch (SQLException throwables) {
                  throwables.printStackTrace();
                  System.out.println("数据操作失败！");
              }
              close();
          }
          return false;
      }
  
      /**
       * 根据带问号的sql语句和对象数组查询数据库，返回二维的ArrayList对象
       * @param sql
       * @param objs 表中各字段的值
       * @return
       */
      public ArrayList<List> querySQL(String sql, Object[] objs){
          if (getConn()){
              try {
                  ps = conn.prepareStatement(sql);
                  for (int i = 0; i < objs.length; i++) {
                      ps.setObject(i+1,objs[i]);
                  }
                  rs = ps.executeQuery();
                  ArrayList<List> list = new ArrayList();
                  while (rs.next()){
                      ArrayList<Object> a = oneRowToObject(rs);
                      if (a!=null) {
                          list.add(a);
                      }
                  }
                  close();
                  return list;
              } catch (SQLException throwables) {
                  throwables.printStackTrace();
                  System.out.println("查询数据失败！");
              }
              close();
          }
          return null;
      }
  
      /**
       * 关闭资源
       * @return
       */
      public boolean close(){
          try {
              if (rs!=null){
                  rs.close();
                  rs=null;
              }
              if (ps!=null){
                  ps.close();
                  ps=null;
              }
              if (conn!=null){
                  conn.close();
                  conn=null;
              }
              return true;
          } catch (Exception throwables) {
              throwables.printStackTrace();
              System.out.println("关闭失败!");
              return false;
          }
      }
  
      /**
       * 将ResultSet一行数据包装成一个ArrayList<Object>对象
       * @param rs
       * @return
       */
      private ArrayList<Object> oneRowToObject(ResultSet rs){
          try {
              ArrayList<Object> list = new ArrayList<>();
              ResultSetMetaData rd = rs.getMetaData();
              for (int i = 0; i < rd.getColumnCount(); i++) {
                  //获取列名
                  String columnName = rd.getColumnLabel(i + 1);
                  //获取列类型
                  int columnType = rd.getColumnType(i + 1);
                  switch (columnType) {
                      case Types.VARCHAR:
                      case Types.CHAR:
                          list.add(rs.getString(columnName));
                          break;
                      case Types.INTEGER:
                      case Types.SMALLINT:
                          list.add(rs.getInt(columnName));
                          break;
                      case Types.BIGINT:
                          list.add(rs.getLong(columnName));
                          break;
                      case Types.DATE:
                      case Types.TIMESTAMP:
                          list.add(rs.getString(columnName));
                          break;
                      case Types.DECIMAL:
                          list.add(rs.getBigDecimal(columnName));
                          break;
                      case Types.DOUBLE:
                      case Types.NUMERIC:
                          list.add(rs.getDouble(columnName));
                          break;
                      case Types.BIT:
                          list.add(rs.getBoolean(columnName));
                          break;
                      default:
                          break;
                  }
              }
              return list;
          }catch (Exception e){
              System.out.println("将ResultSet一行数据包装成一个ArrayList<Object>对象出错");
              e.printStackTrace();
              return null;
          }
      }
  
      public void setAddress(String address) {
          this.address = address;
      }
  
      public void setDBName(String DBName) {
          this.DBName = DBName;
      }
  
      public void setUser(String user) {
          this.user = user;
      }
  
      public void setPassword(String password) {
          this.password = password;
      }
  }
  
  ```

  
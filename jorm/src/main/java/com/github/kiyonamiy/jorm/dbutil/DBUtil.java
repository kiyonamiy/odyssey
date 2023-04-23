package com.github.kiyonamiy.jorm.dbutil;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class DBUtil {
  private static final String DEFAULT_PROPERTIES_PATH = "jdbc/db.properties";
  private static final String URL;
  private static final String USERNAME;
  private static final String PASSWORD;

  static {
    try (InputStream in = DBUtil.class.getClassLoader().getResourceAsStream((DEFAULT_PROPERTIES_PATH))) {
      Properties p = new Properties();
      p.load(in);
      URL = p.getProperty("mysql.url").trim();
      USERNAME = p.getProperty("mysql.username").trim();
      PASSWORD = p.getProperty("mysql.password").trim();
    } catch (IOException e) {
      throw new RuntimeException("[" + DEFAULT_PROPERTIES_PATH + "]读取失败.");
    }
  }

  private DBUtil() {
    throw new RuntimeException("can not instance.");
  }

  public static Connection getConnection() {
    Connection connection = null;
    try {
      connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
    } catch (SQLException e) {
      System.out.printf("获取数据库连接异常:%s", e);
    }
    return connection;
  }

  public static void closeConnection(Connection c) {
    try {
      if (c != null) {
        c.close();
      }
    } catch (SQLException e) {
      System.out.printf("关闭数据库连接异常:%s", e);
    }
  }

  public static void closeConnection(Connection c, ResultSet rs) {
    try {
      if (rs != null) {
        rs.close();
      }
      if (c != null) {
        c.close();
      }
    } catch (SQLException e) {
      System.out.printf("关闭数据库连接异常:%s", e);
    }
  }
}

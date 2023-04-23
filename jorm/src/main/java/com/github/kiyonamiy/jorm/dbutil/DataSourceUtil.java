package com.github.kiyonamiy.jorm.dbutil;

import java.sql.Connection;

public class DataSourceUtil {

  public static Connection getConnection() {
      Connection connection = ConnectionManager.getConnection();
      if (connection == null) {
          connection = DBUtil.getConnection();
          if (connection == null) {
              throw new RuntimeException("connect is null.");
          }
          ConnectionManager.setConnection(connection);
          return connection;
      }
      return connection;
  }

  public static void closeConnection() {
      try {
          DBUtil.closeConnection(getConnection());
      } finally {
          ConnectionManager.removeConnection();
      }
  }
}

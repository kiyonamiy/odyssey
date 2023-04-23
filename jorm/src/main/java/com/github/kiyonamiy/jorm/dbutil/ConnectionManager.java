package com.github.kiyonamiy.jorm.dbutil;

import java.sql.Connection;

public class ConnectionManager {

  private static final ThreadLocal<Connection> connectionThreadLocal = new ThreadLocal<>();

  public static Connection getConnection() {
    return connectionThreadLocal.get();
  }

  public static void setConnection(Connection connection) {
    connectionThreadLocal.set(connection);
  }

  public static void removeConnection() {
    connectionThreadLocal.remove();
  }
}

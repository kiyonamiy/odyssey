package com.github.kiyonamiy.jorm;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.github.kiyonamiy.jorm.dbutil.DBUtil;

/**
 * Hello world!
 *
 */
public class App
{
    public static void main( String[] args ) throws ClassNotFoundException, SQLException
    {
        Class.forName("com.mysql.cj.jdbc.Driver");
        System.out.println("Hello, World!");
        Connection conn = DBUtil.getConnection();
        ResultSet resultSet = conn.createStatement(0, 0, 0).executeQuery("select * from raw_data");

        while (resultSet.next()) {
          System.out.println(resultSet.getObject("id").toString());
          System.out.println(resultSet.getObject("transaction"));
          System.out.println(resultSet.getObject("receipt"));
          System.out.println("=========================");
      }

        DBUtil.closeConnection(conn);
    }
}

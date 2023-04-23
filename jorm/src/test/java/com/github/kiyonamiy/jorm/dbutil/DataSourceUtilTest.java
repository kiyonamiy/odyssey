package com.github.kiyonamiy.jorm.dbutil;

import java.sql.Connection;

import org.junit.Assert;
import org.junit.Test;

public class DataSourceUtilTest {

  @Test
  public void getConnection() {
      Connection connection1 = DataSourceUtil.getConnection();
      Connection connection2 = DataSourceUtil.getConnection();

      Assert.assertEquals(connection2, connection1);
      // todo commit or rollback...
  }
}

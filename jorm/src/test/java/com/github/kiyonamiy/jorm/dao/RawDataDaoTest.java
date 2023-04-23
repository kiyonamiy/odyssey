package com.github.kiyonamiy.jorm.dao;

import java.sql.SQLException;

import org.junit.Assert;
import org.junit.Test;

import com.github.kiyonamiy.jorm.entity.RawData;

public class RawDataDaoTest {

  @Test
  public void queryById() throws SQLException {
    RawDataDao rawDataDao = new RawDataDao();
    RawData rawData = rawDataDao.selectById(1L);
    System.out.println(rawData);
    Assert.assertNotNull(rawData);
  }

  @Test
  public void getInstance() {
    RawDataDao rawDataDao = new RawDataDao();
    RawData instance = rawDataDao.getInstance();
    Assert.assertEquals("RawData [id=null, transaction=null, receipt=null]", instance.toString());
    Assert.assertEquals(RawData.class, instance.getClass());
  }
}

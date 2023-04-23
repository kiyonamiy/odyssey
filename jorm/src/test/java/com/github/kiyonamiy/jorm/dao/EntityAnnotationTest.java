package com.github.kiyonamiy.jorm.dao;

import org.junit.Assert;
import org.junit.Test;

import com.github.kiyonamiy.jorm.entity.RawData;
import com.github.kiyonamiy.jorm.orm.AnnotationUtil;
import com.github.kiyonamiy.jorm.orm.EntityMapper;
import com.github.kiyonamiy.jorm.orm.SqlGenerateUtil;

public class EntityAnnotationTest {
  @Test
  public void generateSelectAll() {
    EntityMapper entityMapper = AnnotationUtil.parse(RawData.class);
    String sql = SqlGenerateUtil.generateSelectById(entityMapper);
    Assert.assertEquals("SELECT receipt, id, transaction FROM raw_data WHERE id WHERE id = ?", sql);
  }
}

package com.github.kiyonamiy.jorm.dao;

import java.lang.reflect.Field;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.github.kiyonamiy.jorm.dbutil.DataSourceUtil;
import com.github.kiyonamiy.jorm.orm.AnnotationUtil;
import com.github.kiyonamiy.jorm.orm.EntityMapper;
import com.github.kiyonamiy.jorm.orm.SqlGenerateUtil;
import com.github.kiyonamiy.jorm.util.GenericUtil;

public class BaseDao<T> implements GenericUtil<T> {
  private T t;

  public T getT() {
    return t;
  }

  public void setT(T t) {
    this.t = t;
  }

  public T selectById(Long id) {
    T instance = this.getInstance();
    EntityMapper mapper = AnnotationUtil.parse(instance.getClass());
    String sql = SqlGenerateUtil.generateSelectById(mapper);

    try {
      PreparedStatement prepareStatement = DataSourceUtil.getConnection().prepareStatement(sql);
      prepareStatement.setObject(1, id);
      ResultSet resultSet = prepareStatement.executeQuery();

      int count = resultSet.getMetaData().getColumnCount();
      Map<String, String> columnMapper = mapper.getColumnMapper();

      while (resultSet.next()) {
        for (int i = 1; i <= count; i += 1) {
          // 获取列名
          String columnName = resultSet.getMetaData().getColumnName(i);
          // key 为类字段名，value 为表列名
          // 遍历所有类字段，找到就对 instance 对应字段赋值
          for (Map.Entry<String, String> entry : columnMapper.entrySet()) {
            if (columnName.equals(entry.getValue())) {
              Field declaredField = instance.getClass().getDeclaredField(entry.getKey());
              declaredField.setAccessible(true);
              declaredField.set(instance, resultSet.getObject(i));
            }
          }
        }
        // 只返回一个
        return instance;
      }
    } catch (SQLException | NoSuchFieldException | IllegalAccessException e) {
      e.printStackTrace();
    }

    return instance;
  }

  public List<T> selectAll() {
    Class<T> clazz = this.getGeneric();
    EntityMapper entityMapper = AnnotationUtil.parse(clazz);
    String sql = SqlGenerateUtil.generateSelectAll(entityMapper);

    List<T> result = new ArrayList<>();

    try {
      PreparedStatement preparedStatement = DataSourceUtil.getConnection().prepareStatement(sql);
      ResultSet resultSet = preparedStatement.executeQuery(sql);

      int colCount = resultSet.getMetaData().getColumnCount();
      Map<String, String> columnMapper = entityMapper.getColumnMapper();

      while(resultSet.next()) {
        T instance = this.getInstance();
        for (int i = 1; i <= colCount; i += 1) {
          String columnName = resultSet.getMetaData().getColumnClassName(i);
          for (Map.Entry<String, String> entry : columnMapper.entrySet()) {
            if (entry.getValue().equals(columnName)) {
              Field field = clazz.getDeclaredField(entry.getKey());
              field.setAccessible(true);
              field.set(instance, resultSet.getObject(i));
            }
          }
        }
        result.add(instance);
      }
    } catch (SQLException | NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException e) {
      e.printStackTrace();
    }

    return result;
  }
}

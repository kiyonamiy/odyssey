package com.github.kiyonamiy.jorm.orm;

import java.util.Map;

public class EntityMapper {
  private String tableName;

  private String idName;

  private Map<String, String> columnMapper;

  public String getTableName() {
    return tableName;
  }

  public void setTableName(String tableName) {
    this.tableName = tableName;
  }

  public String getIdName() {
    return idName;
  }

  public void setIdName(String idName) {
    this.idName = idName;
  }

  public Map<String, String> getColumnMapper() {
    return columnMapper;
  }

  public void setColumnMapper(Map<String, String> columnMapper) {
    this.columnMapper = columnMapper;
  }


}

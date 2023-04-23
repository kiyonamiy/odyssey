package com.github.kiyonamiy.jorm.orm;

import java.util.Map;
import java.util.Set;

public class SqlGenerateUtil {
  /**
   * SELECT col1, col2, col3 FROM table WHERE id = ?
   * @param mapper
   * @return
   */
  public static String generateSelectById(EntityMapper mapper) {
    StringBuilder sql = new StringBuilder("SELECT ");

    Set<Map.Entry<String, String>> entrySet = mapper.getColumnMapper().entrySet();
    for (Map.Entry<String, String> entry : entrySet) {
      sql.append(entry.getValue()).append(", ");
    }

    sql.deleteCharAt(sql.length() - 2).append("FROM ").append(mapper.getTableName()).append(" ").append("WHERE ")
        .append(mapper.getIdName()).append(" ").append("= ?");

    return sql.toString();
  }

  public static String generateSelectAll(EntityMapper mapper) {
    StringBuilder sql = new StringBuilder("SELECT ");
    Set<Map.Entry<String, String>> entrySet = mapper.getColumnMapper().entrySet();
    for (Map.Entry<String, String> entry : entrySet) {
        sql.append(entry.getValue()).append(", ");
    }
    sql
            .deleteCharAt(sql.length() - 2)
            .append("FROM ").append(mapper.getTableName());
    return sql.toString();
  }
}

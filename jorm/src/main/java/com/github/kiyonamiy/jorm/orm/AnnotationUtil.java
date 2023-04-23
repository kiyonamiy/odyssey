package com.github.kiyonamiy.jorm.orm;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import com.github.kiyonamiy.jorm.annotation.Column;
import com.github.kiyonamiy.jorm.annotation.Id;
import com.github.kiyonamiy.jorm.annotation.Table;

public class AnnotationUtil {
  public static EntityMapper parse(Class<?> clazz) {
    // 在 Java 中，<?> 这个符号表示“通配符类型”，也被称为“无限制通配符类型”。
    // 在使用该符号时，可以将该符号与任何类型相结合使用，从而构造出一个类型范围较宽的类型。
    // 例如，在方法参数中使用 (Class<?> clazz) 时，表示 clazz 参数可以是任何类型的 Class 对象.
    // 相对地，如果写成 (Class clazz)，则表示 clazz 参数只能是 Class 类型或其子类的对象。
    String tableName = parseTableName(clazz);
    String id = parseIdName(clazz);
    Map<String, String> columnMapper = parseColumnName(clazz);

    EntityMapper mapper = new EntityMapper();
    mapper.setTableName(tableName);
    mapper.setIdName(id);
    mapper.setColumnMapper(columnMapper);

    return mapper;
  }

  private static String parseTableName(Class<?> clazz) {
    Annotation[] clazzAnnotations = clazz.getAnnotations();
    if (clazzAnnotations.length > 0) {
      for (Annotation clazzAnnotation : clazzAnnotations) {
        if (clazzAnnotation instanceof Table) {
          return ((Table) clazzAnnotation).value();
        }
      }
    }
    return null;
  }

  /**
   * 遍历所有的字段，遍历所有字段的 annotation，找到 Id annotation，直接返回
   * @param clazz
   * @return
   */
  private static String parseIdName(Class<?> clazz) {
    Field[] declaredFields = clazz.getDeclaredFields();
    if (declaredFields.length > 0) {
      for (Field declaredFiled : declaredFields) {
        Annotation[] fieldAnnotations = declaredFiled.getAnnotations();
        if (fieldAnnotations.length > 0) {
          for (Annotation fieldAnnotation : fieldAnnotations) {
            if (fieldAnnotation instanceof Id) {
              return ((Id) fieldAnnotation).value();
            }
          }
        }
      }
    }
    return null;
  }

  /**
   * 遍历所有的字段，遍历所有字段的 Column 和 Id 的 annotation，将 Field.getName() 作为 key 值，将 Column value 作为 value 值，返回 HashMap
   * @param clazz
   * @return
   */
  private static Map<String, String> parseColumnName(Class<?> clazz) {
    Map<String, String> columnMapper = new HashMap<>();

    Field[] declaredFields = clazz.getDeclaredFields();
    if (declaredFields.length > 0) {
        for (Field declaredField : declaredFields) {
            Annotation[] fieldAnnotations = declaredField.getAnnotations();
            if (fieldAnnotations.length > 0) {
                for (Annotation fieldAnnotation : fieldAnnotations) {
                    if (fieldAnnotation instanceof Column) {
                        String value = ((Column) fieldAnnotation).value();
                        columnMapper.putIfAbsent(declaredField.getName(), value);
                    } else if (fieldAnnotation instanceof Id) {
                        String value = ((Id) fieldAnnotation).value();
                        columnMapper.putIfAbsent(declaredField.getName(), value);
                    }
                }
            }
        }
    }
    return columnMapper;
}
}

package com.github.kiyonamiy.jorm.util;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Arrays;

import com.github.kiyonamiy.jorm.dao.BaseDao;

public interface GenericUtil<T> {


  /**
   * 获取泛型信息
   * 例如 RawDataDao extends BaseDao<RawData>，那返回的泛型为 RawData
   * @return
   */
  @SuppressWarnings("unchecked")
  default Class<T> getGeneric() {
    // 例如 RawDataDao extends BaseDao<RawData>，那 genericSuperclass 就是 BaseDao<RawData>
    Type genericSuperclass = this.getClass().getGenericSuperclass();
    // 判断
    if (genericSuperclass instanceof ParameterizedType
        && ((ParameterizedType) genericSuperclass).getRawType().equals(BaseDao.class)) {
      // System.out.println(genericSuperclass);
      // System.out.println((Class<T>) ((ParameterizedType) genericSuperclass).getActualTypeArguments()[0]);
      // 返回
      return (Class<T>) ((ParameterizedType) genericSuperclass)
          .getActualTypeArguments()[0];
    }
    throw new RuntimeException("子类必须继承" + BaseDao.class);
  }

  /**
   * 使用 T 类型的无参构造函数，生成实例
   * @return
   */
  default T getInstance() {
    Class<T> clazz = getGeneric();

    T t = null;
    Constructor<?> constructor = Arrays.stream(clazz.getConstructors())
        .filter(c -> c.getParameters().length == 0)
        .findFirst()
        .orElseThrow(() -> new RuntimeException(clazz.getSimpleName() + "没有可用的无参构造器"));
    try {
      Object o = constructor.newInstance();
      t = clazz.cast(o);
    } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
      e.printStackTrace();
    }
    return t;
  }
}

package com.github.kiyonamiy.jorm.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.github.kiyonamiy.jorm.dbutil.DBUtil;
import com.github.kiyonamiy.jorm.entity.RawData;

public class RawDataDao extends BaseDao<RawData> {
  // public RawData queryById(Long id) throws SQLException {
  //   String sql = "select * from raw_data where id=?";
  //   Connection connection = DBUtil.getConnection();
  //   PreparedStatement pst = connection.prepareStatement(sql);
  //   pst.setObject(1, id);
  //   ResultSet rs = pst.executeQuery();

  //   while (rs.next()) {
  //     RawData rawData = new RawData();
  //     rawData.setId(rs.getLong((1)));
  //     rawData.setTransaction(rs.getString(2));
  //     rawData.setReceipt(rs.getString(3));
  //     return rawData;
  //   }
  //   return null;
  // }
}

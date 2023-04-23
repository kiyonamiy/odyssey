package com.github.kiyonamiy.jorm.entity;

import com.github.kiyonamiy.jorm.annotation.Column;
import com.github.kiyonamiy.jorm.annotation.Id;
import com.github.kiyonamiy.jorm.annotation.Table;

@Table("raw_data")
public class RawData {
  @Id("id")
  public Integer id;
  @Column("transaction")
  private String transaction;
  @Column("receipt")
  private String receipt;


  public int getId() {
    return id;
  }
  public String getTransaction() {
    return transaction;
  }
  public String getReceipt() {
    return receipt;
  }

  public void setId(int id) {
    this.id = id;
  }
  public void setTransaction(String transaction) {
    this.transaction = transaction;
  }
  public void setReceipt(String receipt) {
    this.receipt = receipt;
  }
  @Override
  public String toString() {
    return "RawData [id=" + id + ", transaction=" + transaction + ", receipt=" + receipt + "]";
  }

}

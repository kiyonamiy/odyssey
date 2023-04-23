package com.github.kiyonamiy.jorm;

import java.util.UUID;

import org.junit.Test;

public class ThreadLocalTest {
  private static final ThreadLocal<String> threadLocal = new ThreadLocal<>();

  @Test
  public void localThread() throws InterruptedException {
    Runnable runnable = new Runnable() {
      public void run() {
        String value = UUID.randomUUID().toString();
        // threadLocal.set(value);
        System.out.println(Thread.currentThread().getName() + " set threadLocal value: " + value);
        try {
          Thread.sleep(1000);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
        // 效果一样，一看就是局部变量
        // System.out.println(Thread.currentThread().getName() + " get threadLocal value: " + threadLocal.get());
        System.out.println(Thread.currentThread().getName() + " get threadLocal value: " + value);
      }
    };

    Thread thread1 = new Thread(runnable, "Thread-1");
    Thread thread2 = new Thread(runnable, "Thread-2");

    thread1.start();
    thread2.start();
    Thread.sleep(5000);
  }
}

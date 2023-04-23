## ORM 主要流程

 ORM 主要的目的有两个：
 1. 简化构建 SQL 语句；
 2. 简化 SQL 执行结果转为对象；

整体流程：
 1. 在 RawData 中，使用 @Table、@Id、@Column 注解标记；
 2. 所有的实现代码都在 BaseDao<T> 中
    1. 使用 AnnotionUtil 解析注解，返回 EntityMapper（tableName、idName、columnMapper）；
    2. 使用 SqlGenerateUtil 根据 EntityMapper 生成 sql 语句；
    3. 正常使用 PreparedStatement.execute(sql)，拿到 ResultSet；
    4. 拿到每个表字段的值对对应类字段（遍历找）进行赋值 declaredField.set(instance, resultSet.getObject(i));；

## Java 在 VScode 使用

- [VSCode Java 使用指南](https://www.infoq.cn/article/wsak-nm2zhk65ydrudgj)
- 包名可以通过 .vscode/settings.json 来控制（Run 触发的时候，命令里带了 -cp，指定了目录）。

VSCode 点击 Run，实际运行的是这个命令 `cd /Users/yuqingbo/Code/__TEST__/odyssey/jorm ; /usr/bin/env /Users/yuqingbo/.sdkman/candidates/java/19.0.2-amzn/bin/java @/var/folders/jd/wht4gg0x2ll_c_2lftb5dy7m0000gn/T/cp_8abpwtas064visctqg7o1ejpv.argfile com.github.kiyoinamiy.jorm.App`，简化后就是 `cd jorm; /usr/bin/env java @x/xx/xxx.argfile com.github.kiyonamiy.jorm.App`。

@x/xx/xxx.argfile 文件打开后，就是 ` -XX:+ShowCodeDetailsInExceptionMessages -cp "/Users/yuqingbo/Code/__TEST__/odyssey/jorm/target/classes:/Users/yuqingbo/.m2/repository/mysql/mysql-connector-java/8.0.30/mysql-connector-java-8.0.30.jar:/Users/yuqingbo/.m2/repository/com/google/protobuf/protobuf-java/3.19.4/protobuf-java-3.19.4.jar"`，里面使用 -cp 指向了本地 maven 仓库。

@符号是Java命令行参数的一部分，作用是通过指定一个参数文件来传递一些参数给Java程序。

### resources 目录

当使用 class.getClassLoader().getResourceAsStream(resource) 方法读取资源文件时，resource 路径是相对于类加载器类路径（classpath）的路径，如下所示：

src
└── main
    ├── java
    │   └── com
    │       └── example
    │           └── package
    │               └── DBUtil.java
    └── resources
        └── config.properties

其中，src/main/java 目录是存放 Java 源码的目录，src/main/resources 目录是存放资源文件的目录，这些资源文件在编译时会打包到 Jar 包中，这些 Jar 包将位于类加载器的类路径上。

目录名不一定需要使用 resources，这个只是 Maven 约定的默认目录名，如果没有特殊需求，建议按照 Maven 的约定规则来组织项目结构，以便更好地与 Maven 集成。

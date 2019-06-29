#!/bin/sh

cd 绝对路径
cp access.log $(date +%Y-%m-%d).access.log # 复制
echo "" > access.log #清空
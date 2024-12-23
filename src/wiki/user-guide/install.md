---
title: Cursor 安装和配置
description: 详细的 Cursor AI 安装指南，包括系统要求、安装步骤和初始配置说明。
---

# Cursor 安装和配置

本文将指导你完成 Cursor AI 的安装和基本配置过程，帮助你快速开始使用这个强大的 AI 编程工具。

## 系统要求

### Windows
- Windows 10 或更高版本
- 64 位操作系统
- 至少 4GB RAM
- 1GB 可用磁盘空间

### macOS
- macOS 10.15 (Catalina) 或更高版本
- Apple Silicon 或 Intel 处理器
- 至少 4GB RAM
- 1GB 可用磁盘空间

### Linux
- Ubuntu 20.04 或其他主流 Linux 发行版
- 64 位操作系统
- 至少 4GB RAM
- 1GB 可用磁盘空间

## 下载安装

### 1. 获取安装包

1. 访问 [Cursor 官网](https://cursor.sh)
2. 点击"Download"按钮
3. 选择适合你操作系统的版本

### 2. 安装步骤

#### Windows
1. 运行下载的 `.exe` 安装文件
2. 按照安装向导的提示进行操作
3. 选择安装位置（建议使用默认位置）
4. 等待安装完成

#### macOS
1. 打开下载的 `.dmg` 文件
2. 将 Cursor 图标拖拽到 Applications 文件夹
3. 首次���行时，按住 Control 键点击应用图标，选择"打开"
4. 在系统偏好设置中允许必要的权限

#### Linux
1. 下载 `.AppImage` 或 `.deb` 包
2. 对于 `.AppImage`：
   ```bash
   chmod +x cursor.AppImage
   ./cursor.AppImage
   ```
3. 对于 `.deb`：
   ```bash
   sudo dpkg -i cursor.deb
   sudo apt-get install -f
   ```

## 初始配置

### 1. 账号设置

1. 首次启动 Cursor 时，你需要：
   - 创建新账号或使用现有账号登录
   - 选择是否导入 VS Code 设置
   - 配置 AI 功能的 API 密钥

### 2. API 密钥配置

1. 获取 OpenAI API 密钥：
   - 访问 [OpenAI 平台](https://platform.openai.com)
   - 注册/登录账号
   - 在 API 密钥页面生成新密钥

2. 在 Cursor 中配置 API 密钥：
   - 打开 Cursor 设置（Cmd/Ctrl + ,）
   - 导航到 "AI 设置"
   - 输入你的 API 密钥

### 3. 编辑器设置

1. **基本设置**
   - 选择主题和图标
   - 配置字体和字号
   - 调整缩进设置

2. **扩展安装**
   - 浏览并安装常用扩展
   - 配置扩展设置
   - 同步扩展配置

3. **快捷键设置**
   - 查看默认快捷键
   - 自定义快捷键绑定
   - 导入已有快捷键配置

## 从 VS Code 迁移

### 1. 设置迁移
- 导出 VS Code 设置
- 在 Cursor 中导入设置
- 验证���置是否正确应用

### 2. 扩展迁移
- 记录已安装的 VS Code 扩展
- 在 Cursor 中安装对应扩展
- 配置扩展设置

### 3. 项目迁移
- 打开已有项目
- 配置项目特定设置
- 验证项目功能

## 常见问题解决

### 1. 安装问题
- 检查系统要求
- 验证下载文件完整性
- 清理临时文件后重试

### 2. 配置问题
- 确保 API 密钥正确
- 检查网络连接
- 验证权限设置

### 3. 性能问题
- 关闭不必要的扩展
- 清理缓存
- 调整内存限制

## 后续步骤

完成安装和基本配置后，建议：

1. 完成内置教程
2. 熟悉基本快捷键
3. 探索 AI 功能
4. 配置个性化设置

::: tip 建议
- 定期更新 Cursor 到最新版本
- 备份重要的配置文件
- 加入 Cursor 社区获取支持
:::

::: warning 注意
- 请妥善保管 API 密钥
- 首次使用可能需要一些时间适应
- 遇到问题时查看官方文档或寻求社区帮助
::: 
# 自媒体博主个人网站

基于 Hugo + PaperMod 主题构建的静态博客网站。

## 🚀 快速开始

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/syzx-a/my-blog.git
cd my-blog

# 初始化子模块（主题）
git submodule update --init --recursive

# 安装 Hugo (extended版本)
# macOS
brew install hugo

# Windows
choco install hugo-extended

# 启动开发服务器
hugo server -D

# 访问 http://localhost:1313
```

### 构建

```bash
# 生产构建
hugo --minify

# 输出到 public/ 目录
```

## 📝 内容管理

### 添加文章

```bash
# 创建新文章
hugo new content posts/my-new-post.md
```

或者在 `content/posts/` 目录下新建 `.md` 文件：

```markdown
---
title: "文章标题"
date: 2024-01-01T00:00:00+08:00
draft: false
tags: ["标签1", "标签2"]
categories: ["分类"]
cover: "/images/posts/cover.jpg"
description: "文章摘要"
---

文章内容...
```

### 添加直播预告

在 `content/live/` 目录下创建文件：

```markdown
---
title: "直播标题"
livetime: 2024-01-01T20:00:00+08:00
date: 2024-01-01T00:00:00+08:00
platform: "B站"
link: "https://live.bilibili.com/yourroomid"
---

直播详情...
```

## 🎨 自定义主题

编辑 `hugo.toml` 文件修改网站配置。

### 修改个人信息

```toml
[params]
  author = '你的名字'
  description = '网站描述'
```

### 修改社交链接

```toml
[[params.socialIcons]]
  name = 'bilibili'
  url = 'https://space.bilibili.com/yourid'
```

## 🚀 部署

### 自动部署（推荐）

项目已配置 GitHub Actions，推送到 main 分支会自动部署到 Vercel。

需要配置以下 Secrets：
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

## 📁 目录结构

```
.
├── archetypes/          # 内容模板
├── assets/              # 需要处理的资源
├── content/             # 网站内容
│   ├── posts/          # 图文文章
│   ├── live/           # 直播预告
│   └── about/          # 关于页面
├── data/                # 数据文件
├── layouts/             # HTML模板
├── static/              # 静态文件
│   ├── images/         # 图片
│   └── admin/          # CMS后台
├── themes/              # 主题
│   └── PaperMod/       # PaperMod主题
├── hugo.toml           # 站点配置
└── vercel.json         # Vercel配置
```

## 🛠️ CMS 内容管理

访问 `/admin` 路径可以使用 Decap CMS 可视化编辑内容。

### 配置 CMS

1. 在 GitHub 上创建 OAuth App
2. 配置回调地址：`https://yourdomain.com/admin/`
3. 更新 `static/admin/config.yml` 中的 repo 配置

## 📄 许可证

MIT License

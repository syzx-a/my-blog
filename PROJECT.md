# Hugo 自媒体网站 - 项目说明

## 📁 项目结构

```
website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── archetypes/                  # 内容模板
├── assets/                      # 需要处理的资源
├── content/                     # 网站内容
│   ├── posts/                  # 图文文章
│   │   ├── 2024-01-01-welcome.md
│   │   ├── 2024-01-15-dali-trip.md
│   │   └── 2024-02-01-vlog-tips.md
│   ├── live/                   # 直播预告
│   │   ├── 2024-02-09-dali-live.md
│   │   └── 2024-01-20-yunnan-guide.md
│   └── about/
│       └── _index.md           # 关于页面
├── data/                        # 数据文件
├── layouts/                     # HTML模板
│   ├── partials/               # 可复用组件
│   │   ├── breadcrumbs.html    # 面包屑导航
│   │   └── comments.html       # Giscus评论
│   ├── shortcodes/             # 短代码
│   │   ├── bilibili.html       # B站视频嵌入
│   │   ├── youtube.html        # YouTube视频嵌入
│   │   ├── douyin.html         # 抖音视频嵌入
│   │   ├── gallery.html        # 图片画廊
│   │   ├── notice.html         # 提示框
│   │   └── details.html        # 折叠内容
│   ├── posts/                  # 文章相关模板
│   │   ├── list.html           # 文章列表页
│   │   └── single.html         # 文章详情页
│   └── live/                   # 直播相关模板
│       ├── list.html           # 直播列表页
│       └── single.html         # 直播详情页
├── static/                      # 静态文件
│   ├── admin/                  # Decap CMS 后台
│   │   ├── config.yml          # CMS配置
│   │   ├── index.html          # CMS入口
│   │   └── preview.css         # 预览样式
│   └── images/                 # 图片资源
│       ├── uploads/            # 上传目录
│       ├── posts/              # 文章配图
│       ├── live/               # 直播封面
│       └── README.md           # 图片说明
├── themes/                      # 主题
│   └── PaperMod/               # PaperMod主题
│       └── go.mod
├── .gitignore                   # Git忽略文件
├── hugo.toml                    # Hugo站点配置
├── package.json                 # Node配置
├── README.md                    # 项目说明
└── vercel.json                  # Vercel部署配置
```

---

## 🚀 快速开始

### 1. 克隆和初始化

```bash
# 克隆仓库
git clone https://github.com/yourusername/your-repo.git
cd website

# 初始化子模块（主题）
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod

# 或者使用 go modules
echo "theme = 'github.com/adityatelange/hugo-PaperMod'" >> hugo.toml
```

### 2. 安装 Hugo

```bash
# macOS
brew install hugo

# Windows (使用 chocolatey)
choco install hugo-extended

# Windows (使用 scoop)
scoop install hugo-extended

# Linux
sudo snap install hugo
```

### 3. 本地开发

```bash
# 启动开发服务器
hugo server -D

# 访问 http://localhost:1313
```

### 4. 构建

```bash
# 生产构建（输出到 public/ 目录）
hugo --minify
```

---

## 📝 内容管理

### 添加图文文章

```bash
# 使用 Hugo 命令创建
hugo new content posts/my-article.md
```

或者直接创建文件 `content/posts/YYYY-MM-DD-title.md`：

```markdown
---
title: "文章标题"
date: 2024-01-01T10:00:00+08:00
draft: false
cover: "/images/posts/cover.jpg"
tags: ["标签1", "标签2"]
categories: ["分类"]
description: "文章摘要"
---

文章内容，支持 Markdown 语法。

## 二级标题

### 嵌入视频

# B站视频
{{</* bilibili BV1xx411c7mD */>}}

# YouTube视频  
{{</* youtube dQw4w9WgXcQ */>}}

# 图片画廊
{{</* gallery */>}}
![描述1](/images/1.jpg)
![描述2](/images/2.jpg)
{{</* /gallery */>}}

# 提示框
{{</* notice tip */>}}
这是一个小技巧！
{{</* /notice */>}}
```

### 添加直播预告

创建文件 `content/live/YYYY-MM-DD-title.md`：

```markdown
---
title: "直播标题"
livetime: 2024-02-09T20:00:00+08:00  # 直播开始时间
date: 2024-02-05T10:00:00+08:00      # 发布日期
platform: "B站"                      # 直播平台
link: "https://live.bilibili.com/yourroomid"  # 直播间链接
cover: "/images/live/cover.jpg"      # 直播封面
description: "直播简介"              # 简短描述
---

直播详细内容介绍...
```

---

## 🎨 自定义配置

### 修改网站信息

编辑 `hugo.toml`：

```toml
baseURL = 'https://yourdomain.com'
title = '博主名字'

[params]
  author = '博主名字'
  description = '网站描述'
```

### 修改社交链接

```toml
[[params.socialIcons]]
  name = 'bilibili'
  url = 'https://space.bilibili.com/yourid'

[[params.socialIcons]]
  name = 'tiktok'
  url = 'https://www.douyin.com/user/yourid'
```

### 配置 Giscus 评论

1. 访问 https://giscus.app/
2. 选择你的 GitHub 仓库
3. 复制配置参数到 `hugo.toml`：

```toml
[params.giscus]
  repo = 'yourusername/your-repo'
  repoId = 'your-repo-id'
  category = 'Announcements'
  categoryId = 'your-category-id'
```

---

## 🚀 部署

### 方式1: GitHub Actions 自动部署（推荐）

1. 在 Vercel 创建项目并获取：
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

2. 在 GitHub 仓库设置中添加 Secrets

3. 推送到 main 分支自动部署

### 方式2: 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

---

## 🛠️ 使用 Decap CMS

访问 `https://yourdomain.com/admin` 使用可视化编辑器。

### 配置 GitHub OAuth

1. 进入 GitHub Settings → Developer settings → OAuth Apps
2. 创建新的 OAuth App：
   - Application name: 你的博客名
   - Homepage URL: https://yourdomain.com
   - Authorization callback URL: https://yourdomain.com/admin/
3. 获取 Client ID 和 Client Secret
4. 配置到 Netlify Identity 或使用其他身份提供商

---

## 📦 短代码使用

### B站视频
```markdown
{{</* bilibili BV1xx411c7mD */>}}
{{</* bilibili BV1xx411c7mD 2 */>}}  # 从第2页开始
```

### YouTube视频
```markdown
{{</* youtube dQw4w9WgXcQ */>}}
```

### 图片画廊
```markdown
{{</* gallery */>}}
![图1](/images/1.jpg)
![图2](/images/2.jpg)
{{</* /gallery */>}}
```

### 提示框
```markdown
{{</* notice info */>}}信息提示{{</* /notice */>}}
{{</* notice warning */>}}警告提示{{</* /notice */>}}
{{</* notice tip */>}}技巧提示{{</* /notice */>}}
{{</* notice danger */>}}危险提示{{</* /notice */>}}
```

### 折叠内容
```markdown
{{</* details "点击展开详情" */>}}
隐藏的内容...
{{</* /details */>}}
```

---

## 📊 项目统计

- **文件数量**: 29个
- **目录数量**: 16个
- **配置复杂度**: 中等
- **部署难度**: 简单（自动部署）

---

## 🔗 相关链接

- [Hugo 官方文档](https://gohugo.io/documentation/)
- [PaperMod 主题文档](https://github.com/adityatelange/hugo-PaperMod/wiki)
- [Decap CMS 文档](https://decapcms.org/docs/)
- [Giscus 评论系统](https://giscus.app/)

---

*创建于: 2024年*  
*适用于: Hugo v0.120+ + PaperMod主题*

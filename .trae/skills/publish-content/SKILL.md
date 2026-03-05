---
name: "publish-content"
description: "Publish articles to Hugo website and push to GitHub for Vercel deployment. Invoke when user wants to publish new content or update website."
---

# 网站内容发布流程

将文章发布到 Hugo 静态网站并推送到 GitHub 触发 Vercel 自动部署。

## 项目结构

```
d:\00专业库\个人网站\
├── website/                    # Hugo 网站项目（Git 仓库）
│   ├── content/
│   │   ├── posts/              # 博客文章目录
│   │   ├── wisdom/             # 儒释道智慧
│   │   └── philosophy/         # 哲学思考
│   └── hugo.toml
├── 03-内容运营/
│   └── 05-内容更新/             # 待发布文章存放位置
└── .trae/skills/publish-content/
```

## 发布流程

### 1. 读取待发布文章

从 `03-内容运营/05-内容更新/` 目录读取 Markdown 文章。

### 2. 创建 Hugo 格式文章

将文章添加到 `website/content/posts/` 目录，文件命名格式：
```
YYYY-MM-DD-article-slug.md
```

### 3. 添加 Frontmatter

每篇文章必须包含 Hugo frontmatter：

```yaml
---
title: "文章标题"
date: 2026-03-05T00:00:00+08:00
draft: false
tags: ["标签1", "标签2"]
categories: ["分类"]
description: "文章摘要"
showToc: true
---
```

### 4. Git 提交与推送

```bash
cd website
git add content/posts/新文章.md
git commit -m "new-article"
git push origin main
```

### 5. 自动部署

推送到 GitHub 后，Vercel 会自动检测并部署更新。

网站地址：https://syzx.space

## 注意事项

- 文章内容使用中文
- 使用中文标点符号
- 文件名使用英文或拼音
- `draft: false` 才会发布
- 推送后等待 1-2 分钟部署完成

## 常用命令

| 操作 | 命令 |
|------|------|
| 本地预览 | `cd website; hugo server -D` |
| 构建网站 | `cd website; hugo --gc --minify` |
| 查看状态 | `cd website; git status` |
| 查看日志 | `cd website; git log --oneline -5` |

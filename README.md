# IELTS 听力互动课件（GitHub Pages 版）

这是可直接部署到 GitHub Pages 的完整源码包，包含页面源码、题目图片、音频文件和自动部署工作流。

## 部署

1. 新建一个 GitHub 仓库。
2. 将本压缩包解压后的全部内容上传到仓库根目录，并提交到 `main` 分支。
3. 打开仓库的 **Settings → Pages**，在 **Build and deployment** 中将 **Source** 设为 **GitHub Actions**。
4. 等待仓库 **Actions** 页面中的 `Deploy to GitHub Pages` 工作流完成。

发布后的网址通常为：

`https://你的GitHub用户名.github.io/仓库名/`

## 本地预览

需要 Node.js 22 或兼容版本：

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

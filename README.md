# IELTS互动课件 Q1–Q10

这是可直接部署到 GitHub Pages 的完整静态网站项目。

## 自动部署

1. 将本项目的全部文件上传到仓库 `hcarrot111-png/-` 的 `main` 分支根目录。
2. 打开仓库的 **Settings → Pages**。
3. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
4. 打开仓库的 **Actions** 页面，等待 `Deploy to GitHub Pages` 运行成功。
5. 网站地址为：`https://hcarrot111-png.github.io/-/`

## 本地检查

```bash
npm install
npm run dev
```

正式构建：

```bash
npm run build
```

`dist/` 是构建产物，不需要手动提交；GitHub Actions 会自动生成并发布。

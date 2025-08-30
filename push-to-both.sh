#!/bin/bash

# 推送脚本：同时推送到阿里云和GitHub
echo "🚀 开始推送代码..."

# 推送到阿里云（主要仓库）
echo "📤 推送到阿里云代码库..."
git push origin yanchi

# 推送到GitHub（备份）
echo "📤 推送到GitHub（备份）..."
git push github yanchi

echo "✅ 推送完成！"
echo "📊 阿里云：https://codeup.aliyun.com/5edbc121d1d1abe63b55f1c7/ai_onsite.git"
echo "📊 GitHub：https://github.com/colorpool/AI_Onsite.git"

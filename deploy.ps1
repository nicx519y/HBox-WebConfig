

# 定义源目录和目标目录
$source = "E:/Works/hbox-webconfig/"
$destination = "root@81.70.40.123:/root/hbox-webconfig"
$excludeFiles = @(".\.dist", ".\.git", ".\.vscode", ".\.next", ".\.vercel", ".\node_modules")

# 获取所有需要复制的文件
$filesToCopy = Get-ChildItem -Path $source -Recurse | Where-Object {
    $excludeFiles -notcontains $_.Name
}

# 创建临时目录
$tempDir = New-Item -ItemType Directory -Path "$env:TEMP\tempCopyDir"

# 复制需要的文件到临时目录
foreach ($file in $filesToCopy) {
    $relativePath = $file.FullName.Substring($source.Length)
    $destinationPath = Join-Path -Path $tempDir.FullName -ChildPath $relativePath
    $destinationDir = Split-Path -Path $destinationPath -Parent
    if (-not (Test-Path -Path $destinationDir)) {
        New-Item -ItemType Directory -Path $destinationDir -Force
    }
    Copy-Item -Path $file.FullName -Destination $destinationPath
}

# 使用 scp 命令将临时目录中的文件复制到远程服务器
$scpCommand = "scp -r $($tempDir.FullName)/* $destination"
Invoke-Expression $scpCommand

# 删除临时目录
Remove-Item -Recurse -Force -Path $tempDir.FullName
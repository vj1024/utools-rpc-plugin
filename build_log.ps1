# 获取当前时间并格式化为 YYYY-MM-dd HH:mm:ss
$currentDateTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
(Get-Content dist\\log.js) -replace 'YYYY-mm-dd HH:MM:SS', $currentDateTime | Set-Content dist\\log.js

# utools-rpc-plugin

使用任意开发语言，通过RPC实现、管理你的utools插件. 
Use any development language to implement and manage your utools plug-ins through RPC.

## Windows系统编译、打包

- npm install
- npm run build

> 使用客户端相同的系统打包，否则有问题
> utools开发者工具打包时，选择整个项目，包含node_modules

## 配置

- 通过环境变量 `UTOOLS_RPC_SERVER` 设置服务端接口地址
- 日志打印在Home目录，文件名：utools-rpc-plugin.log

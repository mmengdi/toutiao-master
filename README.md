# toutiao-master

这个模板旨在帮助你开始使用Vue 3和Vite进行开发。

## 推荐的IDE设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（同时禁用Vetur）。

## 在TS中为`.vue`导入提供类型支持

默认情况下，TypeScript无法处理`.vue`导入的类型信息，所以我们用`vue-tsc`替换`tsc` CLI来进行类型检查。在编辑器中，我们需要[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)来使TypeScript语言服务能够识别`.vue`的类型。

## 自定义配置

请参阅[Vite配置参考](https://vitejs.dev/config/)。

## 项目设置

```sh
npm install

## 开发环境下的编译和热重载

```sh
npm run dev

## 生产环境下进行类型检查、编译和压缩

```sh
npm run build

## 使用ESLint进行代码 lint

```sh
npm run lint
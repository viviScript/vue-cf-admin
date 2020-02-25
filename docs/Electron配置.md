# [![Electron Logo](https://electronjs.org/images/electron-logo.svg)](https://electronjs.org)

## Electron 打包配置文档

 > 在安装 electron 依赖时, 建议使用 yarn 代替 npm, electron-vue 官方也推荐 yarn 作为软件包管理器, 因为它可以更好地处理依赖关系, 并可以使用 yarn clean 帮助减少最后构建文件的大小

### Vue Build Setup

 ``` bash
  # Build a new project
  vue init webpack vue-electron

  # Entry into the project directory
  cd vue-electron

  # install dependencies
  yarn install

  # serve with hot reload at localhost:8080
  yarn run dev

  # build for production with minification
  yarn run build
 ```

### Add electron dependence

 ``` bash
 yarn add electron

 # 这个是打成exe文件的插件, 之后要用, 提前下载好
 yarn add electron-packager
 ```

### Packing steps

- >   在vue的build文件夹中，新建 electron.js

   ( 注意 loadURL 中 index 页面的路径 )

### electron.js ↓

  ```javascript
  /**
 * Created by j_bleach on 2017/11/12.
 */
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600,  webPreferences: {
    nativeWindowOpen: true,
    nodeIntegration: false
  }})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win_event(mainWindow)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function win_event(win){
  win.webContents.on( 'new-window', function (event,url,fname,disposition,options) {
    let childWindow
    childWindow = new BrowserWindow({
      height:600,
      width:600,
      webPreferences: {nodeIntegration: false}
    });
    win_event(childWindow)
    childWindow.loadURL(url)
    event.preventDefault()
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
       app.quit()
    }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
       createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
  ```

  ***

- > package.json文件中增加一条指令，用来启动electron

  ```javascript
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js",
    "electron_dev": "npm run build && electron build/electron.js"
  }
  ```

  运行 yarn run electron_dev 即可打开桌面应用
  ***
- > 在dist文件夹下增加 electron.js 和 package.json

     ( 记得把 electron.js 中 index.html 的路径做修改 )

#### package.json 中 main 应该指向从 dist 文件夹中的 electron.js ↓

  ```javascript
  {
  "name": "vue-demo-admin",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "main": "electron.js",// 注意此处
  "private": true
}
  ```

  ***

- > 为之前下载好的 electron-packager, 增加一条启动命令

  ```javascript
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js",
    "electron_dev": "npm run build && electron build/electron.js",
    "electron_build": "electron-packager ./dist/ --platform=win32 --arch=x64 --icon=./src/assets/favicon.ico --overwrite"
  }
  ```

  - 关于electron-packager的配置, 简单介绍一下

  ```javascript
  electron-packager <sourcedir> <appname> –platform=<platform> –arch=<arch> [optional flags…]
  ```

  sourcedir 资源路径，在本例中既是./dist/

  appname 打包出的exe名称

  platform 平台名称( windows是win32 )

后边的配置项都是选填, 可以设置二进制打包等, 默认是没有这些的, 这里只选填了exe的图标
  ***

- > yarn run electron_build

  会得到一个文件夹, 这个就是你的打包文件, 双击其中的*.exe文件, 就可以打开你的桌面应用啦

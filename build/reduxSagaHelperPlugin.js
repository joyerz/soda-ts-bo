const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const colors = require('colors')
const os = require('os')

const folder = path.resolve(__dirname, '../src/pages')
const reducersConnectFile = path.resolve(__dirname, '../src/routes/index.tsx')

let watching = false
const cache = {
  importRedux: null,
  combineRedux: null,
  importSaga: null,
  combineSaga: null,
}

function reduxSagaPlguin() {}

reduxSagaPlguin.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('emit', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
    // console.log('This is an example plugin!!!'.red)
    // convertingFiles()
    addWatcher()
    // 功能完成后调用 webpack 提供的回调。
    callback()
  })
}

reduxSagaPlguin.prototype.convert = convertingFiles

function addWatcher() {
  if (!watching) {
    chokidar
      .watch(folder, {
        ignored: /\.(jsx|scss|css)$/,
      })
      .on('all', (event, path) => {
        convertingFiles()
      })
    watching = true
  }
}

function readDir(folder) {
  const receivedFiles = []
  const files = fs.readdirSync(folder)
  files.forEach(function(filename) {
    const filePath = path.join(folder, filename)
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      const f = readDir(filePath)
      receivedFiles.push(...f)
    }
    else {
      receivedFiles.push(filePath)
    }
  })
  return receivedFiles
}

function convertingFiles() {
  const files = readDir(folder)
  const reduxFiles = files.filter(file => /redux\.ts$/.test(file))
  convertRedux(reduxFiles)
}

function convertRedux(files) {
  let importRedux = ''

  // handle redux files
  files.forEach((file) => {
    // const p = file.replace(folder, 'pages').replace('.js', '').replace(/\\/ig, '/') // ios系统为file.replace(folder, 'pages').replace('.js', '')
    const p = os.type().toLowerCase().indexOf('windows') === -1 ? file.replace(folder, 'pages').replace('.js', '') : file.replace(folder, 'pages').replace('.js', '').replace(/\\/ig, '/')

    importRedux += `import '@${p}'\n`
  })

  if (cache.importRedux !== importRedux) {
    // console.log(importRedux)
    console.log('start combine redux files...'.rainbow)
    const replaceTo = '// {{__IMPORT_REDUX_START__}}\r\n' + importRedux + '\r\n// {{__IMPORT_REDUX_END__}}'
    const reg = /\/\/ {{__IMPORT_REDUX_START__}}([\w\W]*)?\/\/ {{__IMPORT_REDUX_END__}}/ig

    let string = fs.readFileSync(reducersConnectFile, 'utf-8')
    string = string.replace(reg, replaceTo)
    fs.writeFileSync(reducersConnectFile, string, 'utf8')
    console.log('combine redux finish'.rainbow)
    cache.importRedux = importRedux
  }
}

/*
// {{__IMPORT_REDUX_START__}}
import '../pages/cooperationCompanyManagement/cityList/redux'
// {{__IMPORT_REDUX_END__}}
*/


module.exports = reduxSagaPlguin

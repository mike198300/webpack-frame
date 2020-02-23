process.env.NODE_ENV = 'production'

const ora = require('ora')
const chalk = require('chalk')
const shell = require('shelljs')
const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const config = require('../config')

let spinner = ora('building for production...')
spinner.start()

let assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)  //静态文件路径
// 删除原有静态目录，并Reconstruct
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
// 拷贝static文件夹下的内容
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false

// 执行webpack
webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))
});

var WebpackOnBuildPlugin = require('on-build-webpack')

var stageEnv = require('./base.js').stage;

var rootPath = process.cwd()

var config = require('./webpack.base.config.js')
config = Object.assign({}, config)
config.output.publicPath = stageEnv.publicPath;

config.plugins = config.plugins.concat([

    new WebpackOnBuildPlugin(function (stats) {
        const exec = require('child_process').exec
        let scpcommand = `rsync -rav -e ssh dist/* tiger@10.11.40.73:/opt/tiger/motor_site/webroot/` + stageEnv.stagePath;
        exec(scpcommand, (error, stdout, stderr) => {
            console.log('Finish!')
            if (error) {
                console.error(`exec error: ${error}`)
                return
            }
        })
    }),

])

module.exports = config

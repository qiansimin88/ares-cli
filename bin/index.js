#! /usr/bin/env node
const cmder = require( 'commander' )
const iqr = require( 'inquirer' )
const ora = require( 'ora' )
const { resolve } = require( 'path' )
const chalk = require( 'chalk' )
const downGit = require( 'download-git-repo' )
const fs = require( 'fs-extra' )
const w = chalk.red.bold
const spinner = ora(  chalk.green.bold(' downloading template!! '))


function std (code, str) {
    console.error(w(str || 'gg'))
    spinner.stop()
    process.exit(code)
};

cmder.version( '1.0.0', '-v,  --version' )

    .name(' ares-cli ')
    .usage('<template-type> <template-name>')  //示例

    .option( '-h, --help', '尽情期待吧' )

    .command( 'init <type> <name>' )
    .description( '创建vue|react 前端模板' )
    .action( ( type, name ) => {
        // 必须指定是vue 或者 react项目
        if ( !/^(vue)|(react)$/i.test( type ) )  {
            std(1, ' init 后必须指定vue 或者 react 命令 ')
        }

        iqr.prompt([
            {
                type: 'confirm',
                // 项目类型字段
                name: 'type',
                message: `您确定要创造一个${ type }类型的文件模板吗?`
            }
        ]).then( all => {
            if ( all.type ) {
                spinner.start();
                donwGitRes( name );
            }
        })
})

cmder.parse( process.argv )


// 下载远程文件库
const donwGitRes = ( templateName = 'templateName' ) => {
    downGit('github:qiansimin88/vue-to-work', resolve( __dirname, '../template' ), err => {
        if ( err ) {
            std(1, '远程模板仓库出现了错误' + err )
        }else {
            fs.copy( resolve( __dirname, '../template' ), resolve('./', templateName ), { clobber : true }, ( err ) => {
                if ( err ) {
                    std(1, '本地复制模板出现了错误' + err )
                }else {
                    spinner.stop()
                }
            })
        }
    })
}



var fs = require('fs');
var charset = "utf-8";

/**
 * 转换本机路径为Unix风格路径。
 */
function escapePath(path) {
    if (!path)
        return "";
    return path.split("\\").join("/");
}

/**
 * 是否是文件夹
 * @param path
 * @returns {*}
 */
function isDirectory(path){
    path = escapePath(path);
    try{
        var stat = fs.statSync(path);
    }
    catch(e){
        return false;
    }
    return stat.isDirectory();
}

/**
 * 保存数据到指定文件
 * @param path 文件完整路径名
 * @param data 要保存的数据
 */
function save(path, data){
    if(exists(path)) {
        remove(path);
    }
    path = escapePath(path);
    fs.writeFileSync(path, data, charset);
}
/**
 * 删除文件或目录
 * @param path 要删除的文件源路径
 */
function remove(path) {
    path = escapePath(path);
    try{
        fs.lstatSync(path).isDirectory()
            ? rmdir(path)
            : fs.unlinkSync(path)
    }
    catch (e){
    }
}


/**
 * 指定路径的文件或文件夹是否存在
 */
function exists(path) {
    path = escapePath(path);
    return fs.existsSync(path);
}

exports.save = save;
exports.isDirectory = isDirectory;
exports.escapePath = escapePath;
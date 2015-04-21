var fs = require('fs');
var SVN = require("node.svn");
var EventEmitter = require('events').EventEmitter;
var fileUtils = require("./libs/fileUtils.js");
var fileFilter = require("./createResourceVersionFilter.js");

var config = {
    "cwd" : process.cwd()+"/../",
    "username" : "yangsong",
    "password" : "yang1234"
};

var exportFile = config.cwd + "resource/resource_version.json";
var singleExportNum = 70;

var svn = new SVN(config);
var ee = new EventEmitter();

var allFiles = [];
var obj = {};
var dirNum = 0;
var dirNum_complate = 0;
function foreachAllFiles(root) {
    dirNum++;
    fs.readdir(root, function(err, files){
        if(err || files.length == 0){
            ee.emit("fileForeachComplate");
            return;
        }

        for(var i = 0, len = files.length; i<len; i++){
            var file = files[i];
            if(file.indexOf(".DS_Store") != -1){
                continue;
            }

            var filePath = root + "/" + file;
            var exportFilePath = filePath.replace(config.cwd, "");

            if(fileFilter.filterConfig.indexOf(exportFilePath) == -1){
                if(!fileUtils.isDirectory(filePath)) {
                    allFiles.push(filePath);
                }else{
                    foreachAllFiles(filePath);
                }
            }

            if(i == len-1){
                ee.emit("fileForeachComplate");
            }
        }
    });
}

function getFileVersion(){
    var dealFiles = allFiles.splice(0, singleExportNum);
    var fileNum = dealFiles.length;
    var fileNumComplate = 0;
    dealFiles.forEach(function(filePath){
        svn.info(filePath, function (err, info) {
            if(err == null){
                var path = filePath.replace(config.cwd, "");
                console.log(path, info.lastchangedrev);
                obj[path] = info.lastchangedrev;
            }else{
                //console.log(err);
            }
            fileNumComplate++;
            if(fileNumComplate >= fileNum){
                if(allFiles.length == 0){
                    saveConfigFile();
                }else{
                    setTimeout(getFileVersion, 100);
                }
            }
        });
    });
}

function saveConfigFile(){
    fileUtils.save(exportFile, JSON.stringify(obj));
    console.log("生成成功：", exportFile);
}

ee.on("fileForeachComplate", function() {
    dirNum_complate++;
    if(dirNum_complate >= dirNum){
        getFileVersion();
    }
});

foreachAllFiles(config.cwd + "resource");

console.log("生成中，请稍等。。。");




var fs = require('fs');
var callfile = require('child_process');

var textureMerger = '/Applications/TextureMerger.app/Contents/MacOS/TextureMerger';
var sourcepath = '/Users/yangsong/Downloads/九阴H5手游资源/主角/古墓套装改2render';
var exportPath = sourcepath + '/export'
var files = fs.readdirSync(sourcepath);

var dealFiles = {};
files.forEach(function (file) {
    var filePath = sourcepath + '/' + file;
    var stat = fs.statSync(filePath);
    if (!stat.isDirectory()) {
        return;
    }

    var actionName;
    if (file.indexOf('乘骑待机') != -1) {
        actionName = 'ride_stand';
    } else if (file.indexOf('乘骑跑步') != -1) {
        actionName = 'ride_move';
    } else if (file.indexOf('面板待机') != -1) {
        actionName = 'ui_stand';
    } else if (file.indexOf('面板展现') != -1) {
        actionName = 'ui_play';
    } else if (file.indexOf('打坐') != -1) {
        actionName = 'situp';
    } else if (file.indexOf('待机') != -1) {
        actionName = 'stand';
    } else if (file.indexOf('二段跳') != -1) {
        actionName = 'jump2';
    } else if (file.indexOf('攻击1') != -1) {
        actionName = 'attack1';
    } else if (file.indexOf('攻击2') != -1) {
        actionName = 'attack2';
    } else if (file.indexOf('攻击3') != -1) {
        actionName = 'attack3';
    } else if (file.indexOf('攻击4') != -1) {
        actionName = 'attack4';
    } else if (file.indexOf('跑步') != -1) {
        actionName = 'move';
    } else if (file.indexOf('死亡') != -1) {
        actionName = 'die';
    } else if (file.indexOf('跳跃') != -1) {
        actionName = 'jump';
    } else if (file.indexOf('蓄力') != -1) {
        actionName = 'ready';
    }
    if (actionName) {
        for (var i = 0; i <= 4; i++) {
            dealFiles[actionName + '_' + i] = filePath;
        }
    }
})

function clearFolder() {
    if (fs.existsSync(exportPath)) {
        files = fs.readdirSync(exportPath);
        files.forEach(function (file, index) {
            var path = exportPath + '/' + file;
            fs.unlinkSync(path);
        });
    }
}

function exportTexture() {
    var keys = Object.keys(dealFiles);
    if (keys.length) {
        var action = keys.shift();
        var filePath = dealFiles[action];
        exportTexture_oneAction(action, filePath, exportTexture);
        delete dealFiles[action];
    }
}

function exportTexture_oneAction(actionName, filePath, callback) {
    console.log(actionName, filePath);
    callfile.execFile(textureMerger,
        [
            '-p', filePath,
            '-o', exportPath + '/' + actionName + '.json',
            '-e', '/' + actionName.split('_')[1] + '.*.(jpg|png)'
        ],
        null,
        function (err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
            callback();
        }
    );
}

clearFolder();
exportTexture();


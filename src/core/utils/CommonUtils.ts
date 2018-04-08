/**
 * Created by yangsong on 15-1-12.
 * 通用工具类
 */
class CommonUtils extends BaseClass {
    public constructor() {
        super();
    }

    /**
     * 给字体添加描边
     * @param lable      文字
     * @param color      表示文本的描边颜色
     * @param width      描边宽度。
     */
    public addLableStrokeColor(lable: eui.Label, color: any, width: any): void {
        lable.strokeColor = color;
        lable.stroke = width;
    }

    /**
     * 深度复制
     * @param _data
     */
    public copyDataHandler(obj: any): any {
        var newObj;
        if (obj instanceof Array) {
            newObj = [];
        }
        else if (obj instanceof Object) {
            newObj = {};
        }
        else {
            return obj;
        }
        var keys = Object.keys(obj);
        for (var i: number = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            newObj[key] = this.copyDataHandler(obj[key]);
        }
        return newObj;
    }

    /**
     * 锁屏
     */
    public lock(): void {
        var stage: egret.Stage = App.StageUtils.getStage();
        stage.$children.forEach(child => {
            if (child instanceof egret.DisplayObjectContainer) {
                child.touchEnabled = child.touchChildren = false;
            }
        })
    }

    /**
     * 解屏
     */
    public unlock(): void {
        var stage: egret.Stage = App.StageUtils.getStage();
        stage.$children.forEach(child => {
            if (child instanceof egret.DisplayObjectContainer) {
                child.touchEnabled = child.touchChildren = true;
            }
        })
    }

    /**
     * 万字的显示
     * @param label
     * @param num
     */
    public labelIsOverLenght = function (label, num) {
        var str = null;
        if (num < 100000) {
            str = num;
        }
        else if (num < 1000000) {
            str = Math.floor(num / 1000 / 10).toString() + "万";
        }
        else {
            str = Math.floor(num / 10000).toString() + "万";
        }
        label.text = str;
    };

    /**
     * int64转number
     * @param obj
     * @returns {number}
     */
    public int64ToNumber(obj) {
        return parseInt(obj.toString());
    }
}

/**
 * Created by yangsong on 15-1-12.
 * 通用工具类
 */
class CommonUtils extends BaseClass{
    public constructor(){
        super();
    }

    /**
     * 给字体添加描边
     * @param lable      文字
     * @param color      表示文本的描边颜色
     * @param width      描边宽度。
     */
    public static  addLableStrokeColor(lable:egret.gui.Label, color:any, width:any):void {
        var tempLable:egret.gui.Label = lable;
        tempLable.strokeColor = color;
        tempLable.stroke = width;
    }

    /**
     * 深度复制
     * @param _data
     */
    public static copyDataHandler(obj:any):any {
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
        for(var i:number=0, len=keys.length; i<len; i++){
            var key = keys[i];
            newObj[key] = this.copyDataHandler(obj[key]);
        }
        return newObj;
    }

    /**
     * 锁屏
     */
    public static lock():void {
        var stage:egret.Stage = egret.MainContext.instance.stage;
        stage.touchEnabled = stage.touchChildren = false;
    }

    /**
     * 解屏
     */
    public static unlock():void {
        //todo key
        var stage:egret.Stage = egret.MainContext.instance.stage;
        stage.touchEnabled = stage.touchChildren = true;
    }


    /**
     * 万字的显示
     * @param label
     * @param num
     */
    public static labelIsOverLenght = function (label, num) {
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

}
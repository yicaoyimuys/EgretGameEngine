/**
 * Created by yangsong on 2014/12/3.
 * 各种效果工具类
 */
class EffectUtils extends BaseClass {
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(macIconShake("this.btnIcon", 100));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     */
    public macIconShake(obj: string, initY: number): string {
        //抖动频率[时间，移动距离]，可修改
        var arr: Array<any> = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];

        var str: string = "egret.Tween.get(" + obj + ")";
        for (var i: number = 0, len: number = arr.length; i < len; i++) {
            str += ".to({'y':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'y':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    }

    /**
     * 开始闪烁
     * @param obj
     */
    public startFlicker(obj: egret.DisplayObject, alphaTime: number): void {
        obj.alpha = 1;
        egret.Tween.get(obj).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj, alphaTime]);
    }

    /**
     * 停止闪烁
     * @param obj
     */
    public stopFlicker(obj: egret.DisplayObject): void {
        egret.Tween.removeTweens(obj);
    }

    /**
     * 开始上下抖动
     * @param obj
     */
    public startShake(obj: egret.DisplayObject, shakeTime: number, shakeHeight: number = 20): void {
        if (!obj["shakeStartY"]) {
            obj["shakeStartY"] = obj.y;
            obj["shakeEndY"] = obj.y + shakeHeight;
        }
        let startY: number = obj["shakeStartY"];
        let endY: number = obj["shakeEndY"];
        egret.Tween.get(obj).to({ "y": endY }, shakeTime).to({ "y": startY }, shakeTime).call(this.startShake, this, [obj, shakeTime]);
    }

    /**
     * 停止上下抖动
     * @param obj
     */
    public stopShake(obj: egret.DisplayObject): void {
        delete obj["shakeStartY"];
        delete obj["shakeEndY"];
        egret.Tween.removeTweens(obj);
    }

    /**
     * 设置显示对象“黑化”效果
     */
    public setDisplayObjectBlack(obj: egret.DisplayObject): void {
        //颜色矩阵数组
        let colorMatrix = [
            1, 0, 0, 0, -255,
            0, 1, 0, 0, -255,
            0, 0, 1, 0, -255,
            0, 0, 0, 1, 0
        ];
        let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    }

    /**
     * 设置显示对象“灰化”效果
     */
    public setDisplayObjectGray(obj: egret.DisplayObject): void {
        //颜色矩阵数组
        let colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    }
}

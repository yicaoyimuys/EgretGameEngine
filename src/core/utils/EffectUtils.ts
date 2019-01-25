/**
 * Created by yangsong on 2014/12/3.
 * 各种效果工具类
 */
class EffectUtils extends SingtonClass {
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
     */
    public macIconShake(obj: egret.DisplayObject, initY: number): void {
        //抖动频率[时间，移动距离]，可修改
        var arr: Array<any> = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];

        let tween = egret.Tween.get(obj);
        for (var i: number = 0, len: number = arr.length; i < len; i++) {
            tween.to({ y: initY - arr[i][0] }, arr[i][1]);
            tween.to({ y: initY }, arr[i][1]);
        }
    }

    /**
     * 开始放大缩小
     * @param obj
     */
    public startScale(obj: egret.DisplayObject, scaleTime: number): void {
        obj.scaleX = 1;
        obj.scaleY = 1;
        egret.Tween.get(obj)
            .to({ scaleX: 1.1, scaleY: 1.1 }, scaleTime)
            .to({ scaleX: 1.0, scaleY: 1.0 }, scaleTime)
            .to({ scaleX: 0.9, scaleY: 0.9 }, scaleTime)
            .to({ scaleX: 1.0, scaleY: 1.0 }, scaleTime)
            .call(this.startScale, this, [obj, scaleTime]);
    }

    /**
     * 停止放大缩小
     * @param obj
     */
    public stopScale(obj: egret.DisplayObject): void {
        egret.Tween.removeTweens(obj);
    }

    /**
     * 开始闪烁
     * @param obj
     */
    public startFlicker(obj: egret.DisplayObject, alphaTime: number, alpha_min: number = 0): void {
        obj.alpha = 1;
        egret.Tween.get(obj).to({ "alpha": alpha_min }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj, alphaTime]);
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
        if (!obj["shakeStartY"]) {
            return;
        }
        obj.y = obj["shakeStartY"];
        egret.Tween.removeTweens(obj);
        delete obj["shakeStartY"];
        delete obj["shakeEndY"];
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

    /**
     * 开始左右摇动
     * @param obj
     */
    public startWobble(obj: egret.DisplayObject, wobbleTime: number = 100, wobbleRotation: number = 20): void {
        egret.Tween.get(obj)
            .to({ rotation: wobbleRotation }, wobbleTime, egret.Ease.bounceInOut)
            .to({ rotation: -wobbleRotation }, wobbleTime, egret.Ease.bounceInOut)
            .to({ rotation: wobbleRotation }, wobbleTime, egret.Ease.bounceInOut)
            .call(this.startWobble, this, [obj, wobbleTime]);
    }

    /**
     * 停止左右摇动
     * @param obj
     */
    public stopWobble(obj: egret.DisplayObject): void {
        obj.rotation = 0;
        egret.Tween.removeTweens(obj);
    }

    /**
     * 开始发光闪烁
     * @param obj
     */
    public startFlash(obj: egret.DisplayObject, flashColor: number, flashTime: number): void {
        let glowFilter: egret.GlowFilter = obj["flashFilter"];
        if (!glowFilter) {
            let color: number = flashColor;        /// 光晕的颜色，十六进制，不包含透明度
            let alpha: number = 1;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
            let blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
            let blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            let strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
            let quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现

            glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality);
            obj.filters = [glowFilter];
            obj["flashFilter"] = glowFilter;
        }
        egret.Tween.get(glowFilter).to({ "alpha": 0 }, flashTime).to({ "alpha": 1 }, flashTime).call(this.startFlash, this, [obj, flashColor, flashTime]);
    }

    /**
     * 停止发光闪烁
     * @param obj
     */
    public stopFlash(obj: egret.DisplayObject): void {
        let glowFilter: egret.GlowFilter = obj["flashFilter"];
        if (glowFilter) {
            egret.Tween.removeTweens(glowFilter);
            obj.filters = null;
            delete obj["flashFilter"];
        }
    }
}

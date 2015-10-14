/**
 * Created by yangsong on 14-12-2.
 * 引导背景层，实现的是一个类似不规则遮罩的功能
 */
class GuideMaskBackgroud extends egret.Sprite {
    private _bgs:Array<egret.Shape>;
    private _stageWidth:number = 0;
    private _stageHeight:number = 0;
    private _deductRec:egret.Rectangle;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._bgs = new Array<egret.Shape>();

        this.touchEnabled = true;
    }

    /**
     * 初始化游戏宽高
     * @param stageWidth 宽
     * @param stageHeight 高
     */
    public init(stageWidth:number, stageHeight:number):void {
        this._stageWidth = stageWidth;
        this._stageHeight = stageHeight;
    }

    /**
     * Draw
     * @param deductRec 抠出矩形区域
     */
    public draw(deductRec:egret.Rectangle):void {
        this.cacheAsBitmap = false;
        this._deductRec = deductRec;

        this.removeAllChild();

        var minX:number = Math.max(deductRec.x, 0);
        var minY:number = Math.max(deductRec.y, 0);
        var maxX:number = Math.min(deductRec.x + deductRec.width, this._stageWidth);
        var maxY:number = Math.min(deductRec.y + deductRec.height, this._stageHeight);
        this.addBg(0, 0, this._stageWidth, minY);
        this.addBg(0, minY, minX, deductRec.height);
        this.addBg(maxX, minY, this._stageWidth - maxX, deductRec.height);
        this.addBg(0, maxY, this._stageWidth, this._stageHeight - maxY);

        this.width = this._stageWidth;
        this.height = this._stageHeight;
        this.cacheAsBitmap = true;
    }

    /**
     * 销毁
     */
    public destroy():void {
        this.removeChildren();
        this._bgs = [];
    }

    /**
     * 移除所有对象
     */
    private removeAllChild():void {
        while (this.numChildren) {
            var bg:egret.Shape = <egret.Shape>this.removeChildAt(0);
            this._bgs.push(bg);
        }
    }

    /**
     * 添加一个bg
     * @param $x 初始X
     * @param $y 初始Y
     * @param $w 宽
     * @param $h 高
     */
    private addBg($x:number, $y:number, $w:number, $h:number):void {
        var bg:egret.Shape;
        if (this._bgs.length) {
            bg = this._bgs.pop();
            bg.graphics.clear();
        } else {
            bg = new egret.Shape();
        }

        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect($x, $y, $w, $h);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    /**
     * 重写hitTest
     * 检测指定坐标是否在显示对象内
     * @method egret.DisplayObject#hitTest
     * @param x {number} 检测坐标的x轴
     * @param y {number} 检测坐标的y轴
     * @param ignoreTouchEnabled {boolean} 是否忽略TouchEnabled
     * @returns {*}
     */
    public hitTest(x:number, y:number, ignoreTouchEnabled?:boolean) {
        if (this._deductRec && this._deductRec.contains(x, y)) {
            return null;
        } else {
            return this;
        }
    }
}
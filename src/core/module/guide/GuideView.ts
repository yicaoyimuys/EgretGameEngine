/**
 * Created by yangsong on 14-12-2.
 * GuideView
 */
class GuideView extends egret.Sprite {
    private _bg:GuideMaskBackgroud;
    private _obj:egret.DisplayObject;
    private _data:any;
    private _objGlobalPoint:egret.Point;
    private _objRec:egret.Rectangle;
    private _maskPic:egret.Bitmap;
    private _textBgPic:egret.Bitmap;
    private _handPic:egret.Bitmap;
    private _txt:egret.TextField;

    /**
     * 构造函数
     */
    public constructor() {
        super();

        this._objRec = new egret.Rectangle();
        this._objGlobalPoint = new egret.Point();

        this._bg = new GuideMaskBackgroud();
        this.addChild(this._bg);

        this._maskPic = StarlingSwfUtils.createS9Image("s9_guide_mask");
        this.addChild(this._maskPic);

        this._textBgPic = StarlingSwfUtils.createS9Image("s9_guide_txt");
        AnchorUtil.setAnchorY(this._textBgPic, 1);
        this.addChild(this._textBgPic);

        this._handPic = StarlingSwfUtils.createImage("img_hand");
        AnchorUtil.setAnchorX(this._handPic, 0.5);
        this.addChild(this._handPic);

        this._txt = new egret.TextField();
        this._txt.size = 26;
        this._txt.textColor = 0x575757;
        this._txt.lineSpacing = 4;
        AnchorUtil.setAnchorY(this._txt, 0.5);
        this.addChild(this._txt);

        egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
    }

    /**
     * 屏幕大小改变时重置
     */
    private onResize():void {
        if (this.stage) {
            egret.setTimeout(this.refurbish, this, 500);
        }
    }

    /**
     * 刷新
     */
    private refurbish():void {
        this.setData(this._obj, this._data);
    }

    /**
     * 设置显示数据
     * @param obj
     * @param data
     */
    public setData(obj:egret.DisplayObject, data:any):void {
        if (obj == null) {
            return;
        }
        this._obj = obj;
        this._data = data;

        this._obj.localToGlobal(0, 0, this._objGlobalPoint);
        this._obj.getBounds(this._objRec);

        this._objGlobalPoint.x = Math.ceil(this._objGlobalPoint.x);
        this._objGlobalPoint.y = Math.ceil(this._objGlobalPoint.y);

        var tmpX:number = 15;
        var tmpy:number = 15;
        this._objRec.x = this._objGlobalPoint.x - tmpX;
        this._objRec.y = this._objGlobalPoint.y - tmpy;
        this._objRec.width += tmpX * 2;
        this._objRec.height += tmpy * 2;

        //不透明区域
        this._bg.init(egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
        this._bg.draw(this._objRec);

        //透明区域
        this._maskPic.cacheAsBitmap = false;
        this._maskPic.x = this._objRec.x;
        this._maskPic.y = this._objRec.y;
        this._maskPic.width = this._objRec.width;
        this._maskPic.height = this._objRec.height;
        this._maskPic.cacheAsBitmap = true;

        //handDir  1:下面 2:上面
        if (this._data.handDir == 1) {
            this._handPic.scaleY = 1;
            this._handPic.y = this._objRec.y + this._objRec.height - 20;
        } else if (this._data.handDir == 2) {
            this._handPic.scaleY = -1;
            this._handPic.y = this._objRec.y + 20;
        }
        this._handPic.x = this._objRec.x + this._objRec.width * 0.5;


        //文字显示
        this._txt.width = NaN;
        this._txt.height = NaN;
        this._txt.text = this._data.txt;
        if (this._txt.width > 320) {
            this._txt.text = "";
            this._txt.width = 320;
            this._txt.text = this._data.txt;
        }

        var temp:number = 15;
        this._textBgPic.cacheAsBitmap = false;
        this._textBgPic.width = this._txt.width + temp * 2 + 35;
        this._textBgPic.height = 114;

        //txtdir  箭头指向: 1:背景左箭头下 2:背景左箭头上 3:背景右箭头下 4:背景右箭头上
        if (this._data.txtdir == 1) {
            this._textBgPic.scaleX = -1;
            this._textBgPic.scaleY = 1;
            this._textBgPic.x = this._objRec.x;
        } else if (this._data.txtdir == 2) {
            this._textBgPic.scaleX = -1;
            this._textBgPic.scaleY = -1;
            this._textBgPic.x = this._objRec.x;
        } else if (this._data.txtdir == 3) {
            this._textBgPic.scaleX = 1;
            this._textBgPic.scaleY = 1;
            this._textBgPic.x = this._objRec.x + this._objRec.width;
        } else if (this._data.txtdir == 4) {
            this._textBgPic.scaleX = 1;
            this._textBgPic.scaleY = -1;
            this._textBgPic.x = this._objRec.x + this._objRec.width;
        }
        this.checkTextBgX();

        this._textBgPic.y = this._objRec.y + this._objRec.height * 0.5;
        this._txt.x = this._textBgPic.x - (this._textBgPic.scaleX == -1 ? this._textBgPic.width : -35) + temp;
        this._txt.y = this._textBgPic.y - this._textBgPic.scaleY * this._textBgPic.height * 0.5;
        this._textBgPic.cacheAsBitmap = true;
    }

    /**
     * 检测文本提示框是否出了边界
     */
    private checkTextBgX():void {
        if (this._textBgPic.scaleX == 1) {
            var stageW:number = egret.MainContext.instance.stage.stageWidth;
            if (this._textBgPic.x + this._textBgPic.width > stageW) {
                this._textBgPic.x = stageW - this._textBgPic.width;
            }
        } else if (this._textBgPic.scaleX == -1) {
            if (this._textBgPic.x - this._textBgPic.width < 0) {
                this._textBgPic.x = this._textBgPic.width;
            }
        }
    }
}

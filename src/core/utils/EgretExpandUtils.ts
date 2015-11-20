/**
 * Created by yangsong on 15-1-23.
 * 引擎扩展类
 */
class EgretExpandUtils extends BaseClass {
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 初始化函数
     */
    public init():void {
        this.setFrameRate();
        AnchorUtil.init();
    }

    private setFrameRate():void {
        if (!App.DeviceUtils.IsHtml5) {
            return;
        }

        egret.HTML5DeviceContext.prototype.setFrameRate = function (frameRate) {
            if ((60 % frameRate) == 0) {
                egret.HTML5DeviceContext["countTime"] = 60 / frameRate - 1;
            }
            else {
                egret.HTML5DeviceContext["countTime"] = 0;
                egret.HTML5DeviceContext.requestAnimationFrame = function (callback) {
                    return window.setTimeout(callback, 1000 / frameRate);
                };
                egret.HTML5DeviceContext.cancelAnimationFrame = function (id) {
                    return window.clearTimeout(id);
                };
            }
        };
    }

    /**
     * addChild 的高效实现，慎用
     * @param container
     * @param child
     */
    public addChild(container:egret.DisplayObjectContainer, child:egret.DisplayObject):void {
        if (child._DO_Props_._parent != container) {
            if (child._DO_Props_._parent)
                this.removeFromParent(child);
            container._children.push(child);
            child._DO_Props_._parent = container;
        }
    }

    /**
     * addChildAt 的高效实现，慎用
     * @param container
     * @param child
     * @param index
     */
    public addChildAt(container:egret.DisplayObjectContainer, child:egret.DisplayObject, index:number):void {
        if (child._DO_Props_._parent != container) {
            if (child._DO_Props_._parent)
                this.removeFromParent(child);
            container._children.splice(index, 0, child);
            child._DO_Props_._parent = container;
        }
    }

    /**
     * removeFromParent 的高效实现，慎用
     * @param child
     */
    public removeFromParent(child:egret.DisplayObject):void {
        if (child && child._DO_Props_._parent) {
            var index = child._DO_Props_._parent._children.indexOf(child);
            child._DO_Props_._parent._children.splice(index, 1);
            child._DO_Props_._parent = null;
        }
    }

    /**
     * removeChildAt 的高效实现，慎用
     * @param container
     * @param index
     */
    public removeChildAt(container:egret.DisplayObjectContainer, index:number):void {
        var child:egret.DisplayObject = container._children[index];
        if (child) {
            container._children.splice(index, 1);
            child._DO_Props_._parent = null;
            child.visible = false;
        }
    }

    /**
     * removeAllChild 的高效实现，慎用
     * @param container
     */
    public removeAllChild(container:egret.DisplayObjectContainer):void {
        while (container._children.length) {
            this.removeChildAt(container, 0);
        }
    }

    /**
     * 设置输入框的输入类型
     * @param txt 要处理的输入框
     * @param typeStr 输入类型
     *      "number"：数字输入
     *      "email"：Email输入
     *      "url"：Url输入
     *      "tel"：电话号码输入
     *      "date"：日期输入
     *      "time"：时间输入
     *      "datetime"：日期和时间输入
     *      "month"：月份输入
     */
    public setTextFieldInputType(txt:egret.TextField, typeStr:string):void {
        txt.addEventListener(egret.TouchEvent.TOUCH_TAP, function ():void {
            txt["_inputUtils"]["stageText"]["inputElement"].type = typeStr;
        }, this);
    }
}
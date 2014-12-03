/**
 * Created by yangsong on 2014/12/3.
 * Stage相关工具类
 */
class StageUtils{
    /**
     * 构造函数
     */
    public constructor(){

    }

    /**
     * 获取游戏的高度
     * @returns {number}
     */
    public getHeight():number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    /**
     * 获取游戏宽度
     * @returns {number}
     */
    public getWidth():number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    public setTouchChildren(value:boolean):void {
        egret.MainContext.instance.stage.touchChildren = value;
    }

    /**
     * 指定此对象是否接收鼠标/触摸事件
     * @param value
     */
    public setTouchEnabled(value:boolean):void {
        egret.MainContext.instance.stage.touchEnabled = value;
    }

    /**
     * 设置同时可触发几个点击事件，默认为2
     * @param value
     */
    public setMaxTouches(value:number):void{
        egret.MainContext.instance.touchContext.maxTouches = value;
    }

    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
     */
    public getStage():egret.Stage{
        return egret.MainContext.instance.stage;
    }
}

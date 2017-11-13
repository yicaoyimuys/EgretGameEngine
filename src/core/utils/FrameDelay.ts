/**
 * Created by yangsong on 2014/11/23.
 * 帧延迟处理
 */
class FrameDelay {
    private func:Function;
    private thisObj:any;

    /**
     * 构造函数
     */
    public constructor() {

    }

    /**
     * 延迟处理
     * @param delayFrame 延迟帧数
     * @param func 延迟执行的函数
     * @param thisObj 延迟执行的函数的所属对象
     */
    public delayCall(delayFrame:number, func:Function, thisObj:any):void {
        this.func = func;
        this.thisObj = thisObj;
        egret.callLater(function () {
            App.TimerManager.doFrame(delayFrame, 1, this.listener_enterFrame, this);
        }, this);
    }

    private listener_enterFrame():void {
        this.func.call(this.thisObj);
    }
}
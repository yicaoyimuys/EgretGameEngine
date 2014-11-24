/**
 * Created by yangsong on 2014/11/23.
 * 帧延迟处理
 */
class FrameDelay{
    private cnt:number;
    private delay:number;
    private func:Function;
    private thisObj:any;

    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 延迟处理
     * @param delayFrame 延迟帧数
     * @param func 延迟执行的函数
     * @param thisObj 延迟执行的函数的所属对象
     */
    public delayCall(delayFrame:number, func:Function, thisObj:any):void{
        this.cnt = 0;
        this.delay = delayFrame;
        this.func = func;
        this.thisObj = thisObj;
        egret.Ticker.getInstance().register(this.listener_enterFrame, this);
    }

    private listener_enterFrame(e:egret.Event):void{
        this.cnt ++ ;
        if(this.cnt >= this.delay){
            this.cnt = 0;
            egret.Ticker.getInstance().unregister(this.listener_enterFrame, this);
            this.func.call(this.thisObj);
        }
    }
}
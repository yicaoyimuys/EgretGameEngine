/**
 * Created by Saco on 2015/1/14.
 * hack引擎的点击事件
 */
class TouchEventHook extends BaseClass {
    private _eventCallDic:any = {};

    public constructor() {
        super();
    }

    /*
     * eventType:绑定事件类型，TOUCH_BEGIN、TOUCH_MOVE、TOUCH_END
     * bindCall:接受参数为点击事件的坐标x,y,identifier
     * */
    public hookTouchEvent(eventType:string, bindCall:(x:number, y:number, identifier:number) => void):void {
        if (!this._eventCallDic.hasOwnProperty(eventType)) {
            this.restoreEvent(eventType);
        }

        switch (eventType) {
            case egret.TouchEvent.TOUCH_BEGIN:
            {
                egret.MainContext.instance.touchContext.onTouchBegan = bindCall;
                break;
            }
            case egret.TouchEvent.TOUCH_MOVE:
            {
                egret.MainContext.instance.touchContext.onTouchMove = bindCall;
                break;
            }
            case egret.TouchEvent.TOUCH_END:
            {
                egret.MainContext.instance.touchContext.onTouchEnd = bindCall;
                break;
            }
        }
    }

    private restoreEvent(eventType:string):void {
        switch (eventType) {
            case egret.TouchEvent.TOUCH_BEGIN:
            {
                this._eventCallDic[eventType] = egret.MainContext.instance.touchContext.onTouchBegan;
                break;
            }
            case egret.TouchEvent.TOUCH_MOVE:
            {
                this._eventCallDic[eventType] = egret.MainContext.instance.touchContext.onTouchMove;
                break;
            }
            case egret.TouchEvent.TOUCH_END:
            {
                this._eventCallDic[eventType] = egret.MainContext.instance.touchContext.onTouchEnd;
                break;
            }
        }
    }

    /*
     * 释放绑定的点击事件
     * eventType:绑定事件类型，TOUCH_BEGIN、TOUCH_MOVE、TOUCH_END
     */
    public releaseTouchEvent(eventType:string):void {
        switch (eventType) {
            case egret.TouchEvent.TOUCH_BEGIN:
            {
                egret.MainContext.instance.touchContext.onTouchBegan = this._eventCallDic[eventType];
                break;
            }
            case egret.TouchEvent.TOUCH_MOVE:
            {
                egret.MainContext.instance.touchContext.onTouchMove = this._eventCallDic[eventType];
                break;
            }
            case egret.TouchEvent.TOUCH_END:
            {
                egret.MainContext.instance.touchContext.onTouchEnd = this._eventCallDic[eventType];
                break;
            }
        }
    }
}

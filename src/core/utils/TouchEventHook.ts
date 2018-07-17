/**
 * Created by Saco on 2015/1/14.
 * hack引擎的点击事件
 */
class TouchEventHook {
    private _eventCallDic: any;
    private static _instance: TouchEventHook;

    public constructor() {
        this._eventCallDic = {};
    }

    public static i(): TouchEventHook {
        if (!this._instance)
            this._instance = new TouchEventHook();
        return this._instance;
    }

    private get systemTouch(): any {
        return egret.sys.$TempStage.$screen["webTouchHandler"].touch;
    }

    /*
    * eventType:绑定事件类型，TOUCH_BEGIN、TOUCH_MOVE、TOUCH_END
    * bindCall:接受参数为点击事件的坐标x,y,identifier
    * */
    public hookTouchEvent(eventType: string, bindCall: (x: number, y: number, identifier: number) => void): void {
        if (!this._eventCallDic.hasOwnProperty(eventType)) {
            this.restoreEvent(eventType);
        }

        switch (eventType) {
            case egret.TouchEvent.TOUCH_BEGIN: {
                this.systemTouch.onTouchBegan = bindCall;
                break;
            }
            case egret.TouchEvent.TOUCH_MOVE: {
                this.systemTouch.onTouchMove = bindCall;
                break;
            }
            case egret.TouchEvent.TOUCH_END: {
                this.systemTouch.onTouchEnd = bindCall;
                break;
            }
        }
    }

    private restoreEvent(eventType: string): void {
        switch (eventType) {
            case egret.TouchEvent.TOUCH_BEGIN: {
                this._eventCallDic[eventType] = this.systemTouch.onTouchBegan;
                break;
            }
            case egret.TouchEvent.TOUCH_MOVE: {
                this._eventCallDic[eventType] = this.systemTouch.onTouchMove;
                break;
            }
            case egret.TouchEvent.TOUCH_END: {
                this._eventCallDic[eventType] = this.systemTouch.onTouchEnd;
                break;
            }
        }
    }

    /*
    * 释放绑定的点击事件
    * eventType:绑定事件类型，TOUCH_BEGIN、TOUCH_MOVE、TOUCH_END
    */
    public releaseTouchEvent(eventType: string): void {
        switch (eventType) {
            case egret.TouchEvent.TOUCH_BEGIN: {
                this.systemTouch.onTouchBegan = this._eventCallDic[eventType];
                break;
            }
            case egret.TouchEvent.TOUCH_MOVE: {
                this.systemTouch.onTouchMove = this._eventCallDic[eventType];
                break;
            }
            case egret.TouchEvent.TOUCH_END: {
                this.systemTouch.onTouchEnd = this._eventCallDic[eventType];
                break;
            }
        }
    }
}

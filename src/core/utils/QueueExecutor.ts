/**
 * Created by yangsong on 15-8-19.
 * 队列处理
 */
class QueueExecutor {
    private _callBack:Function;
    private _callBackTarget:any;
    private _functions:Array<Array<any>>;

    /**
     * 构造函数
     */
    public constructor() {
        this._functions = new Array();
    }

    /**
     * 设置全部执行完成处理函数
     * @param callBack 此队列处理完成执行函数
     * @param callBackTarget 此队列处理完成执行函数所属对象
     */
    public setCallBack(callBack:Function, callBackTarget:any):void {
        this._callBack = callBack;
        this._callBackTarget = callBackTarget;
    }

    /**
     * 注册需要队列处理的函数
     * @param $func 函数
     * @param $thisObj 函数所属对象
     */
    public regist($func:Function, $thisObj:any):void {
        this._functions.push([$func, $thisObj]);
    }

    /**
     * 开始执行
     */
    public start():void {
        this.next();
    }

    /**
     * 执行下一个
     */
    public next():void {
        if (!this._functions) {
            return;
        }

        if (this._functions.length == 0) {
            if (this._callBack) {
                this._callBack.call(this._callBackTarget);
            }
            this._callBack = null;
            this._callBackTarget = null;
            this._functions = null;
        }
        else {
            var arr:Array<any> = this._functions.shift();
            arr[0].call(arr[1]);
        }
    }
}

/**
 * Created by yangsong on 15-11-4.
 */
class AllAsyncExecutor {
    private _callBack:Function;
    private _callBackTarget:any;
    private _functions:Array<Array<any>>;
    private _complateNum:number;

    /**
     * 构造函数
     */
    public constructor() {
        this._functions = new Array();
        this._complateNum = 0;
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
        App.ArrayUtils.forEach(this._functions, function (arr:Array<any>):void {
            arr[0].call(arr[1]);
        }, this);
    }

    /**
     * 执行完成
     */
    public complate():void {
        if (!this._functions) {
            return;
        }

        this._complateNum++;
        if (this._complateNum == this._functions.length) {
            if (this._callBack) {
                this._callBack.call(this._callBackTarget);
            }
            this._callBack = null;
            this._callBackTarget = null;
            this._functions = null;
        }
    }
}
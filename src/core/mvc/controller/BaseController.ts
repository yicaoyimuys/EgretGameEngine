/**
 * Created by yangsong on 2014/11/22.
 * Controller基类
 */
class BaseController {
    /**
     * 消息列表
     */
    private _messages:any;

    /**
     * 构造函数
     */
    public constructor() {
        this._messages = {};
    }

    /**
     * 注册本模块消息
     * @param key 唯一标识
     * @param callbackFunc 侦听函数
     * @param callbackObj 侦听函数所属对象
     */
    public registerFunc(key:any, callbackFunc:Function, callbackObj:any):void {
        this._messages[key] = [callbackFunc, callbackObj];
    }

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyFunc(key:any, ...param:any[]):any {
        var listen:any = this._messages[key];
        if (listen) {
            return listen[0].apply(listen[1], param);
        } else {
            Log.trace("消息" + key + "不存在侦听");
            return null;
        }
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey:number, key:any, ...param:any[]):any {
        return App.ControllerManager.applyFunc.apply(App.ControllerManager, arguments);
    }
}

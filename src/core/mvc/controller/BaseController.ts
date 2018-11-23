/**
 * Created by yangsong on 2014/11/22.
 * Controller基类
 */
class BaseController {
    /**
     * 消息列表
     */
    private _messages: any;

    /**
     * 该模块使用的实体类
     */
    private _model: BaseModel;

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
    public registerFunc(key: any, callbackFunc: Function, callbackObj: any): void {
        this._messages[key] = [callbackFunc, callbackObj];
    }

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyFunc(key: any, ...param: any[]): any {
        var listen: any = this._messages[key];
        if (listen) {
            return listen[0].apply(listen[1], param);
        } else {
            Log.warn("消息" + key + "不存在侦听");
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
    public applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any {
        return App.ControllerManager.applyFunc.apply(App.ControllerManager, arguments);
    }

    /**
     * 设置该模块使用的Model对象
     * @param model
     */
    public setModel(model: BaseModel): void {
        this._model = model;
    }

    /**
     * 获取该模块的Model对象
     * @returns {BaseModel}
     */
    public getModel(): BaseModel {
        return this._model;
    }

    /**
     * 获取指定Controller的Model对象
     * @param controllerD Controller唯一标识
     * @returns {BaseModel}
     */
    public getControllerModel(controllerD: number): BaseModel {
        return App.ControllerManager.getControllerModel(controllerD);
    }

    /**
     * View注册
     * @param viewClassZ View的类
     * @param viewId View的ID
     * @param viewParent View的父级
     * @returns {IBaseView}
     */
    public registerView(viewClassZ: any, viewId: number, viewParent: egret.DisplayObjectContainer): any {
        let view = new viewClassZ(this, viewParent);
        App.ViewManager.register(viewId, view);
        return view;
    }

    /**
     * View打开
     * @param viewId View的ID
     * @param param 参数
     */
    public openView(viewId: number, ...param: any[]): void {
        App.ViewManager.open(viewId, ...param);
    }

    /**
     * View关闭
     * @param viewId View的ID
     * @param param 参数
     */
    public closeView(viewId: number, ...param: any[]): void {
        App.ViewManager.close(viewId, ...param);
    }
}

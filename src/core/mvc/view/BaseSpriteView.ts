/**
 * Created by yangsong on 2014/11/22.
 * View基类，继承自egret.Sprite
 */
class BaseSpriteView extends egret.DisplayObjectContainer implements IBaseView {
    private _controller:BaseController;
    private _myParent:egret.DisplayObjectContainer;
    private _isInit:boolean;
    private _resources:string[] = null;

    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    public constructor($controller:BaseController, $parent:egret.DisplayObjectContainer) {
        super();
        this._controller = $controller;
        this._myParent = $parent;
        this._isInit = false;
        App.StageUtils.getStage().addEventListener(egret.Event.RESIZE, this.onResize, this);
    }

    /**
     * 设置初始加载资源
     * @param resources
     */
    public setResources(resources:string[]):void {
        this._resources = resources;
    }

    /**
     * 获取我的父级
     * @returns {egret.DisplayObjectContainer}
     */
    public get myParent():egret.DisplayObjectContainer {
        return this._myParent;
    }

    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    public isInit():boolean {
        return this._isInit;
    }

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    public applyFunc(key:any, ...param:any[]):any {
        return this._controller.applyFunc.apply(this._controller, arguments);
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey:number, key:any, ...param:any[]):any {
        return this._controller.applyControllerFunc.apply(this._controller, arguments);
    }

    /**
     * 面板是否显示
     * @return
     *
     */
    public isShow():boolean {
        return this.stage != null && this.visible;
    }

    /**
     * 添加到父级
     */
    public addToParent():void {
        this._myParent.addChild(this);
    }

    /**
     * 从父级移除
     */
    public removeFromParent():void {
        App.DisplayUtils.removeFromParent(this);
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void {
        this._isInit = true;
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void {

    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param:any[]):void {

    }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param:any[]):void {

    }

    /**
     * 销毁
     */
    public destroy():void {
        this._controller = null;
        this._myParent = null;
        this._resources = null;
    }

    /**
     * 屏幕尺寸变化时调用
     */
    protected onResize():void {

    }

    /**
     * 加载面板所需资源
     * @param loadComplete
     * @param initComplete
     */
    public loadResource(loadComplete:Function, initComplete:Function):void {
        if (this._resources && this._resources.length > 0) {
            App.ResourceUtils.loadResource(this._resources, [], function ():void {
                loadComplete();
                initComplete();
            }, null, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    }

    /**
     * 设置是否隐藏
     * @param value
     */
    public setVisible(value:boolean):void {
        this.visible = value;
    }
}

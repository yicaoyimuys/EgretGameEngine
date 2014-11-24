/**
 * Created by yangsong on 2014/11/22.
 * View基类，继承自egret.gui.SkinnableContainer
 */
class BaseGuiView extends egret.gui.SkinnableContainer implements IBaseView{
    private _controller:BaseController;
    private _myParent:egret.gui.Group;
    private _isInit:boolean;

    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    public constructor($controller:BaseController, $parent:egret.gui.Group){
        super();
        this._controller = $controller;
        this._myParent = $parent;
        this._isInit = false;
    }

    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    public isInit():boolean{
        return this._isInit;
    }

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    public applyFunc(key:any, ...param:any[]):void{
        this._controller.applyFunc(key, param);
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey:number, key:any, ...param:any[]):void{
        this._controller.applyControllerFunc(controllerKey, key, param);
    }

    /**
     * 面板是否显示
     * @return
     *
     */
    public isShow():boolean{
        return this.stage && this.visible;
    }

    /**
     * 添加到父级
     */
    public addToParent():void{
        this._myParent.addElement(this);
    }

    /**
     * 从父级移除
     */
    public removeFromParent():void{
        this._myParent.removeElement(this);
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        this._isInit = true;
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void{

    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param:any[]):void{

    }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param:any[]):void{

    }
}
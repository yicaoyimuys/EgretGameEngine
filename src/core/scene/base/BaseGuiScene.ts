/**
 * Created by yangsong on 15-1-6.
 * 因为BaseGuiScene继承自egret.gui.UIStage，在项目中有且只能有一个
 */
class BaseGuiScene extends egret.gui.UIStage implements IBaseScene{
    /**
     * 构造函数
     */
    public constructor(){
        super();
    }

    /**
     * 进入Scene调用
     */
    public onEnter():void{

    }

    /**
     * 退出Scene调用
     */
    public onExit():void{

    }
}
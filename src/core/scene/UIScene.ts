/**
 * Created by yangsong on 2014/11/28.
 * UI场景层
 */
class UIScene extends BaseSpriteScene{
    /**
     * 构造函数
     */
    public constructor(){
        super();
        this.addLayer();
    }

    /**
     * 添加容器层级
     */
    private addLayer():void{
        this.addChild(LayerManager.UI_Main);
        this.addChild(LayerManager.UI_Popup);
        this.addChild(LayerManager.UI_Message);
        this.addChild(LayerManager.UI_Tips);
    }

    /**
     * 进入Scene调用
     */
    public onEnter():void{
        super.onEnter();
    }

    /**
     * 退出Scene调用
     */
    public onExit():void{
        super.onExit();
    }
}

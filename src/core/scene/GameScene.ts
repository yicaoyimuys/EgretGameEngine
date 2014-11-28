/**
 * Created by yangsong on 2014/11/28.
 * 游戏场景
 */
class GameScene extends BaseScene{
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
        this.addChild(LayerManager.Game_Bg);
        this.addChild(LayerManager.Game_Main);
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

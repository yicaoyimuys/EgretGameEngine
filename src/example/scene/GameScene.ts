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
    }

    /**
     * 进入Scene调用
     */
    public onEnter():void{
        super.onEnter();

        this.addLayer(LayerManager.Game_Bg);
        this.addLayer(LayerManager.Game_Main);
    }

    /**
     * 退出Scene调用
     */
    public onExit():void{
        super.onExit();
    }
}

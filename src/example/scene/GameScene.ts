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

        this.addLayerAt(LayerManager.Game_Main, 0);

        App.ViewManager.open(ViewConst.Game);

        egret.RenderFilter.getInstance().addDrawArea(new egret.Rectangle(0, 0, App.StageUtils.getWidth(), App.StageUtils.getHeight()));
    }

    /**
     * 退出Scene调用
     */
    public onExit():void{
        super.onExit();
    }
}

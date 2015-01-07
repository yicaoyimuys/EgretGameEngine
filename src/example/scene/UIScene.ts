/**
 * Created by yangsong on 2014/11/28.
 * UI场景层
 */
class UIScene extends BaseScene{
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

        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Message);
        this.addLayer(LayerManager.UI_Tips);

        //初始打开Home页面
        App.ViewManager.open(ViewConst.Home);
    }

    /**
     * 退出Scene调用
     */
    public onExit():void{
        super.onExit();
    }
}

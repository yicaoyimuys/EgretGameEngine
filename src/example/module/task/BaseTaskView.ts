/**
 * Created by egret on 15-1-7.
 */
class BaseTaskView extends BasePanelView {

    public dataProvider:eui.ArrayCollection;
    private taskList:eui.List;
    private scroller:eui.Scroller;

    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);

        this.dataProvider = new eui.ArrayCollection();
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();

        //布局
        var layout:eui.VerticalLayout = new eui.VerticalLayout();
        layout.horizontalAlign = "center";

        //创建一个列表
        this.taskList = new eui.List();
        this.taskList.itemRenderer = TaskItemRenderer;
        this.taskList.itemRendererSkinName = "resource/skins/TaskItemRendererSkin.exml";
        this.taskList.dataProvider = this.dataProvider;
        this.taskList.layout = layout;

        //创建一个 Scroller
        this.scroller = new eui.Scroller();
        this.scroller.percentWidth = this.scroller.percentHeight = 100;
        this.scroller.top = 5;
        this.scroller.viewport = this.taskList;
        this.contentGroup.addChild(this.scroller);
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void{
        super.initData();
    }
}
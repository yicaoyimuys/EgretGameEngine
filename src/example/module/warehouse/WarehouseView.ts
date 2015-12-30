/**
 * Created by egret on 15-1-7.
 */
class WarehouseView extends BasePanelView {
    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);

        this.icon = "table_warehouse";
        this.btn = "icon_sale";
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void {
        super.initData();

        var dp1:eui.ArrayCollection = new eui.ArrayCollection();
        dp1.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp1.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp1.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp1.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp1.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp1.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp1.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp1.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp1.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp1.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp1.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp1.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});


        var dp2:eui.ArrayCollection = new eui.ArrayCollection();
        dp2.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp2.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp2.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp2.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp2.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp2.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp2.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp2.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp2.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp2.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp2.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp2.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});

        var tabbar:TabBarContainer = new TabBarContainer();
        tabbar.addViewStackElement("text_seed01", "text_seed02", this.createList(dp1));
        tabbar.addViewStackElement("text_fruit_01", "text_fruit_02", this.createList(dp2));
        tabbar.addViewStackElement("text_fruit_juice_01", "text_fruit_juice_02", this.createList(dp1));
        tabbar.horizontalCenter = 0;
        this.contentGroup.addChild(tabbar);
    }

    private createList(dp:eui.ArrayCollection):eui.Scroller{
        var layout:eui.TileLayout = new eui.TileLayout();
        layout.requestedColumnCount = 2;

        var taskList:eui.List = new eui.List();
        taskList.layout = layout;
        taskList.itemRenderer = SaleItemRenderer;
        taskList.itemRendererSkinName = "resource/skins/SaleItemSkin.exml";
        taskList.dataProvider = dp;

        var scroller:eui.Scroller = new eui.Scroller();
        scroller.percentWidth = scroller.percentHeight = 100;
        scroller.viewport = taskList;

        return scroller;
    }

}
/**
 * Created by egret on 15-1-7.
 */
class ShopView extends BasePanelView {
    public constructor(controller:BaseController, parent:egret.gui.Group) {
        super(controller, parent);

        this.icon = "table_shop";
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void{
        super.initData();

        var taskList1:egret.gui.List = new egret.gui.List();
        taskList1.skinName = "skins.TileListSkin";
        taskList1.height = 385;
        taskList1.horizontalCenter = 0;
        var dp:egret.gui.ArrayCollection = new egret.gui.ArrayCollection();
        taskList1.dataProvider = dp;
        taskList1.itemRenderer = new egret.gui.ClassFactory(SaleItemRenderer);
        taskList1.itemRendererSkinName = "skins.SaleItemSkin";
        dp.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});


        var taskList2:egret.gui.List = new egret.gui.List();
        taskList2.skinName = "skins.TileListSkin";
        taskList2.height = 385;
        taskList2.horizontalCenter = 0;
        var dp:egret.gui.ArrayCollection = new egret.gui.ArrayCollection();
        taskList2.dataProvider = dp;
        taskList2.itemRenderer = new egret.gui.ClassFactory(SaleItemRenderer);
        taskList2.itemRendererSkinName = "skins.SaleItemSkin";
        dp.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});
        dp.addItem({title:"神速化肥",price:"25",time:"-60分钟",icon:"icon_fertilizer05"});
        dp.addItem({title:"普通化肥",price:"3",time:"-5分钟",icon:"icon_fertilizer02"});
        dp.addItem({title:"高速化肥",price:"5",time:"-10分钟",icon:"icon_fertilizer03"});
        dp.addItem({title:"飞速化肥",price:"15",time:"-30分钟",icon:"icon_fertilizer04"});

        var tabbar:TabBarContainer = new TabBarContainer();
        tabbar.addViewStackElement("text_fertilizer01","text_fertilizer02",taskList1);
        tabbar.addViewStackElement("text_seed01","text_seed02",taskList2);
        tabbar.verticalCenter = 0;
        tabbar.horizontalCenter = 0;
        this.addElement(tabbar);
    }
}
/**
 * Created by egret on 15-1-7.
 */
class WarehouseView extends BasePanelView {
    public constructor(controller:BaseController, parent:egret.gui.Group) {
        super(controller, parent);

        this.icon = "table_warehouse";
        this.btn = "icon_sale";
    }

    public partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
    }

    public createChildren():void{
        super.createChildren();

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
        var dp:egret.gui.ArrayCollection = new egret.gui.ArrayCollection();
        dp.addItem({title:"text_seed01",titleSelected:"text_seed02",content:taskList1});
        dp.addItem({title:"text_fruit_01",titleSelected:"text_fruit_02",content:taskList2});
        dp.addItem({title:"text_fruit_juice_01",titleSelected:"text_fruit_juice_02",content:taskList2});
        tabbar.dataProvider = dp;
        this.addElement(tabbar);
        tabbar.verticalCenter = 0;
        tabbar.horizontalCenter = 0;
    }
}
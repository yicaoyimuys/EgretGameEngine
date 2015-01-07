/**
 * Created by egret on 15-1-7.
 */
class BaseTaskView extends BasePanelView {

    public dataProvider:egret.gui.ArrayCollection;
    private taskList:egret.gui.List;

    public constructor(controller:BaseController, parent:egret.gui.Group) {
        super(controller, parent);

        this.dataProvider = new egret.gui.ArrayCollection();
    }

    public createChildren():void{
        super.createChildren();

        this.taskList = new egret.gui.List();
        this.taskList.skinName = "skins.ListSkin";
        this.addElement(this.taskList);
        this.taskList.top = this.taskList.bottom = 20;
        this.taskList.horizontalCenter = 0;
        this.taskList.dataProvider = this.dataProvider;
        this.taskList.itemRenderer = new egret.gui.ClassFactory(TaskItemRenderer);
        this.taskList.itemRendererSkinName = "skins.TaskItemRendererSkin";
    }

    public partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
    }
}
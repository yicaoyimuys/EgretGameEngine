/**
 * Created by egret on 15-1-7.
 */
class FriendView extends BasePanelView {
    public constructor(controller:BaseController, parent:egret.gui.Group) {
        super(controller, parent);

        this.icon = "table_tittle";
    }

    public partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
    }
}
/**
 * Created by egret on 15-1-7.
 */
class TaskView extends BaseTaskView {
    public constructor(controller:BaseController, parent:egret.gui.Group) {
        super(controller, parent);

        this.icon = "table_task";
    }

    public partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
    }

    public createChildren():void{
        super.createChildren();

        this.dataProvider.addItem({icon:"icon_experience",gold:"+50",seed:"+200",label:"帮助好友5次",progress:"0/5"});
        this.dataProvider.addItem({icon:"icon_fertilization",gold:"+120",seed:"+100",label:"帮助好友10次",progress:"0/10"});
        this.dataProvider.addItem({icon:"icon_diamond",gold:"+520",seed:"+500",label:"帮助好友100次",progress:"0/100"});
        this.dataProvider.addItem({icon:"icon_experience",gold:"+50",seed:"+200",label:"帮助好友5次",progress:"0/5"});
        this.dataProvider.addItem({icon:"icon_fertilization",gold:"+120",seed:"+100",label:"帮助好友10次",progress:"0/10"});
        this.dataProvider.addItem({icon:"icon_diamond",gold:"+520",seed:"+500",label:"帮助好友100次",progress:"0/100"});
        this.dataProvider.addItem({icon:"icon_experience",gold:"+50",seed:"+200",label:"帮助好友5次",progress:"0/5"});
        this.dataProvider.addItem({icon:"icon_fertilization",gold:"+120",seed:"+100",label:"帮助好友10次",progress:"0/10"});
        this.dataProvider.addItem({icon:"icon_diamond",gold:"+520",seed:"+500",label:"帮助好友100次",progress:"0/100"});
        this.dataProvider.addItem({icon:"icon_experience",gold:"+50",seed:"+200",label:"帮助好友5次",progress:"0/5"});
        this.dataProvider.addItem({icon:"icon_fertilization",gold:"+120",seed:"+100",label:"帮助好友10次",progress:"0/10"});
        this.dataProvider.addItem({icon:"icon_diamond",gold:"+520",seed:"+500",label:"帮助好友100次",progress:"0/100"});
        this.dataProvider.addItem({icon:"icon_experience",gold:"+50",seed:"+200",label:"帮助好友5次",progress:"0/5"});
        this.dataProvider.addItem({icon:"icon_fertilization",gold:"+120",seed:"+100",label:"帮助好友10次",progress:"0/10"});
        this.dataProvider.addItem({icon:"icon_diamond",gold:"+520",seed:"+500",label:"帮助好友100次",progress:"0/100"});
    }
}
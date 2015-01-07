/**
 * tabbar附加一个容器
 */
class TabBarContainer extends egret.gui.TabBar{

    public constructor(){
        super();
        this.skinName = "skins.TabBarSkin";
        this.addEventListener(egret.gui.ListEvent.ITEM_CLICK, this.onClick, this);
    }

    public contentGroup:egret.gui.Group;
    public partAdded(partName: string, instance: any): void{
        super.partAdded(partName,instance);

        if(instance == this.contentGroup){
            if(this.dataProvider && this.dataProvider.length >0){
                var data:any = this.dataProvider.getItemAt(0);
                if(data.content){
                    this.contentGroup.removeAllElements();
                    this.contentGroup.addElement(data.content);
                }
            }
        }
    }

    /*
     * 显示点击的项
     * */
    private onClick(event:egret.gui.ListEvent):void {
        var data:any = this.dataProvider.getItemAt(this.selectedIndex);
        if(data.content && this.contentGroup){
            this.contentGroup.removeAllElements();
            this.contentGroup.addElement(data.content);
        }
    }

}
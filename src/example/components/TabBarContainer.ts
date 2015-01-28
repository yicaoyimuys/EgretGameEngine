/**
 * tabbar附加一个容器
 */
class TabBarContainer extends egret.gui.TabBar{

    public constructor(){
        super();
        this.skinName = "skins.TabBarSkin";
        this.dataProvider = this.dp;
        this.addEventListener(egret.gui.IndexChangeEvent.CHANGE,this.onTabBarIndexChanged,this)
    }

    private onTabBarIndexChanged(e:egret.gui.IndexChangeEvent):void{
        if(this.viewStack){
            this.viewStack.selectedIndex = this.selectedIndex;
        }
    }

    public viewStack:egret.gui.ViewStack;
    public partAdded(partName:string, instance:any):void{
        super.partAdded(partName,instance);
        if(instance == this.viewStack) {
            for (var i = 0; i < this.preList.length; i++){
                this.viewStack.addElement(this.preList[i]);
            }
            this.preList.length = 0;
            this.viewStack.selectedIndex = 0;
            this.selectedIndex = 0;
        }
    }

    private preList:any[] = new Array();
    private dp:egret.gui.ArrayCollection = new egret.gui.ArrayCollection();
    /**
     *  添加一项到ViewStack
     * @param title
     * @param titleSelected
     * @param content
     */
    public addViewStackElement(title:string, titleSelected:string, content:egret.gui.UIComponent):void{
        this.dp.addItem({title:title, titleSelected:titleSelected});
        if(this.viewStack){
            this.viewStack.addElement(content);
        }
        else{
            this.preList.push(content);
        }
    }
}
/**
 * tabbar附加一个容器
 */
class TabBarContainer extends eui.Component{
    public tabBar:eui.TabBar;
    public viewStack:eui.ViewStack;

    private _dp:eui.ArrayCollection;
    private _views:any[];
    private _tabBarItemRendererSkinName:any;
    private _tabBarItemRenderer:any;

    public constructor(skinName:any = null){
        super();

        //默认皮肤
        if(!skinName){
            skinName = "resource/skins/TabBarSkin.exml";
        }
        this._tabBarItemRendererSkinName = "resource/skins/TabBarButtonSkin.exml";
        this._tabBarItemRenderer = TabBarButton;

        this._dp = new eui.ArrayCollection();
        this._views = [];
        this.skinName = skinName;
    }

    private onTabBarIndexChanged(e:egret.Event):void{
        this.viewStack.selectedIndex = this.tabBar.selectedIndex;
    }

    public partAdded(partName:string, instance:any):void{
        super.partAdded(partName,instance);

        if(instance == this.tabBar){
            this.tabBar.itemRendererSkinName = this._tabBarItemRendererSkinName;
            this.tabBar.itemRenderer = this._tabBarItemRenderer;
            this.tabBar.dataProvider = this._dp;
            this.tabBar.addEventListener(egret.Event.CHANGE,this.onTabBarIndexChanged,this);
        }
        else if(instance == this.viewStack) {
            for (var i = 0; i < this._views.length; i++){
                this.viewStack.addChild(this._views[i]);
            }
            this._views.length = 0;
            this.tabBar.selectedIndex = 0;
            this.viewStack.selectedIndex = 0;
        }
    }

    public set tabBarItemRendererSkinName(value:any){
        this._tabBarItemRendererSkinName = value;
        if(this.tabBar){
            this.tabBar.itemRendererSkinName = this._tabBarItemRendererSkinName;
        }
    }

    public set tabBarItemRenderer(value:any){
        this._tabBarItemRenderer = value;
        if(this.tabBar){
            this.tabBar.itemRenderer = this._tabBarItemRenderer;
        }
    }

    /**
     *  添加一项到ViewStack
     * @param title
     * @param titleSelected
     * @param content
     */
    public addViewStackElement(title:string, titleSelected:string, content:eui.UIComponent):void{
        this._dp.addItem({"title":title, "titleSelected":titleSelected});

        if(this.viewStack){
            this.viewStack.addChild(content);
        }else{
            this._views.push(content);
        }
    }
}
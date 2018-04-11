/**
 * Created by yangsong on 15-3-27.
 * GUI测试
 */
class EUITest{
    public constructor(){
        var groupName:string = "preload_EUITest";
        var subGroups:Array<string> = ["preload_core", "preload_ui"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete():void {
        this.initModule();
        App.Init();

        //音乐音效处理
        App.SoundManager.setBgOn(true);
        App.SoundManager.setEffectOn(!App.DeviceUtils.IsHtml5 || !App.DeviceUtils.IsMobile);

        App.SceneManager.runScene(SceneConsts.UI);
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }

    /**
     * 初始化所有模块
     */
    private initModule():void{
        App.ControllerManager.register(ControllerConst.Login, new LoginController());
        App.ControllerManager.register(ControllerConst.Home, new HomeController());
        App.ControllerManager.register(ControllerConst.Friend, new FriendController());
        App.ControllerManager.register(ControllerConst.Shop, new ShopController());
        App.ControllerManager.register(ControllerConst.Warehouse, new WarehouseController());
        App.ControllerManager.register(ControllerConst.Factory, new FactoryController());
        App.ControllerManager.register(ControllerConst.Task, new TaskController());
        App.ControllerManager.register(ControllerConst.Mail, new MailController());
    }
}
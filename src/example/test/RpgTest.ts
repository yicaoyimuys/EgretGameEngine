/**
 * Created by yangsong on 15-3-27.
 * RpgDemo
 */
class RpgTest {
    private mapId: number;
    private mapGroupKey: string;

    public constructor() {
        //指定MapId
        this.mapId = 1193;
        this.mapGroupKey = "map_" + this.mapId;
        this.initMapResource();

        //加载资源
        var groupName: string = "preload_RpgTest";
        var subGroups: Array<string> = ["preload_core", "preload_ui", "preload_rpg", this.mapGroupKey];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }

    private initMapResource(): void {
        var mapResPath: string = "resource/assets/rpgGame/map/" + this.mapId + "/";
        var mapResKey: string = this.mapGroupKey + "_";
        var mapResKeys: string[] = [];
        var mapRes: any[] = [
            {
                name: "data.json",
                type: "json"
            },
            {
                name: "mini.jpg",
                type: "image"
            }
        ];
        mapRes.forEach(function (res) {
            var resKey: string = mapResKey + res.name;
            App.ResourceUtils.createResource(resKey, res.type, mapResPath + res.name);
            mapResKeys.push(resKey);
        })

        App.ResourceUtils.createGroup(this.mapGroupKey, mapResKeys);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(): void {
        this.initModule();
        App.Init();

        //音乐音效处理
        App.SoundManager.setBgOn(false);
        App.SoundManager.setEffectOn(false);

        //进入游戏
        App.SceneManager.runScene(SceneConsts.RpgGame, this.mapId);
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded: number, itemsTotal: number): void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }

    /**
     * 初始化所有模块
     */
    private initModule(): void {
        App.ControllerManager.register(ControllerConst.Login, new LoginController());
        App.ControllerManager.register(ControllerConst.Home, new HomeController());
        App.ControllerManager.register(ControllerConst.Friend, new FriendController());
        App.ControllerManager.register(ControllerConst.Shop, new ShopController());
        App.ControllerManager.register(ControllerConst.Warehouse, new WarehouseController());
        App.ControllerManager.register(ControllerConst.Factory, new FactoryController());
        App.ControllerManager.register(ControllerConst.Task, new TaskController());
        App.ControllerManager.register(ControllerConst.Mail, new MailController());

        App.ControllerManager.register(ControllerConst.RpgGame, new RpgGameController());
    }
}
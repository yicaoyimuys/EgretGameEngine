/**
 * Created by yangsong on 15-3-27.
 * ActDemo
 */
class ActTest{
    public constructor(){
        var groupName:string = "preload";
        var subGroups:Array<string> = ["preload_core", "preload_battle"];
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
        App.SoundManager.setEffectOn(true);

        this.initBattleDragonBones();
        App.SceneManager.runScene(SceneConsts.Game);
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }


    /**
     * 初始化战斗使用的动画
     */
    private initBattleDragonBones():void{
        var arr:Array<string> = ["zhujue1", "zhujue2", "guaiwu001", "jineng1", "jineng2", "guaiwu002", "guaiwu002_effect", "guaiwu003", "guaiwu003_effect"];
        for(var i:number=0, len:number=arr.length; i<len; i++){
            var dbName:string = arr[i];
            var skeletonData:any = RES.getRes(dbName+"_skeleton_json");
            var texturePng:egret.Texture = RES.getRes(dbName+"_texture_png");
            var textureData:any = RES.getRes(dbName+"_texture_json");
            App.DragonBonesFactory.initArmatureFile(skeletonData, texturePng, textureData);
        }
    }

    /**
     * 初始化所有模块
     */
    private initModule():void{
        App.ControllerManager.register(ControllerConst.Game, new GameController());
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer{
    private joinUI:boolean = true;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter",AssetAdapter);

        //初始化
        this.initScene();
        this.initModule();

        //设置加载进度界面
        App.SceneManager.runScene(SceneConsts.LOADING);

        //初始化Resource资源加载库
        App.ResourceUtils.addConfig("resource/resource.json", "resource/1/");
        App.ResourceUtils.loadConfig(this.onConfigComplete, this);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete():void{
        var loadGroup:string;
        if(this.joinUI){
            loadGroup = "preload";
        }else{
            loadGroup = "battleRes";
        }
        App.ResourceUtils.loadGroup(loadGroup, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete():void {
        this.startGame();
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }

    /**
     * 开始游戏
     */
    private startGame():void{
        App.Init();

        //初始显示场景
        if(this.joinUI){
            App.DebugUtils.setFpsColor(0x000000);
            //添加一个纯色背景
            var rect:egret.gui.Rect = new egret.gui.Rect();
            rect.fillColor = 0x78b93f;
            rect.percentHeight = 100;
            rect.percentWidth = 100;
            App.StageUtils.getUIStage().addElement(rect);

            App.SceneManager.runScene(SceneConsts.UI);
        }else{
            App.DebugUtils.setFpsColor(0xFFFFFF);

            var arr:Array<string> = ["zhujue1", "zhujue2", "enemy", "jineng1", "jineng2", "guaiwu002", "guaiwu002_effect", "guaiwu003", "guaiwu003_effect"];
            for(var i:number=0, len:number=arr.length; i<len; i++){
                DragonBonesFactory.getInstance().initArmatureFile(RES.getRes(arr[i]+"_skeleton_json"), RES.getRes(arr[i]+"_texture_png"), RES.getRes(arr[i]+"_texture_json"));
            }
            App.SceneManager.runScene(SceneConsts.Game);
        }

        //StarlingSwf使用
//        StarlingSwfFactory.getInstance().addSwf("bossMC", RES.getRes("bossMC_swf_json"), RES.getRes("bossMC_json"));
//        var mc:StarlingSwfMovieClip = StarlingSwfFactory.getInstance().makeMc("boss_whiteBear");
    }

    /**
     * 初始化所有场景
     */
    private initScene():void{
        App.SceneManager.register(SceneConsts.Game, new GameScene());
        App.SceneManager.register(SceneConsts.UI, new UIScene());
        App.SceneManager.register(SceneConsts.LOADING, new LoadingScene());
        DragonBonesFactory.getInstance();
    }

    /**
     * 初始化所有模块
     */
    private initModule():void{
        App.ControllerManager.register(ControllerConst.Loading, new LoadingController());
        if(this.joinUI){
            App.ControllerManager.register(ControllerConst.Login, new LoginController());
            App.ControllerManager.register(ControllerConst.Home, new HomeController());
            App.ControllerManager.register(ControllerConst.Friend, new FriendController());
            App.ControllerManager.register(ControllerConst.Shop, new ShopController());
            App.ControllerManager.register(ControllerConst.Warehouse, new WarehouseController());
            App.ControllerManager.register(ControllerConst.Factory, new FactoryController());
            App.ControllerManager.register(ControllerConst.Task, new TaskController());
            App.ControllerManager.register(ControllerConst.Mail, new MailController());
        }
        else{
            App.ControllerManager.register(ControllerConst.Game, new GameController());
        }
    }
}



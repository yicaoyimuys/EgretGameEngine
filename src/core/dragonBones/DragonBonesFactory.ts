/**
 * Created by egret on 15-1-14.
 * DragonBones工厂类
 */
class DragonBonesFactory{
    private static _instance:DragonBonesFactory;

    /**
     * 单例
     * @returns {DragonBonesFactory}
     */
    public static getInstance():DragonBonesFactory{
        if(DragonBonesFactory._instance == null){
            DragonBonesFactory._instance = new DragonBonesFactory();
        }
        return DragonBonesFactory._instance;
    }


    private factory:dragonBones.EgretFactory;
    private isPlay:boolean;
    private clocks:any;

    /**
     * 构造函数
     */
    public constructor(){
        this.factory = new dragonBones.EgretFactory();
        this.clocks = {};
        this.clocks[1] = dragonBones.WorldClock.clock;
        //默认开启
        this.start();
    }

    /**
     * 初始化一个动画文件
     * @param skeletonData 动画描述文件
     * @param texture 动画资源
     * @param textureData 动画资源描述文件
     */
    public initArmatureFile(skeletonData:any, texture:egret.Texture, textureData:any):void{
        this.addSkeletonData(skeletonData);
        this.addTextureAtlas(texture, textureData);
    }

    /**
     * 初始化一个动画文件
     * @param skeletonData 动画描述文件
     * @param texture 动画资源
     * @param textureData 动画资源描述文件
     */
    public initArmatureMoreFile(skeletonData:any):void{
        this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        var textureList = skeletonData.textureList;
        var sheetList = skeletonData.sheetList;
        var atlas:EgretTextureAtlasMore = new EgretTextureAtlasMore(RES.getRes(textureList[0]), RES.getRes(sheetList[0]), skeletonData.name);
        var len:number = textureList.length;
        for(var i = 1; i < len; i ++){
            atlas.register(RES.getRes(textureList[i]), RES.getRes(sheetList[i]));
        }
        this.factory.addTextureAtlas(atlas);
    }

    /**
     * 添加动画描述文件
     * @param skeletonData
     */
    public addSkeletonData(skeletonData:any):void{
        this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
    }

    /**
     * 添加动画所需资源
     * @param texture 动画资源
     * @param textureData 动画资源描述文件
     */
    public addTextureAtlas(texture:egret.Texture, textureData:any):void{
        this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
    }

    /**
     * 创建一个动画
     * @param name 动作名称
     * @param fromDragonBonesDataName 动画文件名称
     * @returns {Armature}
     */
    public makeArmature(name:string, fromDragonBonesDataName?:string, playSpeed:number = 1):DragonBonesArmature{
        var armature:dragonBones.Armature = this.factory.buildArmature(name, fromDragonBonesDataName);
        if(armature == null){
            Log.trace("不存在Armature： "+name);
        }
        var clock:dragonBones.WorldClock = this.clocks[playSpeed];
        if(clock == null){
            clock = new dragonBones.WorldClock();
            this.clocks[playSpeed] = clock;
        }
        var result:DragonBonesArmature = new DragonBonesArmature(armature, clock);
        return result;
    }

    /**
     * dragonBones体系的每帧刷新
     * @param advancedTime
     */
    private onEnterFrame(advancedTime:number):void {
        var time:number = advancedTime / 1000;
        for(var key in this.clocks){
            var clock:dragonBones.WorldClock = this.clocks[key];
            clock.advanceTime(time * key);
        }
    }

    /**
     * 停止
     */
    public stop():void{
        if(this.isPlay){
            App.TimerManager.remove(this.onEnterFrame, this);
            this.isPlay = false;
        }
    }

    /**
     * 开启
     */
    public start():void{
        if (!this.isPlay) {
            this.isPlay = true;
            App.TimerManager.doFrame(1, 0, this.onEnterFrame, this);
        }
    }
}
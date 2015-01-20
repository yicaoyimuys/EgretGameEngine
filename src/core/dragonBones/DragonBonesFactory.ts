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

    /**
     * 构造函数
     */
    public constructor(){
        this.factory = new dragonBones.EgretFactory();
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
        this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
    }

    /**
     * 创建一个动画
     * @param name 动作名称
     * @param fromDragonBonesDataName 动画文件名称
     * @returns {Armature}
     */
    public makeArmature(name:string, fromDragonBonesDataName?:string):DragonBonesArmature{
        var armature:dragonBones.Armature = this.factory.buildArmature(name, fromDragonBonesDataName);
        if(armature == null){
            Log.trace("不存在Armature： "+name);
        }
        var result:DragonBonesArmature = new DragonBonesArmature(armature, dragonBones.WorldClock.clock);
        return result;
    }

    /**
     * dragonBones体系的每帧刷新
     * @param advancedTime
     */
    private onEnterFrame(advancedTime:number):void {
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    }

    /**
     * 停止
     */
    public stop():void{
        if(this.isPlay){
            egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
            this.isPlay = false;
        }
    }

    /**
     * 开启
     */
    public start():void{
        if (!this.isPlay) {
            this.isPlay = true;
            egret.Ticker.getInstance().register(this.onEnterFrame, this);
        }
    }
}
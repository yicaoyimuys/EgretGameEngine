/**
 * Created by egret on 15-1-14.
 * DragonBones工厂类
 */
class DragonBonesFactory extends BaseClass {
    private averageUtils:AverageUtils;
    private factory:dragonBones.EgretFactory;
    private isPlay:boolean;
    private clocks:Array<dragonBones.WorldClock>;
    private clocksLen:number;
    private files:Array<string>;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.averageUtils = new AverageUtils();
        this.factory = new dragonBones.EgretFactory();
        this.clocks = new Array<dragonBones.WorldClock>();
        this.clocksLen = 0;
        this.files = [];
        //默认开启
        this.start();
    }

    /**
     * 初始化一个动画文件
     * @param skeletonData 动画描述文件
     * @param texture 动画资源
     * @param textureData 动画资源描述文件
     */
    public initArmatureFile(skeletonData:any, texture:egret.Texture, textureData:any):void {
        if (this.files.indexOf(skeletonData.name) != -1) {
            return;
        }
        this.addSkeletonData(skeletonData);
        this.addTextureAtlas(texture, textureData);
        this.files.push(skeletonData.name);
    }

    /**
     * 移除动画文件
     * @param name
     */
    public removeArmatureFile(name:string):void {
        var index:number = this.files.indexOf(name);
        if (index != -1) {
            this.removeSkeletonData(name);
            this.removeTextureAtlas(name);
            this.files.splice(index, 1);
        }
    }

    /**
     * 清空所有动画
     */
    public clear():void {
        while (this.files.length) {
            this.removeArmatureFile(this.files[0]);
        }
    }

    /**
     * 添加动画描述文件
     * @param skeletonData
     */
    public addSkeletonData(skeletonData:any):void {
        this.factory.parseDragonBonesData(skeletonData);
    }

    /**
     * 添加动画所需资源
     * @param texture 动画资源
     * @param textureData 动画资源描述文件
     */
    public addTextureAtlas(texture:egret.Texture, textureData:any):void {
        this.factory.parseTextureAtlasData(textureData, texture);
    }

    /**
     * 移除动画描述文件
     * @param skeletonData
     */
    public removeSkeletonData(name:string):void {
        this.factory.removeDragonBonesData(name);
    }

    /**
     * 移除动画所需资源
     * @param texture 动画资源
     * @param textureData 动画资源描述文件
     */
    public removeTextureAtlas(name:string):void {
        this.factory.removeTextureAtlasData(name);
    }

    /**
     * 创建一个动画
     * @param name 动作名称
     * @param fromDragonBonesDataName 动画文件名称
     * @returns {Armature}
     */
    public makeArmature(name:string, fromDragonBonesDataName?:string, playSpeed:number = 1):DragonBonesArmature {
        var armature:dragonBones.Armature = this.factory.buildArmature(name, fromDragonBonesDataName);
        if (armature == null) {
            Log.trace("不存在Armature： " + name);
            return null;
        }
        var clock:dragonBones.WorldClock = this.createWorldClock(playSpeed);
        var result:DragonBonesArmature = new DragonBonesArmature(armature, clock);
        return result;
    }

    /**
     * 创建一个动画（急速模式）
     * @param name 动作名称
     * @param fromDragonBonesDataName 动画文件名称
     * @returns {Armature}
     */
    public makeFastArmature(name:string, fromDragonBonesDataName?:string, playSpeed:number = 1):DragonBonesArmature {
        var result:DragonBonesArmature = this.makeArmature(name, fromDragonBonesDataName, playSpeed);
        result.getArmature().cacheFrameRate = 24;
        return result;
    }

    /**
     * 创建WorldClock
     * @param playSpeed
     * @returns {dragonBones.WorldClock}
     */
    private createWorldClock(playSpeed:number):dragonBones.WorldClock {
        for (var i:number = 0; i < this.clocksLen; i++) {
            if (this.clocks[i].timeScale == playSpeed) {
                return this.clocks[i];
            }
        }
        var newClock:dragonBones.WorldClock = new dragonBones.WorldClock();
        newClock.timeScale = playSpeed;
        this.clocks.push(newClock);
        this.clocksLen = this.clocks.length;
        return newClock;
    }

    /**
     * dragonBones体系的每帧刷新
     * @param advancedTime
     */
    private onEnterFrame(advancedTime:number):void {
        this.averageUtils.push(advancedTime);
        var time:number = this.averageUtils.getValue() * 0.001;
        for (var i:number = 0; i < this.clocksLen; i++) {
            var clock:dragonBones.WorldClock = this.clocks[i];
            clock.advanceTime(time);
        }
    }

    /**
     * 停止
     */
    public stop():void {
        if (this.isPlay) {
            App.TimerManager.remove(this.onEnterFrame, this);
            this.isPlay = false;
        }
    }

    /**
     * 开启
     */
    public start():void {
        if (!this.isPlay) {
            this.isPlay = true;
            App.TimerManager.doFrame(1, 0, this.onEnterFrame, this);
        }
    }
}
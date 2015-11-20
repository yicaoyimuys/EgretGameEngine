/**
 * Created by yangsong on 15-1-16.
 * DragonBonesArmature容器类，用于一个动画使用多个DragonBonesArmature的情况
 */
class DragonBonesArmatureContainer extends egret.DisplayObjectContainer {
    private armatures:Array<DragonBonesArmature>;
    private actions:any;
    private currArmatureIndex:number;
    private cacheBones:any;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.armatures = new Array<DragonBonesArmature>();
        this.actions = {};
        this.cacheBones = {};
    }

    /**
     * 注册缩需要的DragonBonesArmature
     * @param $armature DragonBonesArmature
     * @param $actions 当前DragonBonesArmature所有的动作
     */
    public register($armature:DragonBonesArmature, $actions:Array<string>):void {
        this.armatures.push($armature);

        for (var i:number = 0, len:number = $actions.length; i < len; i++) {
            this.actions[$actions[i]] = this.armatures.length - 1;
        }
    }

    /**
     * 当前正在使用的armature
     * @returns {DragonBonesArmature}
     */
    public get armature():DragonBonesArmature {
        return this.armatures[this.currArmatureIndex];
    }

    /**
     * 获取Bone
     * @param boneName
     * @returns {any}
     */
    public getCacheBone(boneName:string):dragonBones.Bone {
        if (!this.cacheBones[boneName]) {
            this.cacheBones[boneName] = [];
            for (var i:number = 0, len = this.armatures.length; i < len; i++) {
                var arm:DragonBonesArmature = this.armatures[i];
                this.cacheBones[boneName].push(arm.getBone(boneName));
            }
        }
        return this.cacheBones[boneName][this.currArmatureIndex];
    }

    /**
     * 播放动作
     * @param action
     * @param playNum
     */
    public play(action:string, playNum:number = undefined):dragonBones.AnimationState {
        if (this.actions[action] == null) {
            Log.trace("DragonBonesArmatureContainer不存在动作：", action);
            return;
        }
        var armatureIndex:number = this.actions[action];
        if (armatureIndex != this.currArmatureIndex) {
            this.remove();
        }

        var newArm:DragonBonesArmature = this.armatures[armatureIndex];
        if (newArm) {
            this.addChild(newArm);
            this.currArmatureIndex = armatureIndex;
            return newArm.play(action, playNum);
        }

        return null;
    }

    /**
     * 停止当前DragonBonesArmature
     */
    public stop():void {
        var currArm:DragonBonesArmature = this.armatures[this.currArmatureIndex];
        if (currArm) {
            currArm.stop();
        }
    }

    /**
     * 播放
     */
    public start():void {
        var currArm:DragonBonesArmature = this.armatures[this.currArmatureIndex];
        if (currArm) {
            currArm.start();
        }
    }

    /**
     * 移除上一个DragonBonesArmature
     */
    public remove():void {
        var oldArm:DragonBonesArmature = this.armatures[this.currArmatureIndex];
        if (oldArm) {
            oldArm.stop();
            App.DisplayUtils.removeFromParent(oldArm);
            this.currArmatureIndex = null;
        }
    }

    /**
     * 添加播放完成处理函数
     * @param callFunc
     * @param target
     */
    public addCompleteCallFunc(callFunc:Function, target:any):void {
        for (var i:number = 0, len = this.armatures.length; i < len; i++) {
            var arm:DragonBonesArmature = this.armatures[i];
            arm.addCompleteCallFunc(callFunc, target);
        }
    }

    /**
     * 移除播放完成处理函数
     * @param callFunc
     * @param target
     */
    public removeCompleteCallFunc(callFunc:Function, target:any):void {
        for (var i:number = 0, len = this.armatures.length; i < len; i++) {
            var arm:DragonBonesArmature = this.armatures[i];
            arm.removeCompleteCallFunc(callFunc, target);
        }
    }

    /**
     * 添加帧事件处理函数
     * @param callFunc
     * @param target
     */
    public addFrameCallFunc(callFunc:Function, target:any):void {
        for (var i:number = 0, len = this.armatures.length; i < len; i++) {
            var arm:DragonBonesArmature = this.armatures[i];
            arm.addFrameCallFunc(callFunc, target);
        }
    }

    /**
     * 移除帧事件处理函数
     * @param key
     * @param callFunc
     * @param target
     */
    public removeFrameCallFunc(callFunc:Function, target:any):void {
        for (var i:number = 0, len = this.armatures.length; i < len; i++) {
            var arm:DragonBonesArmature = this.armatures[i];
            arm.removeFrameCallFunc(callFunc, target);
        }
    }

    /**
     * 清空
     */
    public clear():void {
        while (this.armatures.length) {
            var arm:DragonBonesArmature = this.armatures.pop();
            App.DisplayUtils.removeFromParent(arm);
            arm.destroy();
        }
        this.cacheBones = {};
        this.actions = {};
    }

    /**
     * 销毁
     */
    public destroy() {
        this.clear();
        this.armatures = null;
        this.cacheBones = null;
        this.actions = null;
    }
}
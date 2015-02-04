/**
 * Created by yangsong on 15-1-16.
 * DragonBonesArmature容器类，用于一个动画使用多个DragonBonesArmature的情况
 */
class DragonBonesArmatureContainer extends egret.DisplayObjectContainer{
    private armatures:Array<DragonBonesArmature>;
    private actions:any;
    private currArmatureIndex:number;

    /**
     * 构造函数
     */
    public constructor(){
        super();
        this.armatures = new Array<DragonBonesArmature>();
        this.actions = {};
    }

    /**
     * 注册缩需要的DragonBonesArmature
     * @param $armature DragonBonesArmature
     * @param $actions 当前DragonBonesArmature所有的动作
     */
    public register($armature:DragonBonesArmature, $actions:Array<string>):void{
        this.armatures.push($armature);

        for(var i:number=0, len:number=$actions.length; i<len; i++){
            this.actions[$actions[i]] = this.armatures.length - 1;
        }
    }

    /**
     * 播放动作
     * @param action
     * @param playNum
     * @param isRefurbish
     */
    public play(action:string, playNum:number = 0, isRefurbish:boolean = false):dragonBones.AnimationState{
        var armatureIndex:number = this.actions[action];
        if(armatureIndex != this.currArmatureIndex){
            this.remove();
        }

        var newArm:DragonBonesArmature = this.armatures[armatureIndex];
        if(newArm){
            App.EgretExpandUtils.addChild(this, newArm);
            this.currArmatureIndex = armatureIndex;
            return newArm.play(action, playNum, isRefurbish);
        }

        return null;
    }

    /**
     * 停止当前DragonBonesArmature
     */
    public stop():void{
        var currArm:DragonBonesArmature = this.armatures[this.currArmatureIndex];
        if(currArm){
            currArm.stop();
        }
    }

    /**
     * 移除上一个DragonBonesArmature
     */
    public remove():void{
        var oldArm:DragonBonesArmature = this.armatures[this.currArmatureIndex];
        if(oldArm){
            oldArm.stop();
            App.EgretExpandUtils.removeFromParent(oldArm);
            this.currArmatureIndex = null;
        }
    }

    /**
     * 添加播放完成处理函数
     * @param callFunc
     * @param target
     */
    public addCompleteCallFunc(callFunc:Function, target:any):void {
        for(var key in this.armatures){
            var arm:DragonBonesArmature = this.armatures[key];
            arm.addCompleteCallFunc(callFunc, target);
        }
    }

    /**
     * 移除播放完成处理函数
     * @param callFunc
     * @param target
     */
    public removeCompleteCallFunc(callFunc:Function, target:any):void {
        for(var key in this.armatures){
            var arm:DragonBonesArmature = this.armatures[key];
            arm.removeCompleteCallFunc(callFunc, target);
        }
    }

    /**
     * 添加帧事件处理函数
     * @param callFunc
     * @param target
     */
    public addFrameCallFunc(callFunc:Function, target:any):void {
        for(var key in this.armatures){
            var arm:DragonBonesArmature = this.armatures[key];
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
        for(var key in this.armatures){
            var arm:DragonBonesArmature = this.armatures[key];
            arm.removeFrameCallFunc(callFunc, target);
        }
    }

    /**
     * 销毁
     */
    public destroy() {
        for(var key in this.armatures){
            var arm:DragonBonesArmature = this.armatures[key];
            App.EgretExpandUtils.removeFromParent(arm);
            arm.destroy();
            this.armatures[key] = null;
            delete this.armatures[key];
        }
    }
}
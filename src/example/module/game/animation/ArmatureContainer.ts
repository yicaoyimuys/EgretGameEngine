/**
 * Created by yangsong on 15-1-16.
 */
class ArmatureContainer extends egret.DisplayObjectContainer{
    private armatures:any;
    private currArmatureKey:string;

    public constructor(){
        super();
        this.armatures = {};
    }

    public register(key:string, armature:DragonBonesArmature):void{
        this.armatures[key] = armature;
    }

    public play(key:string, playNum:number = 0):void{
        if(key == this.currArmatureKey){
            return;
        }

        this.stop();

        var newArm:DragonBonesArmature = this.armatures[key];
        if(newArm){
            newArm.play("unnamed", playNum).autoTween = false;
            this.addChild(newArm);
            this.currArmatureKey = key;
        }
    }

    public stop():void{
        if(this.currArmatureKey){
            var oldArm:DragonBonesArmature = this.armatures[this.currArmatureKey];
            if(oldArm){
                oldArm.stop();
                this.removeChild(oldArm);
                this.currArmatureKey = null;
            }
        }
    }

    public addCompleteCallFunc(key:string, callFunc:Function, target:any):void {
        var arm:DragonBonesArmature = this.armatures[key];
        if(arm) {
            arm.addCompleteCallFunc(callFunc, target);
        }
    }

    public removeCompleteCallFunc(key:string, callFunc:Function, target:any):void {
        var arm:DragonBonesArmature = this.armatures[key];
        if(arm){
            arm.addCompleteCallFunc(callFunc, target);
        }
    }

    public addFrameCallFunc(key:string, callFunc:Function, target:any):void {
        var arm:DragonBonesArmature = this.armatures[key];
        if(arm){
            arm.addFrameCallFunc(callFunc, target);
        }
    }

    public removeFrameCallFunc(key:string, callFunc:Function, target:any):void {
        var arm:DragonBonesArmature = this.armatures[key];
        if(arm){
            arm.removeFrameCallFunc(callFunc, target);
        }
    }

    public destroy() {
        for(var key in this.armatures){
            var arm:DragonBonesArmature = this.armatures[key];
            arm.destroy();
            this.armatures[key] = null;
            delete this.armatures[key];
        }
    }
}
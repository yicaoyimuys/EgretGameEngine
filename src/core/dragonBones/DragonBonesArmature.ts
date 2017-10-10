/**
 * Created by yangsong on 15-1-14.
 * Armature封装类
 */
class DragonBonesArmature extends egret.DisplayObjectContainer {
    private _armature:dragonBones.Armature;
    private _clock:dragonBones.WorldClock;

    private _completeCalls:Array<any>;
    private _frameCalls:Array<any>;

    private _isPlay:boolean;
    private _playName:string;

    private _currAnimationState:dragonBones.AnimationState;

    /**
     * 构造函数
     * @param armature dragonBones.Armature
     * @param clock dragonBones.WorldClock
     */
    public constructor(armature:dragonBones.Armature, clock:dragonBones.WorldClock) {
        super();

        this._armature = armature;
        this._clock = clock;
        this.addChild(<egret.DisplayObject>this._armature.display);

        this._completeCalls = [];
        this._frameCalls = [];

        this._isPlay = false;
        this._playName = "";
    }

    /**
     * 添加事件监听
     */
    private addListeners():void {
        this._armature.eventDispatcher.addEvent(dragonBones.EventObject.COMPLETE, this.completeHandler, this);
        this._armature.eventDispatcher.addEvent(dragonBones.EventObject.FRAME_EVENT, this.frameHandler, this);
    }

    /**
     * 移除事件监听
     */
    private removeListeners():void {
        this._armature.eventDispatcher.removeEvent(dragonBones.EventObject.COMPLETE, this.completeHandler, this);
        this._armature.eventDispatcher.removeEvent(dragonBones.EventObject.FRAME_EVENT, this.frameHandler, this);
    }

    /**
     * 事件完成执行函数
     * @param e
     */
    private completeHandler(e:dragonBones.EgretEvent):void {
        var animationName:string = e.eventObject.animationState.name;
        for (var i:number = 0, len = this._completeCalls.length; i < len; i++) {
            var arr:Array<any> = this._completeCalls[i];
            arr[0].apply(arr[1], [e, animationName]);
        }
        if (animationName == this._playName) {
            this._playName = "";
        }
    }

    /**
     * 帧事件处理函数
     * @param e
     */
    private frameHandler(e:dragonBones.EgretEvent):void {
        for (var i:number = 0, len = this._frameCalls.length; i < len; i++) {
            var arr:Array<any> = this._frameCalls[i];
            arr[0].apply(arr[1], [e]);
        }
    }

    /**
     * 播放名为name的动作
     * @param name 名称
     * @param playNum 指定播放次数，默认走动画配置
     */
    public play(name:string, playNum:number = undefined):dragonBones.AnimationState {
        if(this._playName == name){
            return this._currAnimationState;
        }
        this._playName = name;
        this.start();
        if (playNum == undefined) {
            this._currAnimationState = this.getAnimation().play(name);
        }
        else {
            this._currAnimationState = this.getAnimation().play(name, playNum);
        }
        return this._currAnimationState;
    }

    /**
     * 恢复播放
     */
    public start():void {
        if (!this._isPlay) {
            this._clock.add(this._armature);
            this._isPlay = true;
            this.addListeners();
        }
    }

    /**
     * 停止播放
     */
    public stop():void {
        if (this._isPlay) {
            this._clock.remove(this._armature);
            this._isPlay = false;
            this._playName = "";
            this.removeListeners();
        }
    }

    /**
     * 销毁
     */
    public destroy() {
        this.stop();

        if (this.parent) {
            this.parent.removeChild(this);
        }

        this.removeChildren();

        this._armature = null;
        this._clock = null;

        this._completeCalls = null;
        this._frameCalls = null;
    }

    /**
     * 添加动画完成函数
     * @param callFunc 函数
     * @param target 函数所属对象
     */
    public addCompleteCallFunc(callFunc:Function, target:any):void {
        for (var i = 0; i < this._completeCalls.length; i++) {
            var arr:Array<any> = this._completeCalls[i];
            if (arr[0] == callFunc && arr[1] == target) {
                return;
            }
        }
        this._completeCalls.unshift([callFunc, target]);
    }

    /**
     * 移除一个动画完成函数
     * @param callFunc 函数
     * @param target 函数所属对象
     */
    public removeCompleteCallFunc(callFunc:Function, target:any):void {
        for (var i = 0; i < this._completeCalls.length; i++) {
            var arr:Array<any> = this._completeCalls[i];
            if (arr[0] == callFunc && arr[1] == target) {
                this._completeCalls.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 添加帧事件处理函数
     * @param callFunc 函数
     * @param target 函数所属对象
     */
    public addFrameCallFunc(callFunc:Function, target:any):void {
        for (var i = 0; i < this._frameCalls.length; i++) {
            var arr:Array<any> = this._frameCalls[i];
            if (arr[0] == callFunc && arr[1] == target) {
                return;
            }
        }
        this._frameCalls.push([callFunc, target]);
    }

    /**
     * 移除帧事件处理函数
     * @param callFunc 函数
     * @param target 函数所属对象
     */
    public removeFrameCallFunc(callFunc:Function, target:any):void {
        for (var i = 0; i < this._frameCalls.length; i++) {
            var arr:Array<any> = this._frameCalls[i];
            if (arr[0] == callFunc && arr[1] == target) {
                this._frameCalls.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 移除舞台处理
     * @private
     */
    public $onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.stop();
    }

    /**
     * 获取dragonBones.Armature
     * @returns {dragonBones.Armature}
     */
    public getArmature():dragonBones.Armature {
        return this._armature;
    }

    /**
     * 获取当前dragonBones.AnimationState
     * @returns {dragonBones.AnimationState}
     */
    public getCurrAnimationState():dragonBones.AnimationState {
        return this._currAnimationState;
    }

    /**
     * 获取所属dragonBones.WorldClock
     * @returns {dragonBones.WorldClock}
     */
    public getClock():dragonBones.WorldClock {
        return this._clock;
    }

    /**
     * 获取dragonBones.Animation
     * @returns {Animation}
     */
    public getAnimation():dragonBones.Animation {
        return this._armature.animation;
    }

    /**
     * 获取一个dragonBones.Bone
     * @param boneName
     * @returns {dragonBones.Bone}
     */
    public getBone(boneName:string):dragonBones.Bone {
        return this._armature.getBone(boneName);
    }

    /**
     * 当前正在播放的动作名字
     * @returns {string}
     */
    public getPlayName():string {
        return this._playName;
    }

    /**
     * 获取骨骼的display
     * @param bone
     * @returns {function(): any}
     */
    public getBoneDisplay(bone:dragonBones.Bone):egret.DisplayObject {
        return bone.slot.display;
    }

    /**
     * 替换骨骼插件
     * @param boneName
     * @param displayObject
     */
    public changeBone(boneName:string, displayObject:egret.DisplayObject):void {
        var bone:dragonBones.Bone = this.getBone(boneName);
        if (bone) {
            bone.slot.setDisplay(displayObject);
        }
    }
}

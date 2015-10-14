/**
 * Created by egret on 15-1-16.
 */
class BaseGameObject extends egret.DisplayObjectContainer {
    public static ACTION_Idle:string = "daiji";
    public static ACTION_Move:string = "yidong";
    public static ACTION_Hart:string = "beiji";
    public static ACTION_Fly:string = "jifei";
    public static ACTION_Land:string = "daodi";
    public static ACTION_jump:string = "jump";

    private originX:number = 0;
    private originY:number = 0;
    private originZ:number = 0;
    private trueY:number = 0;

    public controller:BaseController;
    public armature:DragonBonesArmatureContainer;
    public hp:number;
    public isDie:boolean;

    public constructor($controller:BaseController) {
        super();
        this.armature = new DragonBonesArmatureContainer();
        this.addChild(this.armature);

        this.controller = $controller;
    }

    public init():void{
        this.hp = 300;
        this.isDie = false;
        App.TimerManager.doFrame(1, 0, this.onFrame, this);
    }

    public destory():void{
        this.armature.stop();
        App.TimerManager.remove(this.onFrame, this);
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    }

    private onFrame(time:number):void{
        this.update(time);
        this.setPos();
    }

    public setPos():void{
        if(this.$getX() != this.originX){
            this.$setX(this.originX);
        }

        if(this.$getY() != this.trueY){
            this.$setY(this.trueY);
        }
    }

    public update(time:number):void{

    }

    public registerArmature(actionName:string):void{
    }

    public set x(value:number) {
        this.originX = value;
    }

    public set y(value:number) {
        this.originY = value;
        this.trueY = this.originY + this.originZ;
    }

    public set z(value:number) {
        this.originZ = value;
        this.trueY = this.originY + this.originZ;
    }

    public get x():number {
        return this.originX;
    }

    public get y():number {
        return this.originY;
    }

    public get z():number {
        return this.originZ;
    }

    public get gameController():GameController{
        return <GameController>this.controller;
    }

    public isMyFront(obj:BaseGameObject):boolean{
        return this.scaleX == 1 ? this.x <= obj.x : this.x >= obj.x;
    }

    public isMyBack(obj:BaseGameObject):boolean{
        return this.scaleX == -1 ? this.x <= obj.x : this.x >= obj.x;
    }

    public isMyLeft(obj:BaseGameObject):boolean{
        return this.scaleX == -1 ? this.y <= obj.y : this.y >= obj.y;
    }

    public isMyRight(obj:BaseGameObject):boolean{
        return this.scaleX == 1 ? this.y <= obj.y : this.y >= obj.y;
    }

    public isMyTop(obj:BaseGameObject):boolean{
        return this.z >= obj.z;
    }

    public isMyDown(obj:BaseGameObject):boolean{
        return this.z <= obj.z;
    }
}
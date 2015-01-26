/**
 * Created by egret on 15-1-16.
 */
class BaseGameObject extends egret.DisplayObjectContainer {
    private originX:number = 0;
    private originY:number = 0;
    private originZ:number = 0;
    private trueY:number = 0;

    public dragonBonesDataName:string;
    public controller:BaseController;
    public armature:DragonBonesArmature;

    public constructor($dragonBonesDataName:string, $controller:BaseController) {
        super();
        this.dragonBonesDataName = $dragonBonesDataName;
        this.armature = DragonBonesFactory.getInstance().makeArmature($dragonBonesDataName, $dragonBonesDataName);
        this.addChild(this.armature);

        this.controller = $controller;
        App.TimerManager.doFrame(1, 0, this.onFrame, this);
    }

    private onFrame(time:number):void{
        this.update(time);
        this.setPos();
    }

    public setPos():void{
        if(this._x != this.originX){
            this._setX(this.originX);
        }

        if(this._y != this.trueY){
            this._setY(this.trueY);
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

    public loseHp():void{
        var txt:egret.Bitmap = ObjectPool.pop(egret.Bitmap);
        if(txt.texture == null){
            txt.texture = RES.getRes("losehp_png");
        }
        txt.x = this.x;
        txt.y = this.y-100;
        txt.anchorX = 0.5;
        egret.Tween.get(txt).to({y: this.y-300},500).call(function():void{
            LayerManager.Game_Main.removeChild(txt);
            ObjectPool.push(txt);
        }, this);
        LayerManager.Game_Main.addChild(txt);
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
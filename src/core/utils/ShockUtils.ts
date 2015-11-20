/**
 * Created by Channing on 2014/12/6.
 * 震动
 */
class ShockUtils extends BaseClass {
    public constructor() {
        super();
    }

    public MAP:number = 0;
    public SPRITE:number = 1;
    private mapPoss:Array<any> = [new egret.Point(0, 3), new egret.Point(0, 0), new egret.Point(0, -2)];
    private spritePoss:Array<any> = [new egret.Point(5, 0), new egret.Point(-5, 0), new egret.Point(5, 0)];
    private _shockPoss:Array<any>;
    private _shockLength:number = 0;
    private _shockCount:number = 0;
    private _target:egret.DisplayObject;
    private _rx:number = 0;
    private _ry:number = 0;
    private _type:number = 0;

    private _repeatCount:number = 0;

    public destroy():void {
        this.stop();
    }

    public shock(type:number = 0, target:egret.DisplayObject = null, repeatCount:number = 3):void {
        if (this._target) {
            return;
        }

        this._type = type;
        this._target = target;

        if (this._type == this.MAP) {
            this._shockPoss = this.mapPoss.concat();
            this._shockLength = this._shockPoss.length;
        }
        else if (this._type == this.SPRITE) {
            this._shockPoss = this.spritePoss.concat();
            this._shockLength = this._shockPoss.length;
        }

        this.start(repeatCount);
    }

    private start(num:number = 1):void {
        this.repeatCount = num;
        this._shockCount = 0;
        if (this._target) {
            if (this._type != this.MAP) {
                this._rx = this._target.x;
            }
            this._ry = this._target.y;
            App.TimerManager.doFrame(1, 0, this.onShockEnter, this);
        }
    }

    private stop():void {
        if (this._target) {
            if (this._type != this.MAP) {
                this._target.x = this._rx;
            }
            this._target.y = this._ry;
            App.TimerManager.remove(this.onShockEnter, this);
        }
        this._target = null;
    }

    private onShockEnter(time:number):void {
        var maxCount:number = this._shockLength * this._repeatCount;
        if (this._shockCount >= maxCount) {
            this.stop();
            return;
        }
        var index:number = this._shockCount % this._shockLength;
        var pos:egret.Point = this._shockPoss[index];
        if (this._target) {
            if (this._type != this.MAP) {
                this._target.x = this._rx + pos.x;
            }
            this._target.y = this._ry + pos.y;
        }
        this._shockCount++;
    }

    public get repeatCount():number {
        return this._repeatCount;
    }

    public set repeatCount(value:number) {
        this._repeatCount = value;
    }
}
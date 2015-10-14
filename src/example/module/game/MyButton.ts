/**
 * Created by egret on 15-1-16.
 */
class MyButton extends egret.Sprite{
    private _func:Function;
    private _target:any;

    public constructor(buttonName:string, $x:number, $y:number, func?:Function, target?:any){
        super();
        this._func = func;
        this._target = target;

        this.width = 100;
        this.height = 40;

        this.graphics.beginFill(0x333333, 1);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();

        var txt:egret.TextField = new egret.TextField();
        txt.textColor = 0xFFFFFF;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.text = buttonName;
        txt.width = this.width;
        txt.height = 20;
        txt.size = 20;
        txt.y = (this.height - txt.height)*0.5;
        this.addChild(txt);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.x = $x;
        this.y = $y;
    }

    private onClick(e:egret.TouchEvent):void{
        e.stopPropagation();
        if(this._func)
            this._func.call(this._target);
    }
}
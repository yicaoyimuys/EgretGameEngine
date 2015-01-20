/**
 * Created by egret on 15-1-19.
 */
class GameUIView extends egret.DisplayObjectContainer{

    private keys:Array<number>;

    private moveFlagCheckRec:egret.Rectangle;
    private moveFlag:egret.Bitmap;
    private moveFlagX:number;
    private moveFlagY:number;
    private isMoveing:boolean;
    private moveFlagGoX:number;
    private moveFlagGoY:number;
    private checkKeying:boolean;

    private hero:Hero;
    public constructor($hero:Hero){
        super();

        this.hero = $hero;

        this.keys = [0, 0];

        //攻击图标
        this.addChild(this.createImageButton("ui_btnAttack_png", "ui_btnAttack1_png", App.StageUtils.getWidth()-55, App.StageUtils.getHeight() - 53, this.heroAttack));
        //技能图标
        this.addChild(this.createImageButton("ui_btnSkill_png", "ui_btnSkill1_png", App.StageUtils.getWidth()-155, App.StageUtils.getHeight() - 45, this.heroSkill1));

        //摇杆
        this.moveFlagX = 120;
        this.moveFlagY = App.StageUtils.getHeight() - 120;

        var moveBg:egret.Bitmap = App.DisplayUtils.createBitmap("ui_moveBg_png");
        moveBg.anchorX = moveBg.anchorY = 0.5;
        moveBg.x = this.moveFlagX;
        moveBg.y = this.moveFlagY;
        this.addChild(moveBg);

        this.moveFlagCheckRec = new egret.Rectangle(this.moveFlagX - moveBg.width, this.moveFlagY - moveBg.height, moveBg.width*2, moveBg.height*2);

        this.moveFlag = App.DisplayUtils.createBitmap("ui_move_png");
        this.moveFlag.touchEnabled = true;
        this.moveFlag.anchorX = this.moveFlag.anchorY = 0.5;
        this.moveFlag.x = this.moveFlagX;
        this.moveFlag.y = this.moveFlagY;
        this.moveFlag.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startHeroMove, this);
        this.moveFlag.addEventListener(egret.TouchEvent.TOUCH_END, this.stopHeroMove, this);
        this.moveFlag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopEvent, this);
        this.addChild(this.moveFlag);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startHeroMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.stopHeroMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.heroMove, this);
    }

    private startCheckKey():void{
        if(!this.checkKeying){
            this.checkKeying = true;
            App.TimerManager.doFrame(1, 0, this.delKeys, this);
        }
    }

    public stopCheckKey():void{
        this.keys[0] = 0;
        this.keys[1] = 0;
        if(this.checkKeying){
            App.TimerManager.remove(this.delKeys, this);
            this.checkKeying = false;
        }
    }

    private delKeys():void{
        if(this.hero.isAttack){
            return;
        }

        if(!this.moveFlagCheckRec.contains(this.moveFlagGoX, this.moveFlagGoY)){
            this.stopHeroMove();
        }

        if(this.moveFlag.x != this.moveFlagGoX){
            this.moveFlag.x = this.moveFlagGoX;
        }

        if(this.moveFlag.y != this.moveFlagGoY){
            this.moveFlag.y = this.moveFlagGoY;
        }

        if(this.keys[0] || this.keys[1]){
            this.hero.addSpeedXY(this.keys[0], this.keys[1], 5);
        }
        else{
            if(this.hero.isMove){
                this.hero.stopMove();
                this.stopCheckKey();
            }
        }
    }

    private stopEvent(e:egret.TouchEvent):void {
        e.stopPropagation();
    }

    private startHeroMove():void{
        this.isMoveing = true;
        this.moveFlagGoX = this.moveFlagX;
        this.moveFlagGoY = this.moveFlagY;
    }

    public stopHeroMove():void{
        this.isMoveing = false;
        this.keys[0] = 0;
        this.keys[1] = 0;
        this.moveFlagGoX = this.moveFlagX;
        this.moveFlagGoY = this.moveFlagY;
    }

    private heroMove(e:egret.TouchEvent):void{
        if(!this.isMoveing)
            return;

        if(e.localX > App.StageUtils.getWidth()*0.3)
            return;

        this.moveFlagGoX = e.localX;
        this.moveFlagGoY = e.localY;

        if(this.moveFlagGoX > this.moveFlagX && Math.abs(this.moveFlagGoX - this.moveFlagX) > 10){
            this.keys[0] = 1;
        }else if(this.moveFlagGoX < this.moveFlagX && Math.abs(this.moveFlagGoX - this.moveFlagX) > 10){
            this.keys[0] = -1;
        }else{
            this.keys[0] = 0;
        }

        if(this.moveFlagGoY > this.moveFlagY && Math.abs(this.moveFlagGoY - this.moveFlagY) > 10){
            this.keys[1] = 1;
        }else if(this.moveFlagGoY < this.moveFlagY && Math.abs(this.moveFlagGoY - this.moveFlagY) > 10){
            this.keys[1] = -1;
        }else{
            this.keys[1] = 0;
        }

        this.startCheckKey();
    }

    private heroAttack():void{
        if(this.hero.isAttack)
            return;
        this.hero.attack();
    }

    private heroSkill1():void{
        if(this.hero.isAttack)
            return;
        this.hero.skill(1);
    }

    private heroSkill2():void{
        if(this.hero.isAttack)
            return;
        this.hero.skill(2);
    }

    private heroSkill3():void{
        if(this.hero.isAttack)
            return;
        this.hero.skill(3);
    }

    private heroSkill4():void{
        if(this.hero.isAttack)
            return;
        this.hero.skill(4);
    }

    private heroSkill5():void{
        if(this.hero.isAttack)
            return;
        this.hero.skill(5);
    }

    private createImageButton(imgName1:string, imgName2:string, $x:number, $y:number, callBack:Function):egret.Bitmap{
        var bitmap:egret.Bitmap = App.DisplayUtils.createBitmap(imgName1);
        bitmap.touchEnabled = true;
        bitmap.anchorX = bitmap.anchorY = 0.5;
        bitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function():void{
            bitmap.texture = RES.getRes(imgName2);
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_END, function():void{
            bitmap.texture = RES.getRes(imgName1);
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function():void{
            callBack.call(this);
        }, this);
        bitmap.x = $x;
        bitmap.y = $y;
        return bitmap;
    }
}
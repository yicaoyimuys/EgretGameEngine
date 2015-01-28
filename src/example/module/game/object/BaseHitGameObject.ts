/**
 * Created by egret on 15-1-27.
 */
class BaseHitGameObject extends BaseAIGameObject{
    public constructor($dragonBonesDataName:string, $controller:BaseController) {
        super($dragonBonesDataName, $controller);
    }

    private onAttack():boolean{
        if(this.isAttack){
            return false;
        }
        if(this.isMove){
            this.stopMove();
        }

        this.stopAi();
        return true;
    }

    public loseHp():void{
        var txt:egret.Bitmap = ObjectPool.pop(egret.Bitmap);
        if(txt.texture == null){
            txt.texture = RES.getRes("losehp_png");
        }
        txt.x = this.x;
        txt.y = this.y + this.z - 100;
        txt.anchorX = 0.5;
        egret.Tween.get(txt).to({y: this.y + this.z -300},500).call(function():void{
            App.EgretExpandUtils.removeFromParent(txt);
            ObjectPool.push(txt);
        }, this);
        App.EgretExpandUtils.addChild(LayerManager.Game_Main, txt);

        this.hp -= 10;
        if(this.hp <= 0){
            this.die();
        }
    }

    public die():void{
        this.isDie = true;
        if(this.z == 0){
            this.jump(-20, 5);
            this.armature.play(BaseGameObject.ACTION_Fly, 1);
        }
    }

    public fly(attackObj:BaseGameObject, speedZ:number, speedX:number):void{
        if(this.onAttack()){
            var xFlag:number = this.x > attackObj.x ? 1 : -1;
            this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
            this.jump(speedZ, xFlag*speedX);
            this.armature.play(BaseGameObject.ACTION_Fly, 1);
        }
        this.loseHp();
    }

    public hart(attackObj:BaseGameObject, speed:number, xMoveDis:number):void{
        if(this.onAttack()){
            this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
            this.moveTo(speed, this.x - (this.scaleX * xMoveDis), this.y);
            this.gotoHurt();
        }
        this.loseHp();
    }

    public hartFly(attackObj:BaseGameObject, speedZ:number):void{
        if(this.onAttack()){
            this.moveToZ(speedZ);
            if(this.z == 0){
                this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
                this.armature.play(BaseGameObject.ACTION_Fly, 1);
                this.gotoHurtState();
            }
        }
        this.loseHp();
    }
}
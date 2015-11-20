/**
 * Created by egret on 15-1-27.
 */
class BaseHitGameObject extends BaseAIGameObject {
    public constructor($controller:BaseController) {
        super($controller);
    }

    public onAttack():boolean {
        if (this.isAttack) {
            return false;
        }
        if (this.isMove) {
            this.stopMove();
        }

        this.stopAi();
        return true;
    }

    public loseHp():void {
        var isBao:boolean = Math.random() >= 0.95;
        var txt:egret.Bitmap = ObjectPool.pop("egret.Bitmap");
        txt.alpha = 1;
        if (this.x < 50) {
            txt.x = this.x + App.RandomUtils.limit(0, 100);
        }
        else if (this.x > App.StageUtils.getHeight() - 50) {
            txt.x = this.x - App.RandomUtils.limit(0, 100);
        }
        else {
            txt.x = this.x + (Math.random() > 0.5 ? App.RandomUtils.limit(0, 100) : -App.RandomUtils.limit(0, 100));
        }
        txt.y = this.y + this.z - 100;
        AnchorUtil.setAnchorX(txt, 0.5);
        txt.texture = isBao ? RES.getRes("losehp_baoji_png") : RES.getRes("losehp_png");

        egret.Tween.get(txt).to({y: this.y + this.z - 300}, 1000, egret.Ease.backOut).to({
            alpha: 0,
            y: this.y + this.z - 400
        }, 300).call(function ():void {
            App.DisplayUtils.removeFromParent(txt);
            ObjectPool.push(txt);
        }, this);
        LayerManager.Game_Main.addChild(txt);

        if (isBao) {
            this.hp -= 30;
        } else {
            this.hp -= 10;
        }

        if (this.hp <= 0) {
            this.die();
        }
    }

    public die():void {
        this.isDie = true;
        if (this.z == 0) {
            this.jump(-20, 5);
            this.armature.play(BaseGameObject.ACTION_Fly, 1);
        }
    }

    public fly(attackObj:BaseGameObject, speedZ:number, speedX:number):void {
        if (this.onAttack()) {
            var xFlag:number = this.x > attackObj.x ? 1 : -1;
            this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
            this.jump(speedZ, xFlag * speedX);
            this.armature.play(BaseGameObject.ACTION_Fly, 1);
        }
        this.loseHp();
    }

    public hart(attackObj:BaseGameObject, speed:number, xMoveDis:number):void {
        if (this.onAttack()) {
            this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
            this.moveTo(speed, this.x - (this.scaleX * xMoveDis), this.y);
            this.gotoHurt();
        }
        this.loseHp();
    }

    public hartFly(attackObj:BaseGameObject, speedZ:number, attract:boolean):void {
        if (this.onAttack()) {
            if (attract) {
                this.moveTo(1, attackObj.x, attackObj.y);
                this.moveToZ(speedZ);
            }
            else {
                this.moveToZ(speedZ);
            }
            if (this.z == 0) {
                this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
                this.armature.play(BaseGameObject.ACTION_Fly, 1);
                this.gotoHurtState();
            }
        }
        this.loseHp();
    }
}

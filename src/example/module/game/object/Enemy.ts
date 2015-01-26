/**
 * Created by yangsong on 15-1-16.
 */
class Enemy extends BaseAIGameObject{
    private static ACTION_Idle:string = "daiji";
    private static ACTION_Move:string = "yidong";
    private static ACTION_Attack:string = "gongji";
    private static ACTION_Hart:string = "shouji";
    private static ACTION_Fly:string = "daodi";

    public constructor($controller:BaseController){
        super("guaiwu001", $controller);

        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.gotoIdle();
//        this.isAi = false;
    }

    private armaturePlayEnd(animationName:string):void{
        if(animationName == Enemy.ACTION_Attack){
            this.gotoIdle();
        }
        else if(animationName == Enemy.ACTION_Hart){
            this.gotoIdle();
        }
        else if(animationName == Enemy.ACTION_Fly){

        }
    }

    public gotoIdle():void{
        super.gotoIdle();
        this.armature.play(Enemy.ACTION_Idle);
    }

    public gotoMove():void{
        super.gotoMove();
        this.armature.play(Enemy.ACTION_Move);
    }

    public gotoAttack():void{
        super.gotoAttack();
        this.armature.play(Enemy.ACTION_Attack, 1);
        App.SoundManager.playEffect("sound_enemyAttack");
    }

    public gotoLand():void{
        super.gotoLand();
        App.SoundManager.playEffect("sound_enenyLand");
    }

    public gotoHurt():void{
        super.gotoHurt();
        this.armature.play(Enemy.ACTION_Hart, 1);
    }

    private onAttack():boolean{
        if(this.isJump){
            return false;
        }
        if(this.isAttack){
            return false;
        }
        if(this.isMove){
            this.stopMove();
        }

        this.stopAi();
        return true;
    }

    public fly(attackObj:BaseGameObject):void{
        if(this.onAttack()){
            var xFlag:number = this.x > attackObj.x ? 1 : -1;
            this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
            this.addSpeedZ(-20, xFlag*3);
            this.armature.play(Enemy.ACTION_Fly, 1);
        }
        this.loseHp();
    }

    public hart(attackObj:BaseGameObject):void{
        if(this.onAttack()){
            this.scaleX = attackObj.isMyFront(this) ? -attackObj.scaleX : attackObj.scaleX;
            this.goto(2, this.x - (this.scaleX * 20), this.y, false);
            this.gotoHurt();
        }
        this.loseHp();
    }

}
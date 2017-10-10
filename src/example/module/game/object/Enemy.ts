/**
 * Created by yangsong on 15-1-16.
 */
class Enemy extends BaseFrameGameObject{
    public static ACTION_Attack:string = "gongji";
    public static ACTION_Skill1:string = "jineng";
    public static ACTION_Skill2:string = "jineng2";

    public constructor($controller:BaseController){
        super($controller);

        this.createArmature();
    }

    public createArmature():void{
        this.armature.register(App.DragonBonesFactory.makeArmature("guaiwu001", "guaiwu001", 1.2), [
            BaseGameObject.ACTION_Idle,
            BaseGameObject.ACTION_Move,
            BaseGameObject.ACTION_Hart,
            BaseGameObject.ACTION_Fly,
            BaseGameObject.ACTION_Land,
            BaseGameObject.ACTION_jump,
            Enemy.ACTION_Attack
        ]);

        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.initFrameData("guaiwu001");
    }

    public init():void {
        super.init();
        this.gotoIdle();
    }

    /**
     * 死亡消失
     */
    public disappear():void{
        super.disappear();
        this.controller.applyFunc(GameConst.Remove_Enemy, this);
    }

    public armaturePlayEnd(e:dragonBones.EgretEvent, animationName:string):void{
        if(animationName == Enemy.ACTION_Attack){
            this.gotoIdle();
        }
        else if(animationName == Enemy.ACTION_Hart){
            this.gotoIdle();
        }
        else if(animationName == Enemy.ACTION_Fly){
            this.armature.stop();
        }
        else if(animationName == Enemy.ACTION_Land){
            this.armature.stop();
        }
    }

    public gotoAttack():void{
        super.gotoAttack();
        this.playAttackArmature();
    }

    public playAttackArmature():void{
        this.armature.play(Enemy.ACTION_Attack, 1);
        App.SoundManager.playEffect("sound_enemyAttack");
    }

    public gotoLand():void{
        super.gotoLand();
        if(this.isDie)
            return;
        App.SoundManager.playEffect("sound_enenyLand");
        this.gameController.shock();
    }

    public fly(attackObj:BaseGameObject, speedZ:number, speedX:number):void{
        super.fly(attackObj, speedZ, speedX);
        App.SoundManager.playEffect("sound_beiji");
    }

    public hart(attackObj:BaseGameObject, speed:number, xMoveDis:number):void{
        super.hart(attackObj, speed, xMoveDis);
        App.SoundManager.playEffect("sound_beiji");
    }

    public hartFly(attackObj:BaseGameObject, speedZ:number, attract:boolean):void{
        super.hartFly(attackObj, speedZ, attract);
        App.SoundManager.playEffect("sound_beiji");
    }
}
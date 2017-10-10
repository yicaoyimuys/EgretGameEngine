/**
 * Created by yangsong on 15-1-15.
 */
class Hero extends BaseFrameGameObject{
    private static ACTION_Attack0:string = "gongji1";
    private static ACTION_Attack1:string = "gongji2";
    private static ACTION_Attack2:string = "gongji3";
    private static ACTION_Attack3:string = "gongji4";
    private static ACTION_Skill1:string = "jineng1";
    private static ACTION_Skill2:string = "jineng2";
    private static ACTION_Skill3:string = "jineng3";
    private static ACTION_Skill4:string = "jineng4";

    private attackMaxIndex:number = 0;
    private attackIndex:number = 0;
    private effectArmature:DragonBonesArmatureContainer;

    public constructor($controller:BaseController){
        super($controller);

        this.armature.register(App.DragonBonesFactory.makeArmature("zhujue1", "zhujue1", 1.4), [
            BaseGameObject.ACTION_Idle,
            BaseGameObject.ACTION_Move,
            BaseGameObject.ACTION_Hart,
            BaseGameObject.ACTION_Fly,
            BaseGameObject.ACTION_Land,
            BaseGameObject.ACTION_jump,
            Hero.ACTION_Attack0,
            Hero.ACTION_Attack1,
            Hero.ACTION_Attack2,
            Hero.ACTION_Attack3,
            Hero.ACTION_Skill1
        ]);
        this.armature.register(App.DragonBonesFactory.makeArmature("zhujue2", "zhujue2", 1.4), [
            Hero.ACTION_Skill2,
            Hero.ACTION_Skill3,
            Hero.ACTION_Skill4
        ]);
        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.initFrameData("zhujue1");

        this.effectArmature = new DragonBonesArmatureContainer();
        this.effectArmature.register(App.DragonBonesFactory.makeArmature("jineng1", "jineng1", 1.4), [
            Hero.ACTION_Attack0,
            Hero.ACTION_Attack1,
            Hero.ACTION_Attack2,
            Hero.ACTION_Attack3,
            Hero.ACTION_Skill1
        ]);
        this.effectArmature.register(App.DragonBonesFactory.makeArmature("jineng2", "jineng2", 1.4), [
            Hero.ACTION_Skill2,
            Hero.ACTION_Skill3,
            Hero.ACTION_Skill4
        ]);
    }

    public init():void {
        super.init();

        this.isAi = false;
        this.gotoIdle();
    }

    public destory():void {
        super.destory();
        this.removeEffect();
    }

    private armaturePlayEnd(e:dragonBones.EgretEvent, animationName:string):void{
        if(animationName == Hero.ACTION_Attack0
            || animationName == Hero.ACTION_Attack1
            || animationName == Hero.ACTION_Attack2){
            if(this.attackMaxIndex > this.attackIndex){
                this.nextAttack();
            }else{
                this.overAttack();
            }
        }
        else if(animationName == Hero.ACTION_Attack3){
            this.overAttack();
        }
        else if(animationName == Hero.ACTION_Skill1
            || animationName == Hero.ACTION_Skill2
            || animationName == Hero.ACTION_Skill3
            || animationName == Hero.ACTION_Skill4){
            this.overSkill();
        }
        else if(animationName == Hero.ACTION_Hart){
            this.gotoIdle();
        }
    }

    public addMaxAttackIndex():void{
        this.attackMaxIndex ++;
        if(this.attackMaxIndex > 3){
            this.attackMaxIndex = 3;
        }
    }

    public attack():void{
        if(this.isJump)
            return;

        if(this.isHurt)
            return;

        if(this.isLand)
            return;

        if(this.isMove){
            this.stopMove();
        }

        this.gotoAttack();
        this.armature.play(Hero["ACTION_Attack" + this.attackIndex], 1);
        this.playEffect(Hero["ACTION_Attack" + this.attackIndex]);

        App.SoundManager.playEffect("sound_heroAttack");
    }

    private nextAttack():void{
        this.attackIndex++;
        this.attack();
    }

    private overAttack():void{
        this.attackMaxIndex = 0;
        this.attackIndex = 0;
        this.gotoIdle();
    }

    public skill(id:number):void{
        if(this.isAttack)
            return;

        if(this.isJump)
            return;

        if(this.isHurt)
            return;

        if(this.isLand)
            return;

        if(this.isMove){
            this.stopMove();
        }

        this.gotoAttack();
        this.armature.play(Hero["ACTION_Skill" + id], 1);
        this.playEffect(Hero["ACTION_Skill" + id]);

        App.SoundManager.playEffect("sound_heroSkill");
    }

    private overSkill():void{
        this.gotoIdle();
    }

    public gotoIdle():void{
        super.gotoIdle();
        this.removeEffect();
    }

    private removeEffect():void{
        this.effectArmature.stop();
        App.DisplayUtils.removeFromParent(this.effectArmature);
    }

    private playEffect(actionName:string):void{
        if(this.effectArmature.play(actionName, 1)){
            this.addChild(this.effectArmature);
        }else{
            this.removeEffect();
        }
    }

    public die():void{
    }

    public fly(attackObj:BaseGameObject, speedZ:number, speedX:number):void{
        super.fly(attackObj, speedZ, speedX);
        App.SoundManager.playEffect("sound_heroBeiji");
    }

    public hart(attackObj:BaseGameObject, speed:number, xMoveDis:number):void{
        super.hart(attackObj, speed, xMoveDis);
        App.SoundManager.playEffect("sound_heroBeiji");
    }

    public hartFly(attackObj:BaseGameObject, speedZ:number, attract:boolean):void{
        super.hartFly(attackObj, speedZ, attract);
        App.SoundManager.playEffect("sound_heroBeiji");
    }
}
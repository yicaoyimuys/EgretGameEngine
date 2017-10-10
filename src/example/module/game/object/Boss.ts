/**
 * Created by egret on 15-2-2.
 */
class Boss extends Enemy{
    private effectArmature:DragonBonesArmatureContainer;
    private attackType:number;

    public constructor($controller:BaseController) {
        super($controller);
    }

    public init():void{
        super.init();
        this.move_time = App.RandomUtils.limitInteger(1000, 2000);
        this.attack_time = App.RandomUtils.limitInteger(1000, 2000);
        this.hp = 500;
        this.setAttackType(1);
    }

    public createArmature():void{
        this.armature.register(App.DragonBonesFactory.makeArmature("guaiwu002", "guaiwu002", 1.2), [
            BaseGameObject.ACTION_Idle,
            BaseGameObject.ACTION_Move,
            BaseGameObject.ACTION_Hart,
            BaseGameObject.ACTION_Fly,
            BaseGameObject.ACTION_Land,
            BaseGameObject.ACTION_jump,
            Enemy.ACTION_Attack,
            Enemy.ACTION_Skill1
        ]);
        this.armature.register(App.DragonBonesFactory.makeArmature("guaiwu003", "guaiwu003", 1.2), [
            Enemy.ACTION_Skill2
        ]);

        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.initFrameData("guaiwu002");

        this.effectArmature = new DragonBonesArmatureContainer();
        this.effectArmature.register(App.DragonBonesFactory.makeArmature("guaiwu002_effect", "guaiwu002_effect", 1.2), [
            Enemy.ACTION_Attack,
            Enemy.ACTION_Skill1
        ]);
        this.effectArmature.register(App.DragonBonesFactory.makeArmature("guaiwu003_effect", "guaiwu003_effect", 1.2), [
            Enemy.ACTION_Skill2
        ]);
    }

    private setAttackType(type:number):void{
        this.attackType = type;
        if(this.attackType == 1){
            this.ai_attack_dis = this.attackConfig["attack1"].dis;
        }
        else if(this.attackType == 2){
            this.ai_attack_dis = this.attackConfig["skill1"].dis;
        }
        else if(this.attackType == 3){
            this.ai_attack_dis = this.attackConfig["skill2_3"].dis;
        }
    }

    public update(time:number):void {
        super.update(time);
    }

    public armaturePlayEnd(e:dragonBones.EgretEvent, animationName:string):void{
        super.armaturePlayEnd(e, animationName);
        if(animationName == Enemy.ACTION_Attack){
            this.setAttackType(2);
        }
        else if(animationName == Enemy.ACTION_Skill1){
            this.gotoIdle();
            this.setAttackType(3);
        }
        else if(animationName == Enemy.ACTION_Skill2){
            this.gotoIdle();
            this.setAttackType(1);
        }
    }

    public playAttackArmature():void{
        var anmatureName:string;
        if(this.attackType == 1){
            anmatureName = Enemy.ACTION_Attack;
            App.SoundManager.playEffect("sound_bossAttack");
        }else if(this.attackType == 2){
            anmatureName = Enemy.ACTION_Skill1;
            App.SoundManager.playEffect("sound_bossSkill");
        }
        else if(this.attackType == 3){
            anmatureName = Enemy.ACTION_Skill2;
            App.SoundManager.playEffect("sound_bossSkill");
        }
        this.armature.play(anmatureName, 1);
        this.playEffect(anmatureName);
    }

    public die():void{
        super.die();
        this.jump(-40, this.scaleX * -10);
        this.gameController.slowMotion();
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

    public leave():void{
        super.leave();
        this.stopMove();
        this.setAttackType(2);
        this.gotoAttack();
    }

    public gotoIdle():void{
        super.gotoIdle();
        this.removeEffect();
    }

    public destory():void {
        super.destory();
        this.removeEffect();
    }
}
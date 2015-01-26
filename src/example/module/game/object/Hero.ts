/**
 * Created by yangsong on 15-1-15.
 */
class Hero extends BaseMoveGameObject{
    private static ACTION_Idle:string = "daiji";
    private static ACTION_Move:string = "yidong";
    private static ACTION_Attack0:string = "gongji1";
    private static ACTION_Skill1:string = "jineng1";

    private attackConfig:any;
    private attackIndex:number = 0;
    private currSkillArmature:DragonBonesArmature;

//    private skill4Armature:DragonBonesArmature;

    public constructor($controller:BaseController){
        super("zhujue1", $controller);

        this.attackConfig = RES.getRes("attack_json");

        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
        this.armature.addFrameCallFunc(this.armaturePlaying, this);

        this.gotoIdle();

//        this.skill4Armature = DragonBonesFactory.getInstance().makeArmature("元件 1", "CHAR03_E19_1");
//        this.skill4Armature.addCompleteCallFunc(this.removeSkillArmature, this);
    }

    private armaturePlayEnd(animationName:string):void{
        if(animationName == Hero.ACTION_Attack0){
            this.overAttack();
        }
        else if(animationName == Hero.ACTION_Skill1){
            this.overSkill();
        }
    }

    private armaturePlaying(bone:any, frameLabel:string):void{
        var attDis:Array<number> = this.attackConfig[frameLabel].dis;
        var attackObjs:Array<BaseGameObject> = this.gameController.getMyAttackObjects(this, attDis);
        for(var i:number=0, len=attackObjs.length; i<len; i++){
            var enemy:Enemy = <Enemy>attackObjs[i];
            if(frameLabel == "attack1"){
                if(Math.random() > 0.5)
                    enemy.fly(this);
                else
                    enemy.hart(this);
            }
            else if(frameLabel == "skill1_fly"){
                enemy.fly(this);
            }
            else if(frameLabel == "skill1"){
                enemy.hart(this);
            }
        }
    }

    public attack():void{
        this.gotoAttack();
        this.armature.play(Hero["ACTION_Attack" + this.attackIndex], 1);
        App.SoundManager.playEffect("sound_heroAttack");
    }

    private nextAttack():void{
        this.attackIndex++;
        this.attack();
    }

    private overAttack():void{
        this.attackIndex = 0;
        this.gotoIdle();
    }

    public skill(id:number):void{
        this.gotoAttack();
        this.armature.play(Hero["ACTION_Skill" + id], 1);

        this.removeSkillArmature();

//        if(id == 4){
//            this.skill4Armature.y = -50;
//            this.skill4Armature.play("cha_CHAR03_E19_1", 1);
//            this.addChild(this.skill4Armature);
//            this.currSkillArmature = this.skill4Armature;
//        }

        App.SoundManager.playEffect("sound_heroSkill");
    }

    private removeSkillArmature():void{
        if(this.currSkillArmature){
            this.currSkillArmature.stop();
            this.removeChild(this.currSkillArmature);
            this.currSkillArmature = null;
        }
    }

    private overSkill():void{
        this.gotoIdle();
    }

    /**
     * 重写父类
     */
    public gotoMove():void{
        super.gotoMove();
        this.armature.play(Hero.ACTION_Move);
    }

    /**
     * 重写父类
     */
    public gotoIdle():void{
        super.gotoIdle();
        this.armature.play(Hero.ACTION_Idle);
    }
}
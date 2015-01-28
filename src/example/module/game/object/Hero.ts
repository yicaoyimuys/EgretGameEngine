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
    private effectArmature:DragonBonesArmature;

    public constructor($controller:BaseController){
        super("zhujue1", $controller);

        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);

        this.effectArmature = DragonBonesFactory.getInstance().makeArmature("zhujue1_effect", "zhujue1_effect");
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

    private armaturePlayEnd(animationName:string):void{
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

    public addMaxAttack():void{
        this.attackMaxIndex ++;
        if(this.attackMaxIndex > 3){
            this.attackMaxIndex = 3;
        }
    }

    public attack():void{
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
        App.EgretExpandUtils.removeFromParent(this.effectArmature);
    }

    private playEffect(actionName:string):void{
        if(this.effectArmature.play(actionName, 1)){
            App.EgretExpandUtils.addChild(this, this.effectArmature);
        }else{
            this.removeEffect();
        }
    }

    public die():void{
    }
}
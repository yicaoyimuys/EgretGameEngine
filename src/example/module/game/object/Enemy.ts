/**
 * Created by yangsong on 15-1-16.
 */
class Enemy extends BaseFrameGameObject{
    private static ACTION_Attack:string = "gongji";

    public constructor($controller:BaseController){
        super("guaiwu001", $controller, 1.2);

        this.armature.addCompleteCallFunc(this.armaturePlayEnd, this);
    }

    public init():void {
        super.init();
        this.gotoIdle();
    }

    public destory():void {
        super.destory();
        this.controller.applyFunc(GameConst.Remove_Enemy, this);
    }

    private armaturePlayEnd(animationName:string):void{
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
        this.armature.play(Enemy.ACTION_Attack, 1);
        App.SoundManager.playEffect("sound_enemyAttack");
    }

    public gotoLand():void{
        super.gotoLand();
        App.SoundManager.playEffect("sound_enenyLand");
        this.gameController.shock();
    }

}
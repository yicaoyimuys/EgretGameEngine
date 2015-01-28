/**
 * Created by egret on 15-1-19.
 */
class BaseAIGameObject extends BaseMoveGameObject{
    private static STATE_AI_NONE:string = "ai_none";
    private static STATE_AI_IDLE:string = "ai_idle";
    private static STATE_AI_MOVE:string = "ai_move";
    private static STATE_AI_ATTACK:string = "ai_attack";

    private move_time:number = 3000;
    private attack_time:number = 3000;
    private attack_dis:Array<number> = [100, 0, 30, 30, 0, 0];

    public isAi:boolean;

    private currAiState:string;
    private currTime:number;
    private attackObj:BaseGameObject;

    public constructor($dragonBonesDataName:string, $controller:BaseController) {
        super($dragonBonesDataName, $controller);
    }

    public init():void {
        super.init();

        this.move_time = App.RandomUtils.limitInteger(2000, 5000);
        this.attack_time = App.RandomUtils.limitInteger(2000, 4000);
        this.isAi = true;
    }

    public destory():void {
        super.destory();
    }

    public isCanAttack():boolean{
        this.attackObj = this.gameController.getMyAttackObjects(this, this.attack_dis)[0];
        return this.attackObj != null;
    }

    public update(time:number):void{
        super.update(time);

        if(!this.isAi)
            return;

        var func:string = "state_"+this.currAiState;
        if(this.currAiState){
            this.currTime += time;
            this[func](time);
        }
    }

    public state_ai_none(time:number):void{

    }

    public state_ai_idle(time:number):void{
        if(this.isCanAttack()){
            if(this.currTime >= this.attack_time){
                this.gotoAttack();
            }
        }
        else{
            if(this.currTime >= this.move_time){
                this.moveRandom();
            }
        }
    }

    public state_ai_move(time:number):void{
        if(this.isCanAttack()){
            this.stopMove();
            this.gotoAttack();
        }
    }

    public state_ai_attack(time:number):void{

    }


    public gotoIdle():void{
        super.gotoIdle();

        if(!this.isAi)
            return;

        this.gotoAiIdle();
    }

    public gotoMove():void{
        super.gotoMove();

        if(!this.isAi)
            return;

        this.gotoAiMove();
    }

    public gotoAttack():void{
        super.gotoAttack();

        if(!this.isAi)
            return;

        this.gotoAiAttack();
        this.scaleX = this.attackObj.x >= this.x ? 1 : -1;
    }

    public gotoHurt():void{
        super.gotoHurt();

        if(!this.isAi)
            return;

        this.stopAi();
    }

    public gotoJump():void{
        super.gotoJump();

        if(!this.isAi)
            return;

        this.stopAi();
    }

    public gotoLand():void{
        super.gotoLand();

        if(!this.isAi)
            return;

        this.stopAi();
    }

    public leave():void{
        super.leave();

        if(!this.isAi)
            return;

        this.moveRandom();
    }

    public gotoAiIdle():void{
        this.currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_IDLE;
    }

    public gotoAiMove():void{
        this.currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_MOVE;
    }

    public gotoAiAttack():void{
        this.currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_ATTACK;
    }

    public stopAi():void{
        this.currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_NONE;
    }

    private moveRandom():void{
        var gotoX:number = App.RandomUtils.limit(GameData.MIN_X, GameData.MAX_X);
        var gotoY:number = App.RandomUtils.limit(GameData.MIN_Y, GameData.MAX_Y);
        this.walkTo(3, gotoX, gotoY);
    }
}
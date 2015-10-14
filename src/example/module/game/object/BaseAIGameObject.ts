/**
 * Created by egret on 15-1-19.
 */
class BaseAIGameObject extends BaseMoveGameObject{
    private static STATE_AI_NONE:string = "ai_none";
    private static STATE_AI_IDLE:string = "ai_idle";
    private static STATE_AI_MOVE:string = "ai_move";
    private static STATE_AI_ATTACK:string = "ai_attack";

    public move_time:number = 3000;
    public attack_time:number = 3000;
    public ai_attack_dis:Array<number> = [100, 0, 30, 30, 0, 0];
    public ai_currTime:number;

    public isAi:boolean;

    private currAiState:string;
    private attackObj:BaseGameObject;

    public constructor($controller:BaseController) {
        super($controller);
    }

    public init():void {
        super.init();

        this.move_time = App.RandomUtils.limitInteger(2000, 5000);
        this.attack_time = App.RandomUtils.limitInteger(2000, 4000);
        this.ai_attack_dis = [100, 0, 30, 30, 0, 0];
        this.ai_currTime = 0;
        this.isAi = true;
    }

    public destory():void {
        super.destory();
    }

    public isCanAttack():boolean{
        this.attackObj = this.gameController.getMyAttackObjects(this, this.ai_attack_dis)[0];
        return this.attackObj != null;
    }

    public update(time:number):void{
        super.update(time);

        if(!this.isAi)
            return;

        if(this.isCommand)
            return;

        var func:string = "state_"+this.currAiState;
        if(this.currAiState){
            this.ai_currTime += time;
            this[func](time);
        }
    }

    public state_ai_none(time:number):void{

    }

    public state_ai_idle(time:number):void{
        if(this.isCanAttack()){
            if(this.ai_currTime >= this.attack_time){
                this.gotoAttack();
            }
        }
        else{
            if(this.ai_currTime >= this.move_time){
                this.aiMove();
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
        if(this.attackObj){
            this.scaleX = this.attackObj.x >= this.x ? 1 : -1;
        }
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

    public stopMove():void{
        super.stopMove();
        this.ai_currTime = this.attack_time;
    }

    public gotoAiIdle():void{
        this.ai_currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_IDLE;
    }

    public gotoAiMove():void{
        this.ai_currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_MOVE;
    }

    public gotoAiAttack():void{
        this.ai_currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_ATTACK;
    }

    public stopAi():void{
        this.ai_currTime = 0;
        this.currAiState = BaseAIGameObject.STATE_AI_NONE;
    }

    private aiMove():void{
        if(Math.random() > 0.7){
            this.moveRandom();
        }else{
            this.moveToTarget();
        }
    }

    private moveToTarget():void{
        var target:BaseGameObject = this.gameController.getMyNearAttackObjects(this);
        var gotoX:number;
        var gotoY:number;
        if(target.isMyFront(this)){
            gotoX = target.x + this.scaleX * App.RandomUtils.limit(0, this.ai_attack_dis[0]);
        }
        else if(target.isMyBack(this)){
            gotoX = target.x - this.scaleX * App.RandomUtils.limit(0, this.ai_attack_dis[1]);
        }
        if(target.isMyLeft(this)){
            gotoY = target.y - this.scaleX * App.RandomUtils.limit(0, this.ai_attack_dis[2]);
        }
        else if(target.isMyRight(this)){
            gotoY = target.y + this.scaleX * App.RandomUtils.limit(0, this.ai_attack_dis[3]);
        }
        this.walkTo(3, gotoX, gotoY);
    }

    private moveRandom():void{
        var gotoX:number = App.RandomUtils.limit(GameData.MIN_X, GameData.MAX_X);
        var gotoY:number = App.RandomUtils.limit(GameData.MIN_Y, GameData.MAX_Y);
        this.walkTo(3, gotoX, gotoY);
    }
}
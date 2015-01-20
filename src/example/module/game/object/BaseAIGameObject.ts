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
    private attack_dis:number = 100;

    private currAiState:string;
    private currTime:number;
    private attackObjs:Array<BaseGameObject>;

    public constructor($dragonBonesDataName:string, $controller:BaseController) {
        super($dragonBonesDataName, $controller);
        this.move_time = App.RandomUtils.limitInteger(2000, 5000);
        this.attack_time = App.RandomUtils.limitInteger(2000, 4000);
    }

    public isCanAttack():boolean{
        this.attackObjs = this.gameController.getMyAttackObjects(this, this.attack_dis);
        return this.attackObjs != null && this.attackObjs.length > 0;
    }

    public update(time:number):void{
        super.update(time);

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
        if(this.isCanAttack()){
            if(this.currTime >= this.attack_time){
                this.gotoAttack();
            }
        }
        else{
            this.gotoIdle();
        }
    }


    public gotoIdle():void{
        super.gotoIdle();
        this.gotoAiIdle();
    }

    public gotoMove():void{
        super.gotoMove();
        this.gotoAiMove();
    }

    public gotoAttack():void{
        super.gotoAttack();
        this.gotoAiAttack();
        this.scaleX = this.attackObjs[0].x >= this.x ? 1 : -1;
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
        this.goto(3, gotoX, gotoY);
    }
}
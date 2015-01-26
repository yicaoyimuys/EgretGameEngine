/**
 * Created by egret on 15-1-16.
 */
class BaseMoveGameObject extends BaseGameObject{
    private static STATE_IDLE:string = "idle";
    private static STATE_MOVE:string = "move";
    private static STATE_ATTACK:string = "attack";
    private static STATE_JUMP:string = "jump";
    private static STATE_LAND:string = "land";
    private static STATE_HURT:string = "hurt";

    private maxSpeedZ:number = 30;
    private gravitySpeed:number = 1;

    private currState:string;
    private speed:number;
    private speedX:number;
    private speedY:number;
    private speedZ:number;
    private endX:number;
    private endY:number;
    private radian:number;
    private landTime:number;

    public constructor($dragonBonesDataName:string, $controller:BaseController) {
        super($dragonBonesDataName, $controller);
        this.speedX = 0;
        this.speedY = 0;
        this.speedZ = 0;
        this.endX = 0;
        this.endY = 0;
    }

    public update(time:number):void{
        super.update(time);

        var func:string = "state_"+this.currState;
        if(this.currState){
            this[func](time);
        }
    }

    public state_idle(time:number):void{

    }

    public state_move(time:number):void{
        var useSpeed:number = this.speed/(1000/60) * time;
        if(this.endX && this.endY){
            this.radian = App.MathUtils.getRadian2(this.x, this.y, this.endX, this.endY);
            this.speedX = Math.cos(this.radian) * useSpeed;
            this.speedY = Math.sin(this.radian) * useSpeed * 0.65;

            var gotoX:number = this.x + this.speedX;
            var gotoY:number = this.y + this.speedY;

            var dis:number = App.MathUtils.getDistance(this.x, this.y, this.endX, this.endY);
            if(gotoX < GameData.MIN_X
                || gotoX > GameData.MAX_X
                || gotoY < GameData.MIN_Y
                || gotoY > GameData.MAX_Y
                || dis < Math.abs(this.speedX) + Math.abs(this.speedY)){
                this.stopMove();
                return;
            }

            this.x = gotoX;
            this.y = gotoY;
        }
        else{
            this.speedX = Math.cos(this.radian) * useSpeed;
            this.speedY = Math.sin(this.radian) * useSpeed * 0.65;
            var gotoX:number = this.x + this.speedX;
            var gotoY:number = this.y + this.speedY;

            if(gotoX < GameData.MIN_X || gotoX > GameData.MAX_X){
                gotoX = this.x;
            }

            if(gotoY < GameData.MIN_Y || gotoY > GameData.MAX_Y){
                gotoY = this.y;
            }

            this.x = gotoX;
            this.y = gotoY;
        }
    }

    public state_attack(time:number):void{

    }

    public state_jump(time:number):void{
        if(this.speedX || this.speedY){
            this.state_move(time);
        }

        if(this.speedZ > this.maxSpeedZ) {
            this.speedZ = this.maxSpeedZ;
        } else {
            this.speedZ += this.gravitySpeed;
        }
        var gotoZ:number = this.z + this.speedZ;
        if(gotoZ > 0){
            gotoZ = 0;
            this.stopJump();
        }
        this.z = gotoZ;
    }

    public state_land(time:number):void{
        this.landTime += time;
        if(this.landTime >= 1000){
            this.gotoIdle();
        }
    }

    public state_hurt(time:number):void{
        this.state_move(time);
    }

    public stopJump():void{
        this.gotoLand();
    }

    public stopMove():void{
        if(!this.isHurt){
            this.gotoIdle();
        }
    }

    public goto($speed:number, $endX:number, $endY:number, $isGotoMove:boolean = true):void{
        this.speed = $speed;
        this.endX = $endX;
        this.endY = $endY;
        this.radian = 0;
        if($isGotoMove){
            this.scaleX = this.endX >= this.x ? 1 : -1;
            this.gotoMove();
        }
    }

    public addSpeedXY(xFlag:number, yFlag:number, $speed:number):void{
        this.speed = $speed;
        this.endX = 0;
        this.endY = 0;
        this.radian = Math.atan2(yFlag, xFlag);
        this.scaleX = xFlag > 0 ? 1 : -1;
        this.gotoMove();
    }

    public addSpeedZ($speedZ:number, $speedX:number=0):void{
        this.speed = Math.abs($speedX);
        this.endX = 0;
        this.endY = 0;
        this.radian = Math.atan2(0, $speedX>0?1:-1);
        this.speedZ = $speedZ;
        this.gotoJump();
    }

    public gotoIdle():void{
        this.currState = BaseMoveGameObject.STATE_IDLE;
    }

    public gotoMove():void{
        this.currState = BaseMoveGameObject.STATE_MOVE;
    }

    public gotoAttack():void{
        this.currState = BaseMoveGameObject.STATE_ATTACK;
    }

    public gotoJump():void{
        this.currState = BaseMoveGameObject.STATE_JUMP;
    }

    public gotoLand():void{
        this.landTime = 0;
        this.currState = BaseMoveGameObject.STATE_LAND;
    }

    public gotoHurt():void{
        this.currState = BaseMoveGameObject.STATE_HURT;
    }

    public get isIdle():boolean{
        return this.currState == BaseMoveGameObject.STATE_IDLE;
    }

    public get isAttack():boolean{
        return this.currState == BaseMoveGameObject.STATE_ATTACK;
    }

    public get isMove():boolean{
        return this.currState == BaseMoveGameObject.STATE_MOVE;
    }

    public get isJump():boolean{
        return this.currState == BaseMoveGameObject.STATE_JUMP;
    }

    public get isLand():boolean{
        return this.currState == BaseMoveGameObject.STATE_LAND;
    }

    public get isHurt():boolean{
        return this.currState == BaseMoveGameObject.STATE_HURT;
    }
}
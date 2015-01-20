/**
 * Created by egret on 15-1-16.
 */
class BaseMoveGameObject extends BaseGameObject{
    private static STATE_IDLE:string = "idle";
    private static STATE_MOVE:string = "move";
    private static STATE_ATTACK:string = "attack";
    private static STATE_JUMP:string = "jump";
    private static STATE_LAND:string = "land";

    private maxSpeedZ:number = 30;
    private gravitySpeed:number = 1;

    private currState:string;
    private speed:number;
    private speedX:number;
    private speedY:number;
    private speedZ:number;
    private endX:number;
    private endY:number;
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
        if(this.endX && this.endY){
            var radian:number = App.MathUtils.getRadian2(this.x, this.y, this.endX, this.endY);
            this.speedX = Math.cos(radian) * this.speed;
            this.speedY = Math.sin(radian) * this.speed * 0.65;

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

    public stopJump():void{
        this.gotoLand();
    }

    public stopMove():void{
        this.gotoIdle();
    }

    public goto($speed:number, $endX:number, $endY:number):void{
        this.speed = $speed;
        this.endX = $endX;
        this.endY = $endY;
        this.scaleX = this.endX >= this.x ? 1 : -1;
        this.gotoMove();
    }

    public addSpeedXY(xFlag:number, yFlag:number, $speed:number):void{
        this.speed = $speed;
        this.endX = 0;
        this.endY = 0;
        var radian:number = Math.atan2(yFlag, xFlag);
        this.speedX = Math.cos(radian) * this.speed;
        this.speedY = Math.sin(radian) * this.speed * 0.65;
        this.scaleX = xFlag > 0 ? 1 : -1;
        this.gotoMove();
    }

    public addSpeedZ($speedZ:number, $speedX:number=0, $speedY:number=0):void{
        this.speedX = $speedX;
        this.speedY = $speedY;
        this.speedZ = $speedZ;
        this.endX = 0;
        this.endY = 0;
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
}
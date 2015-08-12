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

    public isCommand:boolean;

    public constructor($controller:BaseController) {
        super($controller);
    }

    public init():void{
        super.init();
        this.speed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.speedZ = 0;
        this.endX = 0;
        this.endY = 0;
        this.radian = 0;
        this.alpha = 1;
        this.isCommand = false;
    }

    public destory():void{
        super.destory();
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
            if(gotoX < GameData.MIN_X
                || gotoX > GameData.MAX_X
                || gotoY < GameData.MIN_Y
                || gotoY > GameData.MAX_Y){
                if(!this.isCommand){
                    this.stopMove();
                    return;
                }
            }

            var dis:number = App.MathUtils.getDistance(this.x, this.y, this.endX, this.endY);
            if(dis < Math.abs(this.speedX) + Math.abs(this.speedY)){
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
        if(this.speedZ){
            this.state_jump(time);
        }
        else if(this.speed){
            this.state_move(time);
        }
    }

    public state_jump(time:number):void{
        if(this.speed){
            this.state_move(time);
        }

        if(this.speedZ > this.maxSpeedZ) {
            this.speedZ = this.maxSpeedZ;
        } else {
            this.speedZ += this.gravitySpeed;
        }
        var gotoZ:number = this.z + this.speedZ/(1000/60) * time;
        if(gotoZ > 0){
            gotoZ = 0;
            this.stopJump();
        }
        this.z = gotoZ;
    }

    public state_land(time:number):void{
        if(this.isDie){
            return;
        }

        this.landTime += time;
        if(this.landTime >= 1500){
            this.leave();
        }
    }

    public state_hurt(time:number):void{
        if(this.speedZ || this.z < 0){
            this.state_jump(time);
        }
        else if(this.speed){
            this.state_move(time);
        }
    }

    public stopJump():void{
        this.speedZ = 0;

        if(!this.isAttack){
            this.gotoLand();
        }

        if(this.isDie){
            egret.Tween.get(this).to({alpha: 0}, 2000).call(function():void{
                this.disappear();
                this.destory();
            }, this);
        }
    }

    /**
     * 死亡消失
     */
    public disappear():void{

    }

    public stopMove():void{
        this.speed = 0;
        this.isCommand = false;
        if(!this.isHurt && !this.isAttack && this.z == 0){
            this.gotoIdle();
        }
    }

    public leave():void{
        this.gotoIdle();
    }

    //只移动不切换动作
    public moveTo($speed:number, $endX:number, $endY:number):void{
        this.speed = $speed;
        this.endX = $endX;
        this.endY = $endY;
        this.radian = 0;
    }

    //行走到某个点
    public walkTo($speed:number, $endX:number, $endY:number):void{
        this.moveTo($speed, $endX, $endY);
        this.scaleX = this.endX >= this.x ? 1 : -1;
        this.gotoMove();
    }

    //行走
    public walk(xFlag:number, yFlag:number, $speed:number):void{
        this.speed = $speed;
        this.endX = 0;
        this.endY = 0;
        this.radian = Math.atan2(yFlag, xFlag);
        this.scaleX = xFlag > 0 ? 1 : -1;
        this.gotoMove();
    }

    //跳起不切换动作
    public moveToZ($speedZ:number):void{
        this.speedZ = $speedZ;
    }

    //强制落地
    public standLand():void{
        this.speedZ = 0;
        this.z = 0;
    }

    //跳起
    public jump($speedZ:number, $speedX:number=0):void{
        this.speed = Math.abs($speedX);
        this.radian = Math.atan2(0, $speedX>0?1:-1);
        this.endX = 0;
        this.endY = 0;
        this.speedZ = $speedZ;
        this.gotoJump();
    }

    public gotoIdle():void{
        this.speed = 0;
        this.currState = BaseMoveGameObject.STATE_IDLE;
        this.armature.play(BaseMoveGameObject.ACTION_Idle, 0);
    }

    public gotoMove():void{
        this.currState = BaseMoveGameObject.STATE_MOVE;
        this.armature.play(BaseMoveGameObject.ACTION_Move, 0);
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
        this.armature.play(BaseMoveGameObject.ACTION_Land, 1);
    }

    public gotoHurtState():void{
        this.currState = BaseMoveGameObject.STATE_HURT;
    }

    public gotoHurt():void{
        this.gotoHurtState();
        this.armature.play(BaseMoveGameObject.ACTION_Hart, 1);
    }

    public command_in(speed:number, toX:number, toY:number):void{
        this.isCommand = true;
        this.walkTo(speed, toX, toY);
    }

    public get isInScreen():boolean{
        return this.x > GameData.MIN_X && this.x < GameData.MAX_X
            && this.y > GameData.MIN_Y && this.y < GameData.MAX_Y;
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
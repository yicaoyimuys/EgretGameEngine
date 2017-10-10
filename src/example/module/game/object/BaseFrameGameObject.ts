/**
 * Created by egret on 15-1-27.
 */
class BaseFrameGameObject extends BaseHitGameObject{
    public attackConfig:any;

    public constructor($controller:BaseController) {
        super($controller);
    }

    public initFrameData($dragonBonesDataName:string):void{
        this.attackConfig = RES.getRes("attack_json")[$dragonBonesDataName];
        if(this.attackConfig){
            this.armature.addFrameCallFunc(this.armatureEventHandle, this);
        }
    }

    public armatureEventHandle(e:dragonBones.EgretEvent):void{
        var frameLabel = e.eventObject.name;
        var actionStr:string = this.attackConfig[frameLabel].action || "";
        var actions:Array<string> = actionStr.split(",");
        for(var i:number=0, len=actions.length; i<len; i++){
            var arr:Array<any> = actions[i].split("_");
            var funcName:string = arr[0];
            arr[0] = frameLabel;
            this[funcName].apply(this, arr);
        }
    }




    public frameEnemyHart(frameLabel:string, speed:string, xMoveDis:string, shock:string = "0"):void{
        var attDis:Array<number> = this.attackConfig[frameLabel].dis;
        var attackObjs:Array<BaseHitGameObject> = this.gameController.getMyAttackObjects(this, attDis);
        if(attackObjs.length && shock == "1"){
            this.frameShock();
        }
        for(var i:number=0, len=attackObjs.length; i<len; i++){
            attackObjs[i].hart(this, parseInt(speed), parseInt(xMoveDis));
        }
    }

    public frameEnemyFly(frameLabel:string, speedZ:string, speedX:string, shock:string = "0"):void{
        var attDis:Array<number> = this.attackConfig[frameLabel].dis;
        var attackObjs:Array<BaseHitGameObject> = this.gameController.getMyAttackObjects(this, attDis);
        if(attackObjs.length && shock == "1"){
            this.frameShock();
        }
        for(var i:number=0, len=attackObjs.length; i<len; i++){
            attackObjs[i].fly(this, parseInt(speedZ), parseInt(speedX));
        }
    }

    public frameEnemyHartMoveToZ(frameLabel:string, speedZ:string, attract:string="0"):void{
        var attDis:Array<number> = this.attackConfig[frameLabel].dis;
        var attackObjs:Array<BaseHitGameObject> = this.gameController.getMyAttackObjects(this, attDis);
        for(var i:number=0, len=attackObjs.length; i<len; i++){
            attackObjs[i].hartFly(this, parseInt(speedZ), parseInt(attract) == 1);
        }
    }

    public frameThisMoveTo(frameLabel:string, speed:string, xMoveDis:string):void{
        this.moveTo(parseInt(speed), this.x + (this.scaleX * parseInt(xMoveDis)), this.y);
    }

    public frameThisMoveToZ(frameLabel:string, $speedZ:string):void{
        this.moveToZ(parseInt($speedZ));
    }

    public frameThisStandLand(frameLabel:string):void{
        this.standLand();
    }

    public frameShock(frameLabel:string = null):void{
        this.gameController.shock();
    }
}
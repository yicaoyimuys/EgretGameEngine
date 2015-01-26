/**
 * Created by egret on 15-1-16.
 */
class GameController extends BaseController {
    private gameView:GameView;

    public constructor() {
        super();

        this.gameView = new GameView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.Game, this.gameView);
    }

    //获取可攻击对象
    private canAttackObjs:Array<BaseGameObject>;
    public getMyAttackObjects(me:BaseGameObject, meAttackDis:Array<number>):Array<BaseGameObject>{
        if(this.canAttackObjs == null){
            this.canAttackObjs = new Array<BaseGameObject>();
        }
        this.canAttackObjs.length = 0;
        if(me instanceof Enemy){
            if(!this.gameView.hero.isLand && this.checkIsInDis(me, this.gameView.hero, meAttackDis)){
                this.canAttackObjs.push(this.gameView.hero);
            }
        }
        else if(me instanceof Hero){
            for(var i:number=0, len=this.gameView.enemys.length; i<len; i++){
                var enemy:Enemy = this.gameView.enemys[i];
                if(!enemy.isLand && this.checkIsInDis(me, enemy, meAttackDis)){
                    this.canAttackObjs.push(enemy);
                }
            }
        }
        return this.canAttackObjs;
    }


    //六方向检测是否在攻击范围内
    private checkHitRectangle_Att:egret.Rectangle = new egret.Rectangle();
    private checkHitRectangle_Def:egret.Rectangle = new egret.Rectangle();
    private checkIsInDis(attactObj:BaseGameObject, defenceObj:BaseGameObject, attackDis:Array<number>):Boolean{
        var front:number	= attackDis[0];//前
        var back:number	    = attackDis[1];//后
        var left:number		= attackDis[2];//左
        var right:number	= attackDis[3];//右
        var top:number		= attackDis[4];//上
        var down:number	    = attackDis[5];//下
        var ylen:number     = defenceObj.y <= attactObj.y ? left : right;

        this.checkHitRectangle_Att.x = attactObj.x - (attactObj.scaleX==1 ? back : front);
        this.checkHitRectangle_Att.y = attactObj.z - top;
        this.checkHitRectangle_Att.width = front + back;
        this.checkHitRectangle_Att.height = top + down;

        this.checkHitRectangle_Def.x = defenceObj.x - defenceObj.width*0.5;
        this.checkHitRectangle_Def.y = defenceObj.z - defenceObj.height;
        this.checkHitRectangle_Def.width = defenceObj.width;
        this.checkHitRectangle_Def.height = defenceObj.height;

        return Math.abs(defenceObj.y - attactObj.y) <= ylen && this.checkHitRectangle_Att.intersects(this.checkHitRectangle_Def);
    }
}
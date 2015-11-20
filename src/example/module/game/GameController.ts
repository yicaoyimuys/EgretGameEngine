/**
 * Created by egret on 15-1-16.
 */
class GameController extends BaseController {
    private canAttackObjs:Array<BaseHitGameObject>;
    private gameView:GameView;
    private gameUIView:GameUIView;

    public constructor() {
        super();

        this.canAttackObjs = new Array<BaseHitGameObject>();

        this.gameView = new GameView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.Game, this.gameView);

        this.gameUIView = new GameUIView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.GameUI, this.gameUIView);

        this.registerFunc(GameConst.Get_Hero, this.getHero, this);
        this.registerFunc(GameConst.Remove_Enemy, this.removeEnemy, this);
    }

    /**
     * 获取主角
     * @returns {Hero}
     */
    public getHero():Hero {
        return this.gameView.hero;
    }

    private removeEnemy(enemy:Enemy):void {
        this.gameView.removeEnemy(enemy);
    }

    /**
     * 震动
     */
    public shock():void {
        App.ShockUtils.shock(App.ShockUtils.MAP, this.gameView);
    }

    /**
     * 慢镜头
     */
    public slowMotion():void {
        App.ShockUtils.destroy();

        AnchorUtil.setAnchor(this.gameView, 0.5);
        this.gameView.x = App.StageUtils.getWidth()*0.5;
        this.gameView.y = App.StageUtils.getHeight()*0.5;
        this.gameView.width = App.StageUtils.getWidth();
        this.gameView.height = App.StageUtils.getHeight();

        App.TimerManager.setTimeScale(0.1);
        egret.Tween.get(this.gameView).to({scaleX: 1.1, scaleY: 1.1}, 1200).to({
            scaleX: 1,
            scaleY: 1
        }, 300).call(this.slowMotionEnd, this);
    }

    private slowMotionEnd():void{
        AnchorUtil.setAnchor(this.gameView, 0);
        this.gameView.x = 0;
        this.gameView.y = 0;
        App.TimerManager.setTimeScale(1);
    }

    /**
     * 获取可攻击对象
     */
    public getMyAttackObjects(me:BaseGameObject, meAttackDis:Array<number>):Array<BaseHitGameObject> {
        this.canAttackObjs.length = 0;
        if (me instanceof Enemy) {
            if (!this.gameView.hero.isLand && this.checkIsInDis(me, this.gameView.hero, meAttackDis)) {
                this.canAttackObjs.push(this.gameView.hero);
            }
        }
        else if (me instanceof Hero) {
            for (var i:number = 0, len = this.gameView.enemys.length; i < len; i++) {
                var enemy:Enemy = this.gameView.enemys[i];
                if (enemy.isDie)
                    continue;
                if (enemy.isLand)
                    continue;
                if (!enemy.isInScreen)
                    continue;
                if (this.checkIsInDis(me, enemy, meAttackDis)) {
                    this.canAttackObjs.push(enemy);
                }
            }
        }
        return this.canAttackObjs;
    }

    /**
     * 获取离自己最近的对象
     * @param me
     */
    public getMyNearAttackObjects(me:BaseGameObject):BaseHitGameObject {
        if (me instanceof Enemy) {
            return this.gameView.hero;
        }
        else if (me instanceof Hero) {
        }
        return null;
    }


    /**
     * 六方向检测是否在攻击范围内
     */
    private checkHitRectangle_Att:egret.Rectangle = new egret.Rectangle();
    private checkHitRectangle_Def:egret.Rectangle = new egret.Rectangle();

    private checkIsInDis(attactObj:BaseGameObject, defenceObj:BaseGameObject, attackDis:Array<number>):Boolean {
        var front:number = attackDis[0];//前
        var back:number = attackDis[1];//后
        var left:number = attackDis[2];//左
        var right:number = attackDis[3];//右
        var top:number = attackDis[4];//上
        var down:number = attackDis[5];//下
        var ylen:number = defenceObj.y <= attactObj.y ? left : right;

        this.checkHitRectangle_Att.x = attactObj.x - (attactObj.scaleX == 1 ? back : front);
        this.checkHitRectangle_Att.y = attactObj.z - top;
        this.checkHitRectangle_Att.width = front + back;
        this.checkHitRectangle_Att.height = top + down;

        this.checkHitRectangle_Def.x = defenceObj.x - defenceObj.width * 0.5;
        this.checkHitRectangle_Def.y = defenceObj.z - defenceObj.height;
        this.checkHitRectangle_Def.width = defenceObj.width;
        this.checkHitRectangle_Def.height = defenceObj.height;

        return Math.abs(defenceObj.y - attactObj.y) <= ylen && this.checkHitRectangle_Att.intersects(this.checkHitRectangle_Def);
    }
}

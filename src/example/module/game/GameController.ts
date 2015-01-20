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
    public getMyAttackObjects(me:BaseGameObject, meAttackDis:number):Array<BaseGameObject>{
        var result:Array<BaseGameObject> = new Array<BaseGameObject>();
        if(me instanceof Enemy){
            if(!this.gameView.hero.isLand && App.MathUtils.getDistance(me.x, me.y, this.gameView.hero.x, this.gameView.hero.y) < meAttackDis){
                result.push(this.gameView.hero);
            }
        }
        else if(me instanceof Hero){
            for(var i:number=0, len=this.gameView.enemys.length; i<len; i++){
                var enemy:Enemy = this.gameView.enemys[i];
                if(!enemy.isLand && App.MathUtils.getDistance(me.x, me.y, enemy.x, enemy.y) < meAttackDis){
                    result.push(enemy);
                }
            }
        }
        return result;
    }
}
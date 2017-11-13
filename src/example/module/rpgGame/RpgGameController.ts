/**
 * Created by yangsong on 2017/10/11.
 */
class RpgGameController extends BaseController {

    private gameView: RpgGameView;
    private gameModel: RpgGameModel;

    public constructor() {
        super();

        //View初始化
        this.gameView = new RpgGameView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.RpgGame, this.gameView);

        //Model初始化
        this.gameModel = new RpgGameModel(this);

        //注册模块消息
        this.registerFunc(RpgGameConst.GameInit, this.gameInit, this);
        this.registerFunc(RpgGameConst.GameResize, this.gameResize, this);
    }

    private gameInit(mapId: number) {
        this.gameModel.mapId = mapId;
        this.gameModel.playerData = {
            mcName: "scenePlayer_0",
            propertyData: {
                name: "yangsong",
                title: "[开发者]",
                vip: 8,
                attackDis: 3,
                attackInterval: 1500,
                hp: 9999999
            }
        }
        this.gameModel.monsterNum = 200;

        App.ViewManager.open(ViewConst.RpgGame, this.gameModel);
    }

    private gameResize(): void {
        this.gameView.resize();
    }
}
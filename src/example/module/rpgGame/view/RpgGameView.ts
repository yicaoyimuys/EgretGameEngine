/**
 * Created by yangsong on 2017/10/11.
 */
class RpgGameView extends BaseSpriteView {
    private background: RpgBackground;
    private gameObjcetLayer: egret.DisplayObjectContainer;
    private gameEffectLayer: egret.DisplayObjectContainer;
    private blocksData: number[][];
    private player: RpgPlayer;
    private monsters: RpgMonster[];

    public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
        super($controller, $parent);
    }

    public initUI(): void {
        super.initUI();

        this.background = new RpgBackground();
        this.addChild(this.background);

        this.gameObjcetLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameObjcetLayer);

        this.gameEffectLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameEffectLayer);
    }

    public initData(): void {
        super.initData();

        this.monsters = [];
    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param: any[]): void {
        super.open(param);

        var gameModel: RpgGameModel = param[0];

        this.initBackground(gameModel.mapId);
        this.initBlocks(gameModel.mapId);
        this.createPlayer(gameModel.playerData);
        this.createMonsters(gameModel.monsterNum);
    }

    private initBackground(mapId: number): void {
        this.background.init(mapId);
    }

    private initBlocks(mapId: number): void {
        var mapData: any = RES.getRes("map_" + mapId + "_data.json");
        this.blocksData = mapData.blocks;
    }

    private createPlayer(playData: any): void {
        var col: number = App.RandomUtils.limitInteger(1, this.blocksData[0].length - 2);
        var row: number = App.RandomUtils.limitInteger(1, this.blocksData.length - 2);

        this.player = ObjectPool.pop("RpgPlayer");
        this.player.init({
            col: col,
            row: row,
            mcName: playData.mcName,
            mcPath: "resource/assets/rpgGame/player/",
            skillPath: "resource/assets/rpgGame/skill/",
            gameView: this,
            propertyData: playData.propertyData
        });
    }

    private createMonsters(monsterNum: number): void {
        var monstersData: any[] = [];
        for (var i = 0; i < monsterNum; i++) {
            var col: number = App.RandomUtils.limitInteger(1, this.blocksData[0].length - 2);
            var row: number = App.RandomUtils.limitInteger(1, this.blocksData.length - 2);
            var mcName: string = "monster_" + App.RandomUtils.limitInteger(0, 9);
            var mcPath: string = "resource/assets/rpgGame/monster/";
            monstersData.push({
                col: col,
                row: row,
                mcName: mcName,
                mcPath: mcPath,
                gameView: this,
                dis: App.MathUtils.getDistance(col, row, this.player.col, this.player.row),
                propertyData: {
                    name: "monster_" + App.RandomUtils.limitInteger(1, 1000),
                    attackDis: 3,
                    attackInterval: 3000,
                    hp: 2000,
                }
            })
        }

        monstersData.sort(function (a, b) {
            if (a.dis < b.dis) {
                return -1;
            } else {
                return 1;
            }
        })

        var executor: FrameExecutor = new FrameExecutor(1);
        monstersData.forEach(function (data) {
            executor.regist(function () {
                var monster: RpgMonster = ObjectPool.pop("RpgMonster");
                monster.init(data);
                this.monsters.push(monster);
            }, this);
        }.bind(this));
        executor.execute();
    }

    public showHpChange(gameObj: RpgGameObject, changeHp: number, txtColor: number = 0xFF0000): void {
        var hpTxt: egret.TextField = ObjectPool.pop("egret.TextField");
        hpTxt.size = 25;
        hpTxt.textColor = txtColor;
        hpTxt.width = 100;
        hpTxt.height = 20;
        hpTxt.textAlign = egret.HorizontalAlign.CENTER;
        hpTxt.strokeColor = 0x000000;
        hpTxt.stroke = 2;
        hpTxt.text = changeHp.toString();
        hpTxt.x = gameObj.x;
        hpTxt.y = gameObj.y - 150;
        hpTxt.alpha = 1;
        AnchorUtil.setAnchorX(hpTxt, 0.5);
        this.gameEffectLayer.addChild(hpTxt);

        egret.Tween.get(hpTxt).to({"y": gameObj.y - 250, "alpha": 0}, 1000).call(function () {
            App.DisplayUtils.removeFromParent(hpTxt);
            ObjectPool.push(hpTxt);
        })
    }

    public removeMonster(monster: RpgMonster): void {
        var index: number = this.monsters.indexOf(monster);
        if (index != -1) {
            this.monsters.splice(index, 1);
        }

        monster.destory();
        monster = null;
    }

    public resize(): void {
        if (!this.player) {
            return;
        }
        var cameraComponent: CameraComponent = <CameraComponent>this.player.getComponent(ComponentType.Camera);
        cameraComponent.dealMoveObjs();
        cameraComponent.dealBgCamera();
    }

    public getBlocksData(): number[][] {
        return this.blocksData;
    }

    public getGameObjcetLayer(): egret.DisplayObjectContainer {
        return this.gameObjcetLayer;
    }

    public getGameEffectLayer(): egret.DisplayObjectContainer {
        return this.gameEffectLayer;
    }

    public getBackground(): RpgBackground {
        return this.background;
    }

    public getMonsters(): RpgMonster[] {
        return this.monsters;
    }
}
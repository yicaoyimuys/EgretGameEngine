/**
 * Created by yangsong on 2017/10/13.
 */
class CameraComponent extends Component {
    private moveObjs: egret.DisplayObject[];
    private background: RpgBackground;
    private playerX: number;
    private playerY: number;
    private playerCol: number;
    private playerRow: number;

    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        this.moveObjs = [];
        this.moveObjs.push(this.entity.gameView.getGameEffectLayer());
        this.moveObjs.push(this.entity.gameView.getGameObjcetLayer());
        this.moveObjs.push(this.entity.gameView.getBackground());

        this.background = this.entity.gameView.getBackground();
    }

    public stop(): void {
        super.stop();

        this.moveObjs = null;
        this.background = null;
        this.playerX = null;
        this.playerY = null;
        this.playerCol = null;
        this.playerRow = null;
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);

        if (this.playerPosChange()) {
            this.playerX = this.entity.x;
            this.playerY = this.entity.y;

            this.dealMoveObjs();
        }

        if (this.playerCellChange()) {
            this.playerCol = this.entity.col;
            this.playerRow = this.entity.row;

            this.dealBgCamera();
        }
    }

    private playerPosChange(): boolean {
        return this.playerX != this.entity.x || this.playerY != this.entity.y;
    }

    private playerCellChange(): boolean {
        return this.playerCol != this.entity.col || this.playerRow != this.entity.row;
    }

    public dealMoveObjs(): void {
        var left: number = Math.max(this.playerX - App.StageUtils.getWidth() * 0.5, 0);
        var top: number = Math.max(this.playerY - App.StageUtils.getHeight() * 0.5, 0);

        left = Math.min(this.background.mapWidth - App.StageUtils.getWidth(), left);
        top = Math.min(this.background.mapHeight - App.StageUtils.getHeight(), top);

        this.moveObjs.forEach(function (obj: egret.DisplayObject) {
            obj.x = -left;
            obj.y = -top;
        })
    }

    public dealBgCamera(): void {
        this.background.updateCameraPos(this.playerX, this.playerY);
    }
}
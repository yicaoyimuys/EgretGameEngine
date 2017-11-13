/**
 * Created by yangsong on 2017/10/13.
 */
class AoiComponent extends Component {
    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        this.dealInterval = 1000;
        this.dealTime = this.dealInterval;
    }

    public stop(): void {
        super.stop();
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);

        this.setEntityAoi();
    }

    private setEntityAoi(): void {
        var gameObjectLayer: egret.DisplayObject = this.entity.gameView.getGameObjcetLayer();
        var minX: number = -gameObjectLayer.x;
        var minY: number = -gameObjectLayer.y;
        var maxX: number = minX + App.StageUtils.getWidth();
        var maxY: number = minY + App.StageUtils.getHeight();

        var minAoiPoint: egret.Point = RpgGameUtils.convertXYToAoi(minX, minY).clone();
        var maxAoiPoint: egret.Point = RpgGameUtils.convertXYToAoi(maxX, maxY).clone();

        var entityAoiPoint: egret.Point = RpgGameUtils.convertXYToAoi(this.entity.x, this.entity.y);
        var inCamera: boolean = (entityAoiPoint.x >= minAoiPoint.x && entityAoiPoint.x <= maxAoiPoint.x)
            && (entityAoiPoint.y >= minAoiPoint.y && entityAoiPoint.y <= maxAoiPoint.y);

        if (inCamera) {
            if (!this.entity.getInCamera()) {
                this.entity.setInCamera(true);
            }
        }
        else {
            if (this.entity.getInCamera()) {
                this.entity.setInCamera(false);
            }
        }
    }
}
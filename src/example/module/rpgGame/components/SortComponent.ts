/**
 * Created by yangsong on 2017/10/13.
 */
class SortComponent extends Component {
    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        this.dealInterval = 500;
    }

    public stop(): void {
        super.stop();
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);

        this.sortGameObjs();
    }

    private sortGameObjs(): void {
        this.entity.gameView.getGameObjcetLayer().$children.sort(this.sortF);
    }

    private sortF(d1: egret.DisplayObject, d2: egret.DisplayObject): number {
        if (d1.y > d2.y) {
            return 1;
        } else if (d1.y < d2.y) {
            return -1;
        } else {
            return 0;
        }
    }
}
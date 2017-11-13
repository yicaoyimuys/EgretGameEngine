/**
 * Created by yangsong on 2017/10/13.
 */
class ControlComponent extends Component {
    private astar: SilzAstar;

    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        this.entity.gameView.touchEnabled = true;
        this.entity.gameView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.astar = new SilzAstar(this.entity.gameView.getBlocksData());
    }

    public stop(): void {
        super.stop();

        this.entity.gameView.touchEnabled = false;
        this.entity.gameView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.astar = null;
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);
    }

    private onClick(evt: egret.TouchEvent): void {
        var gotoX: number = evt.stageX + (-this.entity.gameView.getGameObjcetLayer().x);
        var gotoY: number = evt.stageY + (-this.entity.gameView.getGameObjcetLayer().y);
        this.moveTo(gotoX, gotoY);
        this.entity.battleObj = null;
    }

    public moveTo(gotoX: number, gotoY: number): void {
        var currX: number = this.entity.x;
        var currY: number = this.entity.y;
        var path: PathNode[] = this.astar.find(currX, currY, gotoX, gotoY);
        if (path && path.length > 1) {
            path.shift();
            this.entity.path = path;
        } else {
            this.entity.path = null;
        }
    }
}
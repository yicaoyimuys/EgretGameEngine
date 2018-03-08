/**
 * Created by yangsong on 2017/10/12.
 */
class MoveComponent extends Component {
    private endX: number;
    private endY: number;
    private radian: number;
    private distance: number;
    private node: PathNode;

    public constructor() {
        super();
    }

    public start(): void {
        super.start();
    }

    public stop(): void {
        super.stop();

        this.endX = null;
        this.endY = null;
        this.radian = null;
        this.distance = null;
        this.node = null;
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);

        if (this.entity.pathChange) {
            this.entity.pathChange = false;
            this.node = null;
        }

        if (!this.node) {
            if (!this.entity.path) {
                return;
            }

            if (!this.entity.path.length) {
                this.entity.path = null;
                return;
            }

            this.nextNode();
            if (this.node) {
                this.move(advancedTime);
            }
        }
        else {
            this.move(advancedTime);
        }
    }

    private move(advancedTime: number): void {
        var useSpeed: number = this.entity.speed / (1000 / 60) * advancedTime;
        if (this.distance > useSpeed) {
            var speedX: number = Math.cos(this.radian) * useSpeed;
            var speedY: number = Math.sin(this.radian) * useSpeed;
            this.entity.x += speedX;
            this.entity.y += speedY;
            this.distance -= useSpeed;
        }
        else {
            this.entity.x = this.endX;
            this.entity.y = this.endY;
            this.entity.col = this.node.x;
            this.entity.row = this.node.y;
            this.node = null;
            // console.log(this._gameEntity.col, this._gameEntity.row);
        }
    }

    private nextNode(): void {
        this.node = this.entity.path.shift();
        var p: egret.Point = RpgGameUtils.convertCellToXY(this.node.x, this.node.y);
        this.endX = p.x;
        this.endY = p.y;
        this.radian = App.MathUtils.getRadian2(this.entity.x, this.entity.y, this.endX, this.endY);
        this.distance = App.MathUtils.getDistance(this.entity.x, this.entity.y, this.endX, this.endY);
        this.entity.dir = RpgGameUtils.computeGameObjDir(this.entity.x, this.entity.y, this.endX, this.endY);

        // console.log(angle, this._gameEntity.dir);
    }
}
/**
 * Created by yangsong on 2017/10/13.
 */
class AiComponent extends Component {
    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        this.resetDealInterval();
    }

    public stop(): void {
        super.stop();
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);

        if (this.entity.battleObj) {
            return;
        }

        this.doMove();
        this.resetDealInterval();
    }

    private resetDealInterval(): void {
        this.dealInterval = App.RandomUtils.limitInteger(5 * 1000, 50 * 1000);
    }

    private doMove(): void {
        var currCol: number = this.entity.col;
        var currRow: number = this.entity.row;

        var gotoDir: number = App.RandomUtils.limitInteger(0, 7);
        var gotoDis: number = App.RandomUtils.limitInteger(3, 8);

        var dirCol: number = 0;
        var dirRow: number = 0;
        if (gotoDir == Dir.Top) {
            dirRow = -1;
        } else if (gotoDir == Dir.TopRight) {
            dirCol = 1;
            dirRow = -1;
        } else if (gotoDir == Dir.Right) {
            dirCol = 1;
        } else if (gotoDir == Dir.BottomRight) {
            dirCol = 1;
            dirRow = 1;
        } else if (gotoDir == Dir.Bottom) {
            dirRow = 1;
        } else if (gotoDir == Dir.BottomLeft) {
            dirCol = -1;
            dirRow = 1;
        } else if (gotoDir == Dir.Left) {
            dirCol = -1;
        } else if (gotoDir == Dir.TopLeft) {
            dirCol = -1;
            dirRow = -1;
        }

        var mapBlocks: number[][] = this.entity.gameView.getBlocksData();
        var paths: PathNode[] = [];
        for (var i = 1; i <= gotoDis; i++) {
            var tmpCol: number = currCol + dirCol * i;
            var tmpRow: number = currRow + dirRow * i;

            if (!mapBlocks[tmpRow]) {
                break;
            }

            if (!mapBlocks[tmpRow][tmpCol]) {
                break;
            }
            paths.push(new PathNode(tmpCol, tmpRow));
        }

        if (paths.length > 1) {
            this.entity.path = paths;
        } else {
            this.entity.path = null;
        }
    }
}
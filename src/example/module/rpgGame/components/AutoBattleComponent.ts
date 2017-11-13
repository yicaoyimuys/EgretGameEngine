/**
 * Created by yangsong on 2017/10/13.
 */
class AutoBattleComponent extends Component {

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

        if (this.entity.action == Action.Stand) {
            if (!this.entity.battleObj) {
                this.searchBattleObj();
                this.moveToBattleObj();
            }
        }
    }

    private searchBattleObj(): void {
        var list: RpgMonster[] = this.entity.gameView.getMonsters();
        list.forEach(function (monster) {
            monster["dis"] = App.MathUtils.getDistance(monster.col, monster.row, this.entity.col, this.entity.row);
        }.bind(this));

        list.sort(function (a, b) {
            if (a["dis"] < b["dis"]) {
                return -1;
            } else {
                return 1;
            }
        })

        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (obj.propertyData.hp) {
                this.entity.battleObj = obj;
                break;
            }
        }
    }

    private moveToBattleObj(): void {
        if (!this.entity.battleObj) {
            return;
        }

        var offsetFlagX: number = 0;
        if (this.entity.x > this.entity.battleObj.x) {
            offsetFlagX = 1;
        } else if (this.entity.x < this.entity.battleObj.x) {
            offsetFlagX = -1;
        }

        var offsetFlagY: number = 0;
        if (this.entity.y > this.entity.battleObj.y) {
            offsetFlagY = 1;
        } else if (this.entity.y < this.entity.battleObj.y) {
            offsetFlagY = -1;
        }

        var endX: number = this.entity.battleObj.x + offsetFlagX * RpgGameData.GameCellWidth;
        var endY: number = this.entity.battleObj.y + offsetFlagY * RpgGameData.GameCellHeight;
        var controlComponent: ControlComponent = <ControlComponent>this.entity.getComponent(ComponentType.Control);
        controlComponent.moveTo(endX, endY);
    }
}
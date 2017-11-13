/**
 * Created by yangsong on 2017/10/13.
 */
class BattleComponent extends Component {
    private isAttacking: boolean;
    private attackTime: number;

    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        // this.dealInterval = 100;
    }

    public stop(): void {
        super.stop();

        this.isAttacking = false;
        this.attackTime = null;
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);

        if (!this.entity.battleObj) {
            return;
        }

        if (this.entity.action != Action.Stand) {
            return;
        }

        if (!this.isAttacking) {
            if (this.canAttack()) {
                this.startAttack();
            }
        }
        else {
            if (!this.canAttack()) {
                this.stopAttack();
            } else {
                this.continueAttack();
            }
        }
    }

    private canAttack(): boolean {
        var attackDis: number = this.entity.propertyData.attackDis;
        return Math.abs(this.entity.battleObj.col - this.entity.col) <= attackDis
            && Math.abs(this.entity.battleObj.row - this.entity.row) <= attackDis;
    }

    private stopAttack(): void {
        this.isAttacking = false;
        this.attackTime = null;
        this.entity.battleObj = null;
    }

    private startAttack(): void {
        this.isAttacking = true;
        this.attackTime = egret.getTimer();

        this.entity.dir = RpgGameUtils.computeGameObjDir(this.entity.x, this.entity.y, this.entity.battleObj.x, this.entity.battleObj.y);
        this.entity.action = Action.Attack;

        var defenceObj: RpgGameObject = this.entity.battleObj;
        if (!defenceObj.battleObj) {
            defenceObj.battleObj = this.entity;
            defenceObj.path = null;
        }

        egret.setTimeout(this.dealHarm, this, 500);
    }

    private dealHarm(): void {
        if (!this.entity) {
            return;
        }

        var defenceObj: RpgGameObject = this.entity.battleObj;
        if (!defenceObj) {
            return;
        }

        //计算伤害
        var harm: number = App.RandomUtils.limitInteger(200, 800);
        defenceObj.propertyData.hp = Math.max(0, defenceObj.propertyData.hp - harm);

        //掉血数字显示
        if (defenceObj instanceof RpgMonster) {
            this.entity.gameView.showHpChange(defenceObj, -harm);
        } else {
            this.entity.gameView.showHpChange(defenceObj, -harm, 0x00FF00);
        }

        //死亡处理
        if (defenceObj.propertyData.hp == 0) {
            if (defenceObj instanceof RpgMonster) {
                this.entity.battleObj = null;
                this.entity.gameView.removeMonster(defenceObj);
            }
        } else {
            if (defenceObj.action == Action.Stand) {
                defenceObj.action = Action.Attacked;
            }
        }
    }

    private continueAttack(): void {
        var attackInterval: number = this.entity.propertyData.attackInterval;
        var nowTime: number = egret.getTimer();
        if (nowTime - this.attackTime >= attackInterval) {
            this.startAttack();
        }
    }
}
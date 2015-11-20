/**
 * Created by yangsong on 15-1-15.
 */
class GameView extends BaseSpriteView {
    private controller:BaseController;

    private bg:egret.Bitmap;
    private objectContainer:egret.DisplayObjectContainer;
    public hero:Hero;
    public enemys:Array<Enemy>;

    public constructor($controller:BaseController, $parent:egret.DisplayObjectContainer) {
        super($controller, $parent);
        this.controller = $controller;
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void {
        super.initUI();

        GameData.MIN_X = 50;
        GameData.MAX_X = App.StageUtils.getWidth() - 50;
        GameData.MIN_Y = App.StageUtils.getHeight() - 300;
        GameData.MAX_Y = App.StageUtils.getHeight() - 10;

        this.bg = App.DisplayUtils.createBitmap("map_jpg");
        AnchorUtil.setAnchorX(this.bg, 0.5);
        AnchorUtil.setAnchorY(this.bg, 1);
        this.bg.x = App.StageUtils.getWidth() * 0.5;
        this.bg.y = App.StageUtils.getHeight();
        this.addChild(this.bg);

        this.objectContainer = new egret.DisplayObjectContainer();
        this.addChild(this.objectContainer);

        //提前初始化好怪物
        this.enemys = new Array<Enemy>();
        for (var i:number = 0; i < 4; i++) {
            var enemy:Enemy = ObjectPool.pop("Enemy", this.controller);
            enemy.init();
            this.enemys.push(enemy);
        }
        while (this.enemys.length) {
            this.enemys.pop().destory();
        }

        //提前初始化好Boss
        var boss:Boss = ObjectPool.pop("Boss", this.controller);
        boss.destory();

        //创建主角
        this.hero = ObjectPool.pop("Hero", this.controller);
        this.hero.init();
        this.hero.x = App.StageUtils.getWidth() * 0.3;
        this.hero.y = App.StageUtils.getHeight() * 0.7;
        this.objectContainer.addChild(this.hero);

        //创建Enemy
        this.startCreateEnemy();

        if (!App.DeviceUtils.IsMobile) {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        //深度排序
        App.TimerManager.doTimer(3, 0, this.sortGameObjs, this);
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void {
        super.initData();
    }

    /**
     * 开始创建怪物
     */
    private startCreateEnemy():void {
        this.enemys.length = 0;
        App.TimerManager.doTimer(100, 0, this.createEnemy, this);
    }

    /**
     * 创建怪物
     */
    private createEnemy():void {
        this.enemys.push(this.createEnemySingle("Enemy"));
        if (this.enemys.length >= 4) {
            App.TimerManager.remove(this.createEnemy, this);
        }
    }

    /**
     * 创建Boss
     */
    private createBoss():void {
        for (var i:number = 0, len:number = this.enemys.length; i < len; i++) {
            if (this.enemys[i] instanceof Boss) {
                return;
            }
        }
        this.enemys.push(this.createEnemySingle("Boss"));
    }

    private createEnemySingle(clsName:string):Enemy {
        var initX:number = Math.random() > 0.5 ? GameData.MAX_X + 200 : GameData.MIN_X - 200;
        var initY:number = App.RandomUtils.limit(GameData.MIN_Y, GameData.MAX_Y);
        var enemy:Enemy = ObjectPool.pop(clsName, this.controller);
        enemy.init();
        enemy.x = initX;
        enemy.y = initY;
        enemy.setPos();
        enemy.scaleX = Math.random() < 0.5 ? 1 : -1;
        this.objectContainer.addChild(enemy);

        var gotoX:number = App.RandomUtils.limit(GameData.MIN_X, GameData.MAX_X);
        var gotoY:number = initY;
        enemy.command_in(3, gotoX, gotoY);
        return enemy;
    }

    public removeEnemy(enemy:Enemy):void {
        var index:number = this.enemys.indexOf(enemy);
        if (index != -1) {
            this.enemys.splice(index, 1);
            if (this.enemys.length == 0) {
                this.startCreateEnemy();
            }
            else if (this.enemys.length == 2) {
                this.createBoss();
            }
        }
    }

    private sortGameObjs():void {
        this.objectContainer.$children.sort(this.sortF);
    }

    private sortF(d1:BaseGameObject, d2:BaseGameObject):number {
        if (d1.y > d2.y) {
            return 1;
        } else if (d1.y < d2.y) {
            return -1;
        } else {
            return 0;
        }
    }

    private onClick(evt:egret.TouchEvent):void {
        if (this.hero.isAttack) {
            return;
        }

        if (evt.localX < GameData.MIN_X
            || evt.localX > GameData.MAX_X
            || evt.localY < GameData.MIN_Y
            || evt.localY > GameData.MAX_Y) {
            return;
        }

        App.RockerUtils.stop();
        this.hero.walkTo(5, evt.localX, evt.localY);
    }
}

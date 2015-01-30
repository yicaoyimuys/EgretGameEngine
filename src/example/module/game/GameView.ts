/**
 * Created by yangsong on 15-1-15.
 */
class GameView extends BaseSpriteView{
    private controller:BaseController;

    private bg:egret.Bitmap;
    private objectContainer:egret.DisplayObjectContainer;
    public hero:Hero;
    public enemys:Array<Enemy>;

    public constructor($controller:BaseController, $parent:egret.DisplayObjectContainer){
        super($controller, $parent);
        this.controller = $controller;
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();

        GameData.MIN_X = 50;
        GameData.MAX_X = App.StageUtils.getWidth() - 50;
        GameData.MIN_Y = App.StageUtils.getHeight() - 300;
        GameData.MAX_Y = App.StageUtils.getHeight() - 10;

        this.bg = App.DisplayUtils.createBitmap("map_jpg");
        this.bg.anchorX = 0.5;
        this.bg.anchorY = 1;
        this.bg.x = App.StageUtils.getWidth() * 0.5;
        this.bg.y = App.StageUtils.getHeight();
        this.addChild(this.bg);

        this.objectContainer = new egret.DisplayObjectContainer();
        this.addChild(this.objectContainer);

        //提前初始化好怪物
        this.enemys = new Array<Enemy>();
        for(var i:number=0; i<4; i++){
            var enemy:Enemy = ObjectPool.pop(Enemy, this.controller);
            enemy.init();
            this.enemys.push(enemy);
        }
        while(this.enemys.length){
            this.enemys[0].destory();
        }
        App.TimerManager.doTimer(2000, 0, this.createEnemy, this);

        //创建主角
        this.hero = ObjectPool.pop(Hero, this.controller);
        this.hero.init();
        this.hero.x = App.StageUtils.getWidth() * 0.3;
        this.hero.y = App.StageUtils.getHeight() * 0.7;
        this.objectContainer.addChild(this.hero);

        if(!App.DeviceUtils.IsMobile){
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        App.TimerManager.doTimer(3, 0, this.sortGameObjs, this);
        App.SoundManager.playBg("sound_bg", 0.3);
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void{
        super.initData();
    }

    private createEnemy():void{
        if(this.enemys.length < 4){
            var initX:number = Math.random() > 0.5 ? GameData.MAX_X+200 : GameData.MIN_X-200;
            var initY:number = App.RandomUtils.limit(GameData.MIN_Y, GameData.MAX_Y);
            var enemy:Enemy = ObjectPool.pop(Enemy, this.controller);
            enemy.init();
            enemy.x = initX;
            enemy.y = initY;
            enemy.setPos();
            enemy.scaleX = Math.random()<0.5 ? 1 : -1;
            this.enemys.push(enemy);
            App.EgretExpandUtils.addChild(this.objectContainer, enemy);

            var gotoX:number = App.RandomUtils.limit(GameData.MIN_X, GameData.MAX_X);
            var gotoY:number = initY;
            enemy.command_in(3, gotoX, gotoY);
        }
    }

    public removeEnemy(enemy:Enemy):void{
        var index:number = this.enemys.indexOf(enemy);
        this.enemys.splice(index, 1);
    }

    private sortGameObjs():void{
        this.objectContainer._children.sort(this.sortF);
    }

    private sortF(d1:BaseGameObject, d2:BaseGameObject):number{
        if(d1.y > d2.y){
            return 1;
        }else if(d1.y < d2.y){
            return -1;
        }else{
            return 0;
        }
    }

    private onClick(evt:egret.TouchEvent):void{
        if(this.hero.isAttack){
            return;
        }

        if(evt.localX < GameData.MIN_X
            || evt.localX > GameData.MAX_X
            || evt.localY < GameData.MIN_Y
            || evt.localY > GameData.MAX_Y){
            return;
        }

        App.RockerUtils.stop();
        this.hero.walkTo(5, evt.localX, evt.localY);
    }
}
/**
 * Created by egret on 15-1-19.
 */
class GameUIView extends BaseSpriteView {

    private hero:Hero;

    public constructor($controller:BaseController, $parent:egret.DisplayObjectContainer) {
        super($controller, $parent);
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void {
        super.initUI();

        //攻击图标
        this.addChild(this.createImageButton("ui_btnAttack_png", "ui_btnAttack1_png", App.StageUtils.getWidth() - 55, App.StageUtils.getHeight() - 53, this.heroAttack));
        //技能1图标
        this.addChild(this.createImageButton("ui_btnSkill1_png", "ui_btnSkill1_1_png", App.StageUtils.getWidth() - 120, App.StageUtils.getHeight() - 140, this.heroSkill1));
        //技能2图标
        this.addChild(this.createImageButton("ui_btnSkill2_png", "ui_btnSkill2_1_png", App.StageUtils.getWidth() - 40, App.StageUtils.getHeight() - 160, this.heroSkill2));
        //技能3图标
        this.addChild(this.createImageButton("ui_btnSkill3_png", "ui_btnSkill3_1_png", App.StageUtils.getWidth() - 180, App.StageUtils.getHeight() - 40, this.heroSkill3));
        //技能4图标
        this.addChild(this.createImageButton("ui_btnSkill4_png", "ui_btnSkill4_1_png", App.StageUtils.getWidth() - 200, App.StageUtils.getHeight() - 120, this.heroSkill4));

        //摇杆
        var moveFlagX:number = 120;
        var moveFlagY:number = App.StageUtils.getHeight() - 120;

        var moveBg:egret.Bitmap = App.DisplayUtils.createBitmap("ui_moveBg_png");
        AnchorUtil.setAnchor(moveBg, 0.5);
        moveBg.x = moveFlagX;
        moveBg.y = moveFlagY;
        this.addChild(moveBg);

        var moveFlag:egret.Bitmap = App.DisplayUtils.createBitmap("ui_move_png");
        AnchorUtil.setAnchor(moveFlag, 0.5);
        moveFlag.x = moveFlagX;
        moveFlag.y = moveFlagY;
        this.addChild(moveFlag);

        //摇杆控制
        App.RockerUtils.init(moveBg, moveFlag, this.dealKey, this);

        //键盘控制
        App.KeyboardUtils.addKeyUp(this.onKeyUp, this);
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initData():void {
        super.initData();
        this.hero = this.applyFunc(GameConst.Get_Hero);
    }

    private dealKey(xFlag:number, yFlag:number):boolean {
        if (this.hero.isAttack) {
            return false;
        }

        if (this.hero.isJump) {
            return false;
        }

        if (this.hero.isHurt) {
            return false;
        }

        if (this.hero.isLand) {
            return false;
        }

        if (xFlag || yFlag) {
            this.hero.walk(xFlag, yFlag, 7);
            return true;
        }
        else {
            if (this.hero.isMove) {
                this.hero.stopMove();
            }
        }
        return false;
    }

    private onKeyUp(keyCode:number):void {
        switch (keyCode) {
            case Keyboard.J:
                this.heroAttack();
                break;
            case Keyboard.K:
                break;
            case Keyboard.U:
                this.heroSkill1();
                break;
            case Keyboard.I:
                this.heroSkill2();
                break;
            case Keyboard.O:
                this.heroSkill3();
                break;
            case Keyboard.P:
                this.heroSkill4();
                break;
            default :
                break;
        }
    }

    private heroAttack():void {
        if (this.hero.isAttack) {
            this.hero.addMaxAttackIndex();
            return;
        }
        this.hero.attack();
    }

    private heroSkill1():void {
        this.hero.skill(1);
    }

    private heroSkill2():void {
        this.hero.skill(2);
    }

    private heroSkill3():void {
        this.hero.skill(3);
    }

    private heroSkill4():void {
        this.hero.skill(4);
    }

    private createImageButton(imgName1:string, imgName2:string, $x:number, $y:number, callBack:Function):egret.Bitmap {
        var bitmap:egret.Bitmap = App.DisplayUtils.createBitmap(imgName1);
        bitmap.touchEnabled = true;
        AnchorUtil.setAnchor(bitmap, 0.5);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function():void{
            bitmap.texture = RES.getRes(imgName2);
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_END, function ():void {
            bitmap.texture = RES.getRes(imgName1);
        }, this);
        bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function ():void {
            callBack.call(this);
        }, this);
        bitmap.x = $x;
        bitmap.y = $y;
        return bitmap;
    }
}

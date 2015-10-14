/**
 * Created by egret on 15-1-6.
 */
class HomeView extends BaseGuiView{
    public constructor($controller:BaseController, $parent:egret.gui.Group) {
        super($controller, $parent);

        this.skinName = "skins.GuiScreenSkin";
    }

    public menuBtn:egret.gui.ToggleButton;
    public menu:Menu;

    public friendBtn:egret.gui.UIAsset;
    public shopBtn:egret.gui.UIAsset;
    public warehouseBtn:egret.gui.UIAsset;
    public factoryBtn:egret.gui.UIAsset;
    public moreBtn:egret.gui.UIAsset;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();
        this.menu.touchChildren = true;
        this.menu.touchEnabled = true;
        this.menu.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.menuClickHandler,this);
        this.menuBtn.addEventListener(egret.Event.CHANGE,this.menuBtnChangeHandler,this);
        this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.friendClickHandler,this);
        this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.shopClickHandler,this);
        this.warehouseBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.warehouseClickHandler,this);
        this.factoryBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.factoryClickHandler,this);
        this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moreClickHandler,this);
    }

    private playSound():void{
        App.SoundManager.playEffect("sound_dianji");
    }

    private friendClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        App.ViewManager.open(ViewConst.Friend);
    }

    private shopClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        App.ViewManager.open(ViewConst.Shop);
    }

    private warehouseClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        App.ViewManager.open(ViewConst.Warehouse);
    }

    private factoryClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        App.ViewManager.open(ViewConst.Factory);
    }

    private moreClickHandler(e:egret.TouchEvent):void{
        this.playSound();
    }


    private menuBtnChangeHandler(e:egret.Event):void{
        this.playSound();
        if(this.menu){
            this.menu.visible = this.menuBtn.selected;
        }
    }

    private menuClickHandler(e:egret.TouchEvent):void{
        if(e.target == this.menu.taskBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Task);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if(e.target == this.menu.dailyBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Daily);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if(e.target == this.menu.mailBtn){
            this.playSound();
            App.ViewManager.open(ViewConst.Mail);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
    }
}
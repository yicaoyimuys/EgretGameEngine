/**
 * Created by husong on 4/10/15.
 */
class EasyLoading extends BaseClass {

    private contentGroup:egret.gui.Group = null;
    private shape:egret.Shape = null;
    private uiAsset:egret.gui.UIAsset = null;
    private speed:number = 10;

    constructor() {
        super();
        this.init();
    }

    private init():void {
        this.contentGroup = new egret.gui.Group();

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x000000,0.2);
        this.shape.graphics.drawRect(0, 0, App.StageUtils.getWidth(), App.StageUtils.getHeight());
        this.shape.graphics.endFill();
        this.shape.touchEnabled = true;
        this.shape.cacheAsBitmap = true;
        this.contentGroup.addElement(new egret.gui.UIAsset(this.shape));

        this.uiAsset = new egret.gui.UIAsset();
        this.uiAsset.source = "resource/assets/load_Reel.png";
        this.uiAsset.anchorX = 0.5;
        this.uiAsset.anchorY = 0.5;
        this.uiAsset.x = App.StageUtils.getWidth()*0.5;
        this.uiAsset.y = App.StageUtils.getHeight()*0.5;
        this.contentGroup.addElement(this.uiAsset);
    }

    public showLoading():void {
        App.StageUtils.getUIStage().addElement(this.contentGroup);
        App.TimerManager.doFrame(1, 0, this.enterFrame, this);
    }

    public hideLoading():void {
        if(this.contentGroup && this.contentGroup.parent) {
            App.StageUtils.getUIStage().removeElement(this.contentGroup);
            this.uiAsset.rotation = 0;
        }
        App.TimerManager.remove(this.enterFrame, this);
    }

    private enterFrame() {
        this.uiAsset.rotation += this.speed;
    }
}

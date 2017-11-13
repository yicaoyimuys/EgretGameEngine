/**
 * Created by yangsong on 2017/10/11.
 */
class HeadComponent extends Component {
    private nameTxt: egret.TextField;
    private titleTxt: egret.TextField;

    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        var avatarComponent: AvatarComponent = <AvatarComponent>this.entity.getComponent(ComponentType.Avatar);

        this.createNameTxt(avatarComponent.body);
        this.createTitleTxt(avatarComponent.body);
    }

    private createNameTxt(parent: egret.DisplayObjectContainer): void {
        this.nameTxt = new egret.TextField();
        this.nameTxt.size = 18;
        this.nameTxt.textColor = 0xFFFFFF;
        this.nameTxt.width = 100;
        this.nameTxt.height = 20;
        this.nameTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.nameTxt.strokeColor = 0x000000;
        this.nameTxt.stroke = 2;
        this.nameTxt.text = this.entity.propertyData.name;
        this.nameTxt.y = -160;
        AnchorUtil.setAnchorX(this.nameTxt, 0.5);

        parent.addChild(this.nameTxt);
    }

    private createTitleTxt(parent: egret.DisplayObjectContainer): void {
        this.titleTxt = new egret.TextField();
        this.titleTxt.size = 18;
        this.titleTxt.textColor = 0x87CEEB;
        this.titleTxt.width = 100;
        this.titleTxt.height = 20;
        this.titleTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTxt.strokeColor = 0x000000;
        this.titleTxt.stroke = 2;
        this.titleTxt.text = this.entity.propertyData.title;
        this.titleTxt.y = -180;
        AnchorUtil.setAnchorX(this.titleTxt, 0.5);

        parent.addChild(this.titleTxt);
    }

    public stop(): void {
        super.stop();

        App.DisplayUtils.removeFromParent(this.nameTxt);
        this.nameTxt = null;

        App.DisplayUtils.removeFromParent(this.titleTxt);
        this.titleTxt = null;
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);
    }
}
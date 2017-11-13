/**
 * Created by yangsong on 2017/10/11.
 */
class AvatarComponent extends Component {
    public body: egret.DisplayObjectContainer;
    private mc: RpgMovieClip;

    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        this.mc = ObjectPool.pop("RpgMovieClip");
        this.mc.setDefault("avatarDefault_png");
        this.mc.setComplateAction(this.complateAction, this);

        this.body = ObjectPool.pop("egret.DisplayObjectContainer");
        this.body.addChild(this.mc);
        this.entity.gameView.getGameObjcetLayer().addChild(this.body);

        this.startLoad();
    }

    public stop(): void {
        super.stop();

        this.mc.destroy();
        this.mc = null;

        App.DisplayUtils.removeFromParent(this.body);
        ObjectPool.push(this.body);
        this.body.removeChildren();
        this.body = null;
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);

        this.setPos();

        if (this.entity.action != this.mc.getCurrAction()
            || this.entity.dir != this.mc.getCurrDir()) {
            this.mc.gotoAction(this.entity.action, this.entity.dir);
        }

        this.mc.runAction(advancedTime);
    }

    private complateAction(): void {
        if (this.mc.getCurrAction() == Action.Die) {
            this.entity.gameView.removeMonster(this.entity);
        } else {
            this.entity.action = Action.Stand;
            this.mc.gotoAction(this.entity.action, this.entity.dir);
        }
    }

    private setPos(): void {
        if (this.body.x != this.entity.x) {
            this.body.x = this.entity.x;
        }
        if (this.body.y != this.entity.y) {
            this.body.y = this.entity.y;
        }
    }

    private startLoad(): void {
        RpgGameRes.loadAvatar(this.entity.mcPath, this.entity.mcName, this.onLoadComplate, this);
    }

    private onLoadComplate(): void {
        if (!this.isRuning) {
            return;
        }

        var avatarResName: string = this.entity.mcName;
        var data = RES.getRes("avatar_" + avatarResName + ".json");
        var texture = RES.getRes("avatar_" + avatarResName + ".png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mc.setMcData(mcFactory.generateMovieClipData(avatarResName));
    }
}
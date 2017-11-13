/**
 * Created by yangsong on 2017/10/11.
 */
class AvatarSkillComponent extends Component {
    private mc: RpgMovieClip;
    private mcParent: egret.DisplayObjectContainer;

    public constructor() {
        super();
    }

    public start(): void {
        super.start();

        var avatarComponent: AvatarComponent = <AvatarComponent>this.entity.getComponent(ComponentType.Avatar);
        this.mcParent = avatarComponent.body;

        this.mc = ObjectPool.pop("RpgMovieClip");
        this.mc.setComplateAction(this.complateAction, this);

        this.startLoad();
    }

    public stop(): void {
        super.stop();

        this.mc.destroy();
        this.mc = null;

        this.mcParent = null;
    }

    public update(advancedTime: number): void {
        super.update(advancedTime);

        if (this.entity.action == Action.Attack && !this.mc.parent) {
            this.startMc();
        }
        else if (this.entity.action != Action.Attack && this.mc.parent) {
            this.stopMc();
        }

        if (this.mc.parent) {
            this.mc.runAction(advancedTime);
        }
    }

    private startMc(): void {
        this.mc.gotoAction(this.entity.action, this.entity.dir, true);
        if (this.entity.dir == Dir.Top
            || this.entity.dir == Dir.TopLeft
            || this.entity.dir == Dir.TopRight) {
            this.mcParent.addChildAt(this.mc, 0);
        } else {
            this.mcParent.addChild(this.mc);
        }
    }

    private stopMc(): void {
        App.DisplayUtils.removeFromParent(this.mc);
    }

    private complateAction(): void {
        this.stopMc();
    }

    private startLoad(): void {
        RpgGameRes.loadAvatar(this.entity.skillPath, this.entity.mcName + "_attack", this.onLoadComplate, this);
    }

    private onLoadComplate(): void {
        if (!this.isRuning) {
            return;
        }

        var avatarResName: string = this.entity.mcName + "_attack";
        var data = RES.getRes("avatar_" + avatarResName + ".json");
        var texture = RES.getRes("avatar_" + avatarResName + ".png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mc.setMcData(mcFactory.generateMovieClipData(avatarResName));
    }
}
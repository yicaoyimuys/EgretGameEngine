/**
 * Created by yangsong on 2017/10/11.
 */
enum Dir {
    Top,
    TopRight,
    Right,
    BottomRight,
    Bottom,
    BottomLeft,
    Left,
    TopLeft
}

class Action {
    public static Prepare: string = "prepare";
    public static Attack: string = "attack";
    public static Attacked: string = "attacked";
    public static Die: string = "die";
    public static Move: string = "move";
    public static Stand: string = "stand";
}

class RpgMovieClip extends egret.Bitmap {
    private McFrameTime: number = 1000 / 8;

    private mcData: egret.MovieClipData;
    private currAction: string;
    private currDir: Dir;
    private currFrame: number;
    private startFrame: number;
    private endFrame: number;
    private currFrameTime: number;
    private totalPlayNum: number;
    private currPlayNum: number;
    private complateAction: Function;
    private complateActionObj: any;

    public constructor() {
        super();
    }

    private setBitmap(texture: egret.Texture, scaleX: number): void {
        this.texture = texture;
        this.scaleX = scaleX;
        AnchorUtil.setAnchorX(this, 0.5);
        AnchorUtil.setAnchorY(this, 1);
    }

    public setDefault(resName: string): void {
        this.setBitmap(RES.getRes(resName), 1);
    }

    public setMcData(mcData: egret.MovieClipData): void {
        this.mcData = mcData;
    }

    public runAction(advancedTime: number): void {
        if (!this.mcData) {
            return;
        }

        this.currFrameTime += advancedTime;
        if (this.currFrameTime >= this.McFrameTime) {
            this.currFrameTime = 0;
            this.currFrame++;
            if (this.currFrame > this.endFrame) {
                this.currFrame = this.startFrame;
                this.currPlayNum++;
            }
            if (this.totalPlayNum && this.currPlayNum >= this.totalPlayNum) {
                this.complateAction && this.complateAction.apply(this.complateActionObj);
            } else {
                var bitmapTexture: egret.Texture = this.mcData.getTextureByFrame(this.currFrame);
                this.setBitmap(bitmapTexture, this.scaleX);
            }
        }
    }

    public gotoAction(gotoAction: string, gotoDir: Dir, cover: boolean = false): void {
        if (!this.mcData) {
            return;
        }

        if (!cover) {
            if (this.currAction == gotoAction && this.currDir == gotoDir) {
                return;
            }
        }

        var totalPlayNum: number = 0;
        if (gotoAction == Action.Attack
            || gotoAction == Action.Attacked
            || gotoAction == Action.Die) {
            totalPlayNum = 1;
        }

        //0上 1右上 2右 3右下 4下
        var dir: number;
        var scaleX: number;
        if (gotoDir == Dir.Top) {
            dir = 0;
            scaleX = 1;
        } else if (gotoDir == Dir.TopRight) {
            dir = 1;
            scaleX = 1;
        } else if (gotoDir == Dir.Right) {
            dir = 2;
            scaleX = 1;
        } else if (gotoDir == Dir.BottomRight) {
            dir = 3;
            scaleX = 1;
        } else if (gotoDir == Dir.Bottom) {
            dir = 4;
            scaleX = 1;
        } else if (gotoDir == Dir.BottomLeft) {
            dir = 3;
            scaleX = -1;
        } else if (gotoDir == Dir.Left) {
            dir = 2;
            scaleX = -1;
        } else if (gotoDir == Dir.TopLeft) {
            dir = 1;
            scaleX = -1;
        }

        var actionName: string = gotoAction + "_" + dir;
        var currLabel: egret.FrameLabel;
        for (var i = 0; i < this.mcData.labels.length; i++) {
            if (actionName == this.mcData.labels[i].name) {
                currLabel = this.mcData.labels[i];
            }
        }

        if (this.currAction == gotoAction && !cover) {
            this.currFrame = currLabel.frame + (this.currFrame - this.startFrame);
        }
        else {
            this.currFrame = currLabel.frame;
            this.currFrameTime = 0;
        }
        this.startFrame = currLabel.frame;
        this.endFrame = currLabel.end;

        this.currAction = gotoAction;
        this.currDir = gotoDir;
        this.totalPlayNum = totalPlayNum;
        this.currPlayNum = 0;

        var bitmapTexture: egret.Texture = this.mcData.getTextureByFrame(this.currFrame);
        this.setBitmap(bitmapTexture, scaleX);
    }

    public setComplateAction(complateAction: Function, complateActionObj: any): void {
        this.complateAction = complateAction;
        this.complateActionObj = complateActionObj;
    }

    public destroy(): void {
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);

        this.texture = null;

        this.mcData = null;
        this.currAction = null;
        this.currDir = null;
        this.currFrame = null;
        this.startFrame = null;
        this.endFrame = null;
        this.currFrameTime = null;
        this.totalPlayNum = null;
        this.currPlayNum = null;
        this.complateAction = null;
        this.complateActionObj = null;
    }

    public getCurrAction(): string {
        return this.currAction;
    }

    public getCurrDir(): Dir {
        return this.currDir;
    }
}
/**
 * Created by yangsong on 2014/6/16.
 * 自定义SwfMovieClip类，带有帧处理函数
 */
class StarlingSwfMovieClip extends starlingswf.SwfMovieClip {

    private frameActions:any;
    private preFrame:number;
    private complateFunc:Function;
    private complateObj:Function;
    private currFrameName:Object;

    /**
     * 构造函数
     * @param frames
     * @param labels
     * @param displayObjects
     * @param ownerSwf
     */
    public constructor(frames:any[], labels:any[], displayObjects:Object, ownerSwf:starlingswf.Swf) {
        super(frames, labels, displayObjects, ownerSwf);
        this.frameActions = {};
        this.preFrame = -1;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }

    /**
     * 移除舞台处理函数
     */
    private onRemove() {
        this.stop();
    }

    /**
     * 设置帧事件
     * @param $frame 第几帧
     * @param $action 执行函数
     * @param $actionObj 执行函数所属对象
     * @param $param 执行函数所需参数
     */
    public setFrameAction($frame:number, $action:Function, $actionObj:any, $param:any = null):void {
        this.frameActions[$frame] = [$action, $actionObj, $param];
    }

    /**
     * 设置mc播放完成执行的函数
     * @param $action 执行函数
     * @param $actionObj 执行函数所属对象
     */
    public setCompleteAction($action:Function, $actionObj:any):void {
        this.complateFunc = $action;
        this.complateObj = $actionObj;
        this.addEventListener(egret.Event.COMPLETE, this.onPlayend, this);
    }

    /**
     * 播放结束执行函数
     */
    private onPlayend():void {
        if (this.complateFunc) {
            this.complateFunc.call(this.complateObj);
        }
    }

    /**
     * 播放
     * @param frame
     */
    public goToPlay(frame:Object):void {
        this.preFrame = -1;
        this.currFrameName = frame;
        this.gotoAndPlay(frame);
    }

    /**
     * 重写setCurrentFrame函数，处理帧事件
     */
    public setCurrentFrame(frame:number):void {
        super.setCurrentFrame(frame);

        var currFrame:number = this.getCurrentFrame();
        if (this.preFrame != currFrame) {
            this.preFrame = currFrame;
            if (this.frameActions && this.frameActions[currFrame]) {
                var arr:Array<any> = this.frameActions[currFrame];
                if (arr[2])
                    arr[0].call(arr[1], arr[2]);
                else
                    arr[0].call(arr[1]);
            }
        }
    }

    /**
     * 销毁
     */
    public dispose():void {
        this.stop();
        this.removeEventListener(egret.Event.COMPLETE, this.onPlayend, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        App.DisplayUtils.removeFromParent(this);
        this.complateFunc = null;
        this.complateObj = null;
        this.frameActions = null;
    }
}
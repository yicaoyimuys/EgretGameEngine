/**
 * Created by yangsong on 2014/11/23.
 * Debug调试工具
 */
class DebugUtils extends BaseClass {
    private _isOpen:boolean;
    private _key:string;
    private _startTime:number = 0;
    private _fpsColor:number = 0xFFFFFF;
    private _threshold:number = 3;

    public constructor() {
        super();
    }

    /**
     * 设置调试是否开启
     * @param flag
     *
     */
    public isOpen(flag:boolean):void {
        this._isOpen = flag;
    }

    /**
     * 是否是调试模式
     * @returns {boolean}
     */
    public get isDebug():boolean {
        return this._isOpen;
    }

    /**
     * 开始
     * @param key 标识
     * @param minTime 最小时间
     *
     */
    public start(key:string):void {
        if (!this._isOpen) {
            return;
        }
        this._key = key;
        this._startTime = egret.getTimer();
    }

    /**
     * 停止
     *
     */
    public stop():number {
        if (!this._isOpen) {
            return 0;
        }
        var cha:number = egret.getTimer() - this._startTime;
        if (cha > this._threshold) {
            Log.trace(this._key + ": " + cha);
        }
        return cha;
    }

    /**
     * 设置时间间隔阈值
     * @param value
     */
    public setThreshold(value:number):void {
        this._threshold = value;
    }

    /**
     * 显示Fps
     */
    public openFps():void {
        if (!this._isOpen) {
            return;
        }

        var txt:egret.TextField = egret.Profiler.getInstance()["_txt"];
        if (!txt) {
            egret.Profiler.getInstance().run();
            txt = egret.Profiler.getInstance()["_txt"];
            txt.textColor = this._fpsColor;
        }
        App.StageUtils.getStage().addChild(txt);
    }

    /**
     * 设置Fps颜色值
     * @param color
     */
    public setFpsColor(color:number):void {
        if (!this._isOpen) {
            return;
        }

        this._fpsColor = color;

        var txt:egret.TextField = egret.Profiler.getInstance()["_txt"];
        if (txt) {
            txt.textColor = this._fpsColor;
        }
    }
}

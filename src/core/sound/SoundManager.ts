/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
class SoundManager extends SingtonClass {
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    public static CLEAR_TIME: number = 3 * 60 * 1000;

    //LocalStorage使用的key值
    private LocalStorageKey_Bg: string = "bgMusicFlag";
    private LocalStorageKey_Effect: string = "effectMusicFlag";

    private effect: ISoundEffect;
    private bg: ISoundBg;
    private effectOn: boolean;
    private bgOn: boolean;
    private currBg: string;
    private bgVolume: number;
    private effectVolume: number;

    /**
     * 构造函数
     */
    public constructor() {
        super();

        this.bgVolume = 0.5;
        this.effectVolume = 0.5;

        if (App.DeviceUtils.IsWxGame) {
            this.bg = new SoundBgWx();
            this.effect = new SoundEffectWx();
        } else {
            this.bg = new SoundBg();
            this.effect = new SoundEffect();
        }
        this.bg.setVolume(this.bgVolume);
        this.effect.setVolume(this.effectVolume);

        this.setDefaultSwitchState();
    }

    /**
     * 设置背景音乐和音效的默认开关状态
     */
    private setDefaultSwitchState(): void {
        let bgMusicFlag = egret.localStorage.getItem(this.LocalStorageKey_Bg);
        if (!bgMusicFlag) {
            this.bgOn = true;
        } else {
            this.bgOn = bgMusicFlag == "1";
        }

        let effectMusicFlag = egret.localStorage.getItem(this.LocalStorageKey_Effect);
        if (!effectMusicFlag) {
            this.effectOn = true;
        } else {
            this.effectOn = effectMusicFlag == "1";
        }

        Log.info("背景音乐：", this.bgOn);
        Log.info("音效：", this.effectOn);
    }

    /**
     * 播放音效
     * @param effectName
     */
    public playEffect(effectName: string, loops: number = 1): void {
        if (!this.effectOn)
            return;

        this.effect.play(effectName, loops);
    }

    /**
     * 停止音效播放
     * @param effectName
     */
    public stopEffect(effectName: string): void {
        this.effect.stop(effectName);
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public playBg(bgName: string): void {
        this.currBg = bgName;
        if (!this.bgOn)
            return;

        this.bg.play(bgName);
    }

    /**
     * 停止背景音乐
     */
    public stopBg(): void {
        this.bg.stop();
    }

    /**
     * 暂停背景音乐
     */
    public pauseBg(): void {
        if (!this.bgOn)
            return;

        this.bg.pause();
    }

    /**
     * 恢复背景音乐
     */
    public resumeBg(): void {
        if (!this.bgOn)
            return;

        this.bg.resume();
    }

    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public setEffectOn($isOn: boolean): void {
        this.effectOn = $isOn;
        egret.localStorage.setItem(this.LocalStorageKey_Effect, $isOn ? "1" : "0");
    }

    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public setBgOn($isOn: boolean): void {
        this.bgOn = $isOn;
        egret.localStorage.setItem(this.LocalStorageKey_Bg, $isOn ? "1" : "0");

        if (!this.bgOn) {
            this.stopBg();
        } else {
            if (this.currBg) {
                this.playBg(this.currBg);
            }
        }
    }

    /**
     * 设置背景音乐音量
     * @param volume
     */
    public setBgVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.bgVolume = volume;
        this.bg.setVolume(this.bgVolume);
    }

    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public getBgVolume(): number {
        return this.bgVolume;
    }

    /**
     * 设置音效音量
     * @param volume
     */
    public setEffectVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.effectVolume = volume;
        this.effect.setVolume(this.effectVolume);
    }

    /**
     * 获取音效音量
     * @returns {number}
     */
    public getEffectVolume(): number {
        return this.effectVolume;
    }

    /**
     * 背景音乐是否已开启
     * @returns {boolean}
     */
    public get bgIsOn(): boolean {
        return this.bgOn;
    }

    /**
     * 音效是否已开启
     * @returns {boolean}
     */
    public get effectIsOn(): boolean {
        return this.effectOn;
    }
}
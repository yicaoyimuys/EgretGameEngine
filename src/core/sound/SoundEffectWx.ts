/**
 * Created by yangsong on 18-11-21.
 * 音效类(微信小游戏专用)
 */
class SoundEffectWx implements ISoundEffect {
    private _wx: any;
    private _volume: number;
    private _cache: any;

    /**
     * 构造函数
     */
    public constructor() {
        this._wx = window["wx"];
        this._cache = {};
        App.TimerManager.doTimer(1 * 60 * 1000, 0, this.dealSoundTimer, this);
    }

    /**
     * 处理音乐文件的清理
     */
    private dealSoundTimer(): void {
        let currTime: number = egret.getTimer();
        let keys = Object.keys(this._cache);
        for (let i: number = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            if (!this.checkCanClear(key)) {
                continue;
            }
            let audio = this._cache[key];
            if (currTime - audio.useTime >= SoundManager.CLEAR_TIME) {
                // console.log(key + "已clear");
                audio.destroy();
                delete this._cache[key];
            }
        }
    }

    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    private checkCanClear(key: string): boolean {
        return true;
    }

    /**
     * 获取Sound
     * @param effectName
     * @returns {InnerAudioContext}
     */
    private getAudio(effectName: string): any {
        let audio = this._cache[effectName];
        if (!audio) {
            audio = this._wx.createInnerAudioContext();
            audio.src = App.ResourceUtils.getFileRealPath(effectName);
            this._cache[effectName] = audio;
        }
        audio.useTime = egret.getTimer();
        return audio;
    }

    /**
     * 播放一个音效
     * @param effectName
     */
    public play(effectName: string, loops: number): void {
        let audio = this.getAudio(effectName);
        audio.loop = loops == 0 ? true : false;
        audio.volume = this._volume;
        audio.startTime = 0;
        audio.play();
    }

    /**
     * 播放一个音效
     * @param effectName
     */
    public stop(effectName: string): void {
        let audio = this._cache[effectName];
        if (audio) {
            audio.stop();
        }
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
    }
}
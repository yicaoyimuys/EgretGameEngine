/**
 * Created by yangsong on 18-12-26.
 * 音效类(微信小游戏专用)
 */
class SoundBgWx implements ISoundBg {
    private _currBg: string;
    private _volume: number;
    private _audio: any;

    /**
     * 构造函数
     */
    public constructor() {
        this._audio = window["wx"].createInnerAudioContext();
        this._currBg = "";
    }

    /**
     * 停止当前音乐
     */
    public stop(): void {
        this._audio.stop();
        this._currBg = "";
    }

    /**
     * 播放某个音乐
     * @param bgName
     */
    public play(bgName: string): void {
        if (this._currBg == bgName) {
            return;
        }

        this.stop();
        this._currBg = bgName;

        this._audio.src = App.ResourceUtils.getFileRealPath(this._currBg);
        this._audio.loop = true;
        this._audio.volume = this._volume;
        this._audio.startTime = 0;
        this._audio.play();
    }

    /**
     * 暂停
     */
    public pause(): void {
        if (this._currBg.length == 0) {
            return;
        }
        this._audio.pause();
    }

    /**
     * 恢复
     */
    public resume(): void {
        if (this._currBg.length == 0) {
            return;
        }
        this._audio.play();
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
        if (this._audio) {
            this._audio.volume = this._volume;
        }
    }
}
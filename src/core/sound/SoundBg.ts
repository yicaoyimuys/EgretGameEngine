/**
 * Created by yangsong on 15-1-14.
 * 背景音乐类
 */
class SoundBg extends BaseSound implements ISoundBg {
    private _currBg: string;
    private _currSound: egret.Sound;
    private _currSoundChannel: egret.SoundChannel;
    private _volume: number;
    private _pausePosition: number;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._currBg = "";
    }

    /**
     * 停止当前音乐
     */
    public stop(): void {
        if (this._currSoundChannel) {
            this._currSoundChannel.stop();
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
        this._pausePosition = null;
    }

    /**
     * 播放某个音乐
     * @param effectName
     */
    public play(effectName: string): void {
        if (this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
        var sound: egret.Sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    }

    /**
     * 暂停
     */
    public pause(): void {
        if (!this._currSoundChannel) {
            return;
        }
        this._pausePosition = this._currSoundChannel.position
        this._currSoundChannel.stop();
    }

    /**
     * 恢复
     */
    public resume(): void {
        if (!this._currSoundChannel) {
            return;
        }
        if (!this._pausePosition) {
            return;
        }
        this._currSound.play(this._pausePosition);
        this._pausePosition = null;
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound: egret.Sound): void {
        this._currSound = sound;
        this._currSoundChannel = this._currSound.play();
        this._currSoundChannel.volume = this._volume;
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    }

    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: string): void {
        if (this._currBg == key) {
            this.playSound(RES.getRes(key));
        }
    }

    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key: string): boolean {
        return this._currBg != key;
    }
}
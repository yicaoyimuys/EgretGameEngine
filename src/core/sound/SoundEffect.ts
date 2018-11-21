/**
 * Created by yangsong on 15-1-14.
 * 音效类
 */
class SoundEffect extends BaseSound implements ISoundEffect {
    private _volume: number;
    private _soundLoops: any = {};
    private _soundChannels: any = {};

    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 播放一个音效
     * @param effectName
     */
    public play(effectName: string, loops: number): void {
        var sound: egret.Sound = this.getSound(effectName);
        if (sound) {
            this.playSound(effectName, sound, loops);
        } else {
            this._soundLoops[effectName] = loops;
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(effectName: string, sound: egret.Sound, loops: number): void {
        var channel: egret.SoundChannel = sound.play(0, loops);
        channel.volume = this._volume;
        channel["name"] = effectName;
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);

        this._soundChannels[channel["name"]] = channel;
    }

    /**
     * 播放完成
     */
    private onPlayComplete(e: egret.Event): void {
        var channel: egret.SoundChannel = e.currentTarget;
        this.destroyChannel(channel);
    }

    /**
     * 销毁channel
     */
    private destroyChannel(channel: egret.SoundChannel): void {
        channel.stop();
        channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
        delete this._soundChannels[channel["name"]];
    }

    /**
     * 播放一个音效
     * @param effectName
     */
    public stop(effectName: string): void {
        var channel: egret.SoundChannel = this._soundChannels[effectName];
        if (channel) {
            this.destroyChannel(channel);
        }
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
    }


    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: string): void {
        this.playSound(key, RES.getRes(key), this._soundLoops[key]);
        delete this._soundLoops[key];
    }
}
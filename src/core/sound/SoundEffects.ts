/**
* Created by yangsong on 15-1-14.
* 音效类
*/
class SoundEffects extends BaseSound{
    private _volume:number;
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
    public play(effectName:string, volume:number = 0.5):void{
        this._volume = volume;
        var sound:egret.Sound = this.getSound(effectName);
        if(sound){
            this.playSound(sound);
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound:egret.Sound):void{
        sound.setVolume(this._volume);
        sound.play();
    }


    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key:string):void{
        this.playSound(RES.getRes(key));
    }
}
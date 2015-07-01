/**
* Created by yangsong on 15-1-14.
* 背景音乐类
*/
class SoundBg extends BaseSound{
    private _currBg:string;
    private _currSound:egret.Sound;
    private _volume:number;

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
    public stop():void{
        if(this._currSound){
            this._currSound.pause();
        }
        this._currSound = null;
        this._currBg = "";
    }

    /**
     * 播放某个音乐
     * @param effectName
     */
    public play(effectName:string, volume:number):void{
        this._volume = volume;
        if(this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
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
        this._currSound = sound;
        this._currSound.volume = this._volume;
        this._currSound.play(true);
    }

    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key:string):void{
        if(this._currBg == key){
            this.playSound(RES.getRes(key));
        }
    }

    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key:string):boolean{
        return this._currBg != key;
    }
}
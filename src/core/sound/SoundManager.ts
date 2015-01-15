/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
class SoundManager extends BaseClass{
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    public static CLEAR_TIME:number = 3 * 60 * 1000;

    private effect:SoundEffects;
    private bg:SoundBg;
    private effectOn:boolean;
    private bgOn:boolean;
    private currBg:string;

    /**
     * 构造函数
     */
    public constructor(){
        super();
        this.bg = new SoundBg();
        this.effect = new SoundEffects();
        this.bgOn = true;
        this.effectOn = true;
    }

    /**
     * 播放音效
     * @param effectName
     */
    public playEffect(effectName:string):void{
        if(!this.effectOn)
            return;

        this.effect.play(effectName);
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public playBg(bgName:string):void{
        this.currBg = bgName;
        if(!this.bgOn)
            return;

        this.bg.play(bgName);
    }

    /**
     * 停止背景音乐
     */
    public stopBg():void{
        this.bg.stop();
    }

    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public setEffectOn($isOn:boolean):void{
        this.effectOn = $isOn;
    }

    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public setBgOn($isOn:boolean):void{
        this.bgOn = $isOn;
        if(!this.bgOn){
            this.stopBg();
        }else{
            this.playBg(this.currBg);
        }
    }
}
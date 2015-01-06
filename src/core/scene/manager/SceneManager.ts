/**
 * Created by yangsong on 2014/11/28.
 * 场景管理类
 */
class SceneManager extends BaseClass{
    private _scenes:any;
    private _stage:egret.Stage;
    private _currScene:number;

    /**
     * 构造函数
     */
    public constructor(){
        super();
        this._scenes = {};
    }

    /**
     * 初始化
     * @param stage
     */
    public init(stage:egret.Stage):void{
        this._stage = stage;
    }

    /**
     * 注册Scene
     * @param key Scene唯一标识
     * @param scene Scene对象
     */
    public add(key:number, scene:BaseScene):void{
        this._scenes[key] = scene;
    }

    /**
     * 切换场景
     * @param key 场景唯一标识
     */
    public changeScene(key:number):void{
        var nowScene:BaseScene = this._scenes[key];
        if(nowScene == null){
            Log.trace("场景"+key+"不存在");
            return;
        }

        var oldScene:BaseScene = this._scenes[this._currScene];
        if(oldScene){
            this._stage.removeChild(oldScene);
            oldScene.onExit();
        }

        this._stage.addChild(nowScene);
        nowScene.onEnter();
        this._currScene = key;
    }
}

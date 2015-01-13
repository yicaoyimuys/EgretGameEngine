/**
 * Created by yangsong on 2014/11/28.
 * 场景管理类
 */
class SceneManager extends BaseClass{
    private _scenes:any;
    private _currScene:number;
    private _scenesStack:Array<number>;

    /**
     * 构造函数
     */
    public constructor(){
        super();
        this._scenes = {};
        this._scenesStack = new Array<number>();
    }

    /**
     * 注册Scene
     * @param key Scene唯一标识
     * @param scene Scene对象
     */
    public register(key:number, scene:BaseScene):void{
        this._scenes[key] = scene;
    }

    /**
     * 切换场景
     * @param key 场景唯一标识
     */
    public runScene(key:number):void{
        var nowScene:BaseScene = this._scenes[key];
        if(nowScene == null){
            Log.trace("场景"+key+"不存在");
            return;
        }

        while(this._scenesStack.length){
            var stackScene:BaseScene = this._scenes[this._scenesStack.pop()];
            stackScene.onExit();
        }

        var oldScene:BaseScene = this._scenes[this._currScene];
        if(oldScene){
            oldScene.onExit();
        }

        nowScene.onEnter();
        this._currScene = key;

        //让Fps永远显示在最上层
        App.DebugUtils.openFps();
    }

    /**
     * 压入一个Scene
     * @param key
     */
    public pushScene(key:number):void{
        var nowScene:BaseScene = this._scenes[key];
        if(nowScene == null){
            Log.trace("场景"+key+"不存在");
            return;
        }

        nowScene.onEnter();
        this._scenesStack.push(key);

        //让Fps永远显示在最上层
        App.DebugUtils.openFps();
    }

    /**
     * 回到上一个scene
     */
    public popScene():void{
        if(this._scenesStack.length == 0){
            return;
        }

        var key:number = this._scenesStack.pop();
        var nowScene:BaseScene = this._scenes[key];
        nowScene.onExit();
    }
}

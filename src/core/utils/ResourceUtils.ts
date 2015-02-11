/**
 * Created by yangsong on 15-2-11.
 * 多个resource.json文件加载类
 */
class ResourceUtils extends BaseClass{
    private _resources:Array<any>;
    private _onConfigComplete:Function;
    private _onConfigCompleteTarget:any;

    /**
     * 构造函数
     */
    public constructor(){
        super();
        this._resources = new Array<any>();
    }

    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    public addResource(jsonPath:string, filePath:string):void{
        this._resources.push([jsonPath, filePath]);
    }

    /**
     * 开始加载配置文件
     * @param $onConfigComplete 加载完成执行函数
     * @param $onConfigCompleteTarget 加载完成执行函数所属对象
     */
    public loadResource($onConfigComplete:Function, $onConfigCompleteTarget:any):void{
        this._onConfigComplete = $onConfigComplete;
        this._onConfigCompleteTarget = $onConfigCompleteTarget;
        this.load();
    }

    /**
     * 加载
     */
    private load():void{
        //加载完成
        if(this._resources.length == 0){
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }

        var arr:any = this._resources.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    }

    /**
     * 加载完成
     * @param event
     */
    private onConfigCompleteHandle(event:RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.load();
    }
}

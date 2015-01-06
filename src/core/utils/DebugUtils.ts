/**
 * Created by yangsong on 2014/11/23.
 * Debug调试工具
 */
class DebugUtils extends BaseClass{
	private _isOpen:boolean;
	private _key:string;
	private _startTime:number = 0;
	
	public constructor(){
        super();
	}
	
	/**
	 * 设置调试是否开启 
	 * @param flag
	 * 
	 */		
	public isOpen(flag:boolean):void{
		this._isOpen = flag;
	}

    /**
     * 是否是调试模式
     * @returns {boolean}
     */
    public get isDebug():boolean{
        return this._isOpen;
    }
	
	/**
	 * 开始 
	 * @param key 标识
	 * @param minTime 最小时间
	 * 
	 */		
	public start(key:string):void{
        if(!this._isOpen){
            return;
        }
		this._key=key;
		this._startTime=egret.getTimer();
	}
	
	/**
	 * 停止 
	 * 
	 */		
	public stop():number{
		if(!this._isOpen){
			return 0;
        }
		var cha:number=egret.getTimer()-this._startTime;
		if(cha > 3){
            Log.trace(this._key + ":" + cha);
        }
		return cha;
	}
	
	/**
	 * 显示Fps
	 */		
	public openFps():void{
        if(!this._isOpen){
            return;
        }
        egret.Profiler.getInstance().run();
	}
}

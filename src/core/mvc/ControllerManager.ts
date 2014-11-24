/**
 * Created by yangsong on 2014/11/22.
 * Controller管理类
 */
class ControllerManager{
	private _modules:any;

    /**
     * 构造函数
     */
	public constructor(){
		this._modules = {};
	}
	
	/**
	 * 动态添加的Manager 
	 * @param key 唯一标识
	 * @param manager Manager
	 * 
	 */		
	public add(key:number, control:BaseController):void{
		if(this.isExists(key))
			return;

		this._modules[key] = control;
	}
	
	/**
	 * 动态移除Manager 
	 * @param key 唯一标识
	 * 
	 */		
	public remove(key:number):void{
		if(!this.isExists(key))
			return;

		this._modules[key] = null;
		delete this._modules[key];
	}
	
	/**
	 * 是否已经存在Manager
	 * @param key 唯一标识
	 * @return Boolean
	 * 
	 */		
	public isExists(key:number):boolean{
		return this._modules[key] != null;
	}
	
	/**
	 * 跨模块消息传递 
	 * @param moduleID
	 * @param key
	 * 
	 */		
	public applyFunc(moduleID:number, key:number, ...param:any[]):void{
		var manager:BaseController = this._modules[moduleID];
		if(manager){
            manager.applyFunc(key, param);
        }else{
            Log.trace("模块"+moduleID+"不存在");
        }
	}
	
}

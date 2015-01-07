class ViewManager extends BaseClass{
	/**
	 * 已注册的UI 
	 */		
	private _views:any;
	/**
	 * 开启中的UI 
	 */		
	private _opens:Array<number>;

    /**
     * 构造函数
     */
    public constructor(){
        super();
        this._views = {};
        this._opens = new Array<number>();
    }
	
	/**
	 * 面板注册 
	 * @param key 面板唯一标识
	 * @param openFunc 开启函数
	 * @param closeFunc 关闭函数
	 * 
	 */		
	public register(key:number, view:IBaseView):void{
		this._views[key] = view;
	}
	
	/**
	 * 开启面板 
	 * @param key 面板唯一标识
	 * @param param 参数
	 * 
	 */		
	public open(key:number, ...param:any[]):void{
		var view:IBaseView = this._views[key];
		if(view == null){
            Log.trace("UI_"+key+"不存在");
            return;
        }
		
		if(this.isOpen(key)){
			return;
        }

        view.addToParent();
        if(!view.isInit()){
            view.initUI();
            view.initData();
        }
        view.open.apply(view, param);

		this._opens.push(key);
	}
	
	/**
	 * 关闭面板 
	 * @param key 面板唯一标识
	 * @param param 参数
	 * 
	 */		
	public close(key:number, ...param:any[]):void{
        var view:IBaseView = this._views[key];
        if(view == null){
            Log.trace("UI_"+key+"不存在");
            return;
        }
		
		if(!this.isOpen(key)){
			return;
        }

        view.removeFromParent();
        view.close.apply(view, param);

		this._opens.splice(this._opens.indexOf(key), 1);
	}

    /**
     * 关闭面板
     * @param view
     * @param param
     */
    public closeView(view:IBaseView, ...param:any[]):void{
        var key:number = this.getViewKey(view);
        var params = [];
        params[0] = key;
        for (var i = 1; i < arguments.length; i++) {
            params[i] = arguments[i];
        }
        this.close.apply(this, params);
    }
	
	/**
	 * 开启或关闭面板 
	 * @param key 面板唯一标识
	 * @param param 参数
	 * 
	 */		
	public openOrClose(key:number, ...param:any[]):void{
		if(this.isOpen(key)){
			this.close(key, param);
        }else{
			this.open(key, param);
        }
	}
	
	/**
	 * 面板是否开启中 
	 * @param key 面板唯一标识
	 * @return Boolean
	 * 
	 */		
	public isOpen(key:number):boolean{
		return this._opens.indexOf(key) >= 0;
	}

    /**
     * 获取一个View对应的Key值
     * @param view
     * @returns {*}
     */
    public getViewKey(view:IBaseView):number{
        for(var k in this._views){
            if(this._views[k] == view){
                return parseInt(k);
            }
        }
        return 0;
    }
}
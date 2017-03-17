class ViewManager extends BaseClass {
    /**
     * 已注册的UI
     */
    private _views:any;

    /**
     * 开启中UI
     */
    private _opens:Array<number>;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._views = {};
        this._opens = [];
    }

    /**
     * 清空处理
     */
    public clear():void {
        this.closeAll();
        this._views = {};
    }

    /**
     * 面板注册
     * @param key 面板唯一标识
     * @param view 面板
     */
    public register(key:number, view:IBaseView):void {
        if (view == null) {
            return;
        }
        if (this._views[key]) {
            return;
        }
        this._views[key] = view;
    }

    /**
     * 面板解除注册
     * @param key
     */
    public unregister(key:number):void {
        if (!this._views[key]) {
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    }

    /**
     * 销毁一个面板
     * @param key 唯一标识
     * @param newView 新面板
     */
    public destroy(key:number, newView:IBaseView = null):void {
        var oldView:IBaseView = this.getView(key);
        if (oldView) {
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        this.register(key, newView);
    }

    /**
     * 开启面板
     * @param key 面板唯一标识
     * @param param 参数
     *
     */
    public open(key:number, ...param:any[]):IBaseView {
        var view:IBaseView = this.getView(key);
        if (view == null) {
            Log.trace("UI_" + key + "不存在");
            return;
        }

        if (view.isShow()) {
            view.open.apply(view, param);
            return view;
        }

        if (view.isInit()) {
            view.addToParent();
            view.open.apply(view, param);
        }
        else {
            App.EasyLoading.showLoading();
            view.loadResource(function () {
                view.setVisible(false);
                view.addToParent();
            }.bind(this), function () {
                view.initUI();
                view.initData();
                view.open.apply(view, param);
                view.setVisible(true);
                App.EasyLoading.hideLoading();
            }.bind(this));
        }

        this._opens.push(key);
        return view;
    }

    /**
     * 关闭面板
     * @param key 面板唯一标识
     * @param param 参数
     *
     */
    public close(key:number, ...param:any[]):void {
        if (!this.isShow(key)) {
            return;
        }

        var view:IBaseView = this.getView(key);
        if (view == null) {
            return;
        }

        var viewIndex = this._opens.indexOf(key);
        if (key >= 0) {
            this._opens.splice(viewIndex, 1);
        }

        view.removeFromParent();
        view.close.apply(view, param);
    }

    /**
     * 关闭面板
     * @param view
     * @param param
     */
    public closeView(view:IBaseView, ...param:any[]):void {
        var keys = Object.keys(this._views);
        for (var i:number = 0, len = keys.length; i < len; i++) {
            var key:number = parseInt(keys[i]);
            if (this._views[key] == view) {
                this.close(key, param);
                return;
            }
        }
    }

    /**
     * 根据唯一标识获取一个UI对象
     * @param key
     * @returns {any}
     */
    public getView(key:number):IBaseView {
        return this._views[key];
    }

    /**
     * 关闭所有开启中的UI
     */
    public closeAll():void {
        while (this._opens.length) {
            this.close(this._opens[0]);
        }
    }

    /**
     * 当前ui打开数量
     * @returns {number}
     */
    public currOpenNum():number {
        return this._opens.length;
    }

    /**
     * 检测一个UI是否开启中
     * @param key
     * @returns {boolean}
     */
    public isShow(key:number):boolean {
        return this._opens.indexOf(key) != -1;
    }
}

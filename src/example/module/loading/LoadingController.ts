/**
 * Created by yangsong on 15-1-6.
 */
class LoadingController extends BaseController{

    private loadingView:LoadingView;

    public constructor(){
        super();

        //初始化UI
        this.loadingView = new LoadingView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Loading, this.loadingView);

        //注册事件监听
        this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
    }

    private setProgress(current:number, total:number):void{
        this.loadingView.setProgress(current, total);
    }
}

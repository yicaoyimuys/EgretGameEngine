/**
 * Created by yangsong on 15-1-6.
 */
class HomeController extends BaseController{

    private proxy:HomeProxy;
    private homeView:HomeView;

    public constructor(){
        super();

        this.proxy = new HomeProxy(this);

        this.homeView = new HomeView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Home, this.homeView);
    }
}

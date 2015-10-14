/**
 * Created by egret on 15-1-7.
 */
class ShopController extends BaseController {

    private shopView:ShopView;
    public constructor() {
        super();

        this.shopView = new ShopView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Shop, this.shopView);
    }
}
/**
 * Created by egret on 15-1-7.
 */
class FactoryController extends BaseController {
    private factoryView:FactoryView;
    public constructor() {
        super();

        this.factoryView = new FactoryView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Factory, this.factoryView);
    }
}
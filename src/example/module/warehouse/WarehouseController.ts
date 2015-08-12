/**
 * Created by egret on 15-1-7.
 */
class WarehouseController extends BaseController {
    private warehouseView:WarehouseView;
    public constructor() {
        super();
        this.warehouseView = new WarehouseView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Warehouse, this.warehouseView);
    }
}
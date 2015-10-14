/**
 * Created by egret on 15-1-7.
 */
class FriendController extends BaseController {
    private friendView:FriendView;

    public constructor() {
        super();

        this.friendView = new FriendView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Friend, this.friendView);
    }
}
/**
 * Created by egret on 15-1-7.
 */
class MailController extends BaseController {

    private mailView:MailView;
    public constructor() {
        super();

        this.mailView = new MailView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Mail, this.mailView);
    }
}
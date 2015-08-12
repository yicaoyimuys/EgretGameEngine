/**
 * Created by egret on 15-1-7.
 */
class LoadingView extends BaseGuiView{
    public constructor($controller:BaseController, $parent:egret.gui.Group) {
        super($controller, $parent);

        this.skinName = "skins.LoadingUISkin";
    }

    public txtMsg:egret.gui.Label;

    public setProgress(current:number, total:number):void {
        this.txtMsg.text = "资源加载中..." + current + "/" + total;
    }
}
/**
 * Created by egret on 15-1-7.
 */
class BasePanelView extends BaseGuiView {

    public constructor(controller:BaseController, parent:egret.gui.Group) {
        super(controller, parent);

        this.skinName = "skins.PanelSkin";
    }

    private _icon:string;
    public set icon(value:string){
        this._icon = value;
        if(this.iconDisplay){
            this.iconDisplay.source = this._icon;
        }
    }

    public get icon():string{
        return this._icon;
    }

    private _btn:string;
    public set btn(value:string){
        this._btn = value;
        if(this.button){
            this.button.source = this._btn;
        }
    }

    public get btn():string{
        return this._btn;
    }


    public closeBtn:egret.gui.Button;
    public iconDisplay:egret.gui.UIAsset;
    public button:egret.gui.UIAsset;
    public partAdded(partName: string, instance: any): void{
        super.partAdded(partName,instance);
        if(instance == this.closeBtn){
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.closeBtnClickHandler,this)
        }
        if(instance == this.iconDisplay){
            this.iconDisplay.source = this._icon;
        }
        if(instance == this.button){
            this.button.source = this._btn;
        }
    }

    private closeBtnClickHandler(e:egret.TouchEvent):void{
        App.ViewManager.closeView(this);
    }
}
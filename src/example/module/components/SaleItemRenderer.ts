/**
 * 商品的渲染器
 */
class SaleItemRenderer extends eui.ItemRenderer {
    public titleDisplay:eui.Label;
    public priceDisplay:eui.Label;
    public timeDisplay:eui.Label;
    public iconDisplay:eui.Image;

    public constructor() {
        super();
    }


    public dataChanged() {
        super.dataChanged();
        if (this.titleDisplay) {
            this.titleDisplay.text = this.data.title;
        }
        if (this.priceDisplay) {
            this.priceDisplay.text = this.data.price;
        }
        if (this.timeDisplay) {
            this.timeDisplay.text = this.data.time;
        }
        if (this.iconDisplay) {
            this.iconDisplay.source = this.data.icon;
        }
    }

    public partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
        if (!this.data)
            return;
        if (instance == this.titleDisplay) {
            this.titleDisplay.text = this.data.title;
        }
        if (instance == this.priceDisplay) {
            this.priceDisplay.text = this.data.price;
        }
        if (instance == this.timeDisplay) {
            this.timeDisplay.text = this.data.time;
        }
        if (instance == this.iconDisplay) {
            this.iconDisplay.source = this.data.icon;
        }
    }
}
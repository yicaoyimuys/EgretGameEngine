/**
 * 商品的渲染器
 */
class SaleItemRenderer extends egret.gui.ItemRenderer {
    public constructor() {
        super();
    }


    public dataChanged()
    {
        super.dataChanged();
        if(this.titleDisplay)
        {
            this.titleDisplay.text = this.data.title;
        }
        if(this.priceDisplay)
        {
            this.priceDisplay.text = this.data.price;
        }
        if(this.timeDisplay)
        {
            this.timeDisplay.text = this.data.time;
        }
        if(this.iconDisplay)
        {
            this.iconDisplay.source = this.data.icon;
        }
    }

    public titleDisplay:egret.gui.Label;
    public priceDisplay:egret.gui.Label;
    public timeDisplay:egret.gui.Label;
    public iconDisplay:egret.gui.UIAsset;

    public partAdded(partName: string, instance: any): void
    {
        super.partAdded(partName,instance);
        if(!this.data) return;
        if(instance == this.titleDisplay)
        {
            this.titleDisplay.text = this.data.title;
        }
        if(instance == this.priceDisplay)
        {
            this.priceDisplay.text = this.data.price;
        }
        if(instance == this.timeDisplay)
        {
            this.timeDisplay.text = this.data.time;
        }
        if(instance == this.iconDisplay)
        {
            this.iconDisplay.source = this.data.icon;
        }
    }
}
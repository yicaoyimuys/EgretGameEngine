/**
 * 任务的渲染器
 */
class TaskItemRenderer extends eui.ItemRenderer {
    public iconDisplay:eui.Image;
    public goldDisplay:eui.Label;
    public seedDisplay:eui.Label;
    public progressDisplay:eui.Label;
    public labelDisplay:eui.Label;

    public constructor() {
        super();
    }

    public dataChanged() {
        super.dataChanged();
        if (this.iconDisplay) {
            this.iconDisplay.source = this.data.icon;
        }
        if (this.goldDisplay) {
            this.goldDisplay.text = this.data.gold;
        }
        if (this.seedDisplay) {
            this.seedDisplay.text = this.data.seed;
        }
        if (this.progressDisplay) {
            this.progressDisplay.text = this.data.progress;
        }
        if (this.labelDisplay) {
            this.labelDisplay.text = this.data.label;
        }
    }

    public partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
        if (!this.data)
            return;

        if (instance == this.iconDisplay) {
            this.iconDisplay.source = this.data.icon;
        }
        if (instance == this.goldDisplay) {
            this.goldDisplay.text = this.data.gold;
        }
        if (instance == this.seedDisplay) {
            this.seedDisplay.text = this.data.seed;
        }
        if (instance == this.progressDisplay) {
            this.progressDisplay.text = this.data.progress;
        }
        if (instance == this.labelDisplay) {
            this.labelDisplay.text = this.data.label;
        }
    }
}
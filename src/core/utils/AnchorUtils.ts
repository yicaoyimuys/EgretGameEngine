/**
 * Created by Saco on 2015/9/16.
 */
class AnchorUtils extends SingtonClass {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.injectAnchor();
    }

    public setAnchorX(target: egret.DisplayObject, value: number): void {
        target["anchorX"] = value;
    }

    public setAnchorY(target: egret.DisplayObject, value: number): void {
        target["anchorY"] = value;
    }

    public setAnchor(target: egret.DisplayObject, value: number): void {
        target["anchorX"] = target["anchorY"] = value;
    }

    public getAnchor(target: egret.DisplayObject): number {
        if (target["anchorX"] != target["anchorY"]) {
            console.log("target's anchorX != anchorY");
        }
        return target["anchorX"] || 0;
    }

    public getAnchorY(target: egret.DisplayObject): number {
        return target["anchorY"] || 0;
    }

    public getAnchorX(target: egret.DisplayObject): number {
        return target["anchorX"] || 0;
    }

    private injectAnchor(): void {
        let self = this;
        Object.defineProperty(egret.DisplayObject.prototype, "width", {
            get: function () {
                return this.$getWidth();
            },
            set: function (value) {
                this.$setWidth(value);
                this._propertyChange = true;
                egret.callLater(() => {
                    self.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(egret.DisplayObject.prototype, "height", {
            get: function () {
                return this.$getHeight();
            },
            set: function (value) {
                this.$setHeight(value);
                this._propertyChange = true;
                egret.callLater(() => {
                    self.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(egret.DisplayObject.prototype, "anchorX", {
            get: function () {
                return this._anchorX;
            },
            set: function (value) {
                this._anchorX = value;
                this._propertyChange = true;
                this._anchorChange = true;
                egret.callLater(() => {
                    self.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(egret.DisplayObject.prototype, "anchorY", {
            get: function () {
                return this._anchorY;
            },
            set: function (value) {
                this._anchorY = value;
                this._propertyChange = true;
                this._anchorChange = true;
                egret.callLater(() => {
                    self.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });
    }

    private changeAnchor(tar: any): void {
        if (tar._propertyChange && tar._anchorChange) {
            if (tar._anchorX != undefined) {
                tar.anchorOffsetX = tar._anchorX * tar.width;
            }
            if (tar._anchorY != undefined) {
                tar.anchorOffsetY = tar._anchorY * tar.height;
            }
            delete tar._propertyChange;
        }
    }
}

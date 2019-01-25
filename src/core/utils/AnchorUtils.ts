/**
 * Created by Saco on 2015/9/16.
 */
class AnchorUtils extends SingtonClass {
    private _propertyChange: any;
    private _anchorChange: any;

    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._propertyChange = Object.create(null);
        this._anchorChange = Object.create(null);
        this.injectAnchor();
    }

    public clear(target: egret.DisplayObject): void {
        delete this._propertyChange[target.hashCode];
        delete this._anchorChange[target.hashCode];
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
                self._propertyChange[this.hashCode] = true;
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
                self._propertyChange[this.hashCode] = true;
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
                self._propertyChange[this.hashCode] = true;
                self._anchorChange[this.hashCode] = true;
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
                self._propertyChange[this.hashCode] = true;
                self._anchorChange[this.hashCode] = true;
                egret.callLater(() => {
                    self.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });
    }

    private changeAnchor(tar: any): void {
        if (this._propertyChange[tar.hashCode] && this._anchorChange[tar.hashCode]) {
            if (tar._anchorX) {
                tar.anchorOffsetX = tar._anchorX * tar.width;
            }
            if (tar._anchorY) {
                tar.anchorOffsetY = tar._anchorY * tar.height;
            }
            delete this._propertyChange[tar.hashCode];
        }
    }
}

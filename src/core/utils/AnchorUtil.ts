/**
 * Created by Saco on 2015/9/16.
 */
class AnchorUtil {
    private static _propertyChange: any;
    private static _anchorChange: any;

    public static init(): void {
        AnchorUtil._propertyChange = Object.create(null);
        AnchorUtil._anchorChange = Object.create(null);
        AnchorUtil.injectAnchor();
    }

    public static setAnchorX(target: egret.DisplayObject, value: number): void {
        target["anchorX"] = value;
    }

    public static setAnchorY(target: egret.DisplayObject, value: number): void {
        target["anchorY"] = value;
    }

    public static setAnchor(target: egret.DisplayObject, value: number): void {
        target["anchorX"] = target["anchorY"] = value;
    }

    public static getAnchor(target: egret.DisplayObject): number {
        if (target["anchorX"] != target["anchorY"]) {
            console.log("target's anchorX != anchorY");
        }
        return target["anchorX"] || 0;
    }

    public static getAnchorY(target: egret.DisplayObject): number {
        return target["anchorY"] || 0;
    }

    public static getAnchorX(target: egret.DisplayObject): number {
        return target["anchorX"] || 0;
    }

    private static injectAnchor(): void {
        Object.defineProperty(egret.DisplayObject.prototype, "width", {
            get: function () {
                return this.$getWidth();
            },
            set: function (value) {
                this.$setWidth(value);
                AnchorUtil._propertyChange[this.hashCode] = true;
                egret.callLater(() => {
                    AnchorUtil.changeAnchor(this);
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
                AnchorUtil._propertyChange[this.hashCode] = true;
                egret.callLater(() => {
                    AnchorUtil.changeAnchor(this);
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
                AnchorUtil._propertyChange[this.hashCode] = true;
                AnchorUtil._anchorChange[this.hashCode] = true;
                egret.callLater(() => {
                    AnchorUtil.changeAnchor(this);
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
                AnchorUtil._propertyChange[this.hashCode] = true;
                AnchorUtil._anchorChange[this.hashCode] = true;
                egret.callLater(() => {
                    AnchorUtil.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });
    }

    private static changeAnchor(tar: any): void {
        if (AnchorUtil._propertyChange[tar.hashCode] && AnchorUtil._anchorChange[tar.hashCode]) {
            if (tar._anchorX) {
                tar.anchorOffsetX = tar._anchorX * tar.width;
            }
            if (tar._anchorY) {
                tar.anchorOffsetY = tar._anchorY * tar.height;
            }
            delete AnchorUtil._propertyChange[tar.hashCode];
        }
    }
}

/**
 * Created by yangsong on 15-1-26.
 * 键盘工具类
 */
class KeyboardUtils extends BaseClass {
    private key_ups:Array<any>;
    private key_downs:Array<any>;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.key_ups = new Array<any>();
        this.key_downs = new Array<any>();

        if (App.DeviceUtils.IsHtml5) {
            var self:any = this;
            document.addEventListener("keyup", function (e):void {
                for (var i:number = 0, len = self.key_ups.length; i < len; i++) {
                    var func:Function = self.key_ups[i][0];
                    var target:any = self.key_ups[i][1];
                    if (target) {
                        func.call(target, e["keyCode"]);
                    } else {
                        func(e["keyCode"]);
                    }
                }
            });

            document.addEventListener("keydown", function (e):void {
                for (var i:number = 0, len = self.key_downs.length; i < len; i++) {
                    var func:Function = self.key_downs[i][0];
                    var target:any = self.key_downs[i][1];
                    if (target) {
                        func.call(target, e["keyCode"]);
                    } else {
                        func(e["keyCode"]);
                    }
                }
            });
        }
    }

    /**
     * 添加KeyUp事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    public addKeyUp(callback:Function, target:any):void {
        this.key_ups.push([callback, target]);
    }

    /**
     * 添加KeyDown事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    public addKeyDown(callback:Function, target:any):void {
        this.key_downs.push([callback, target]);
    }

    /**
     * 移除KeyUp事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    public removeKeyUp(callback:Function, target:any):void {
        for (var i = 0; i < this.key_ups.length; i++) {
            if (this.key_ups[i][0] == callback && this.key_ups[i][1] == target) {
                this.key_ups.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 移除KeyDown事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    public removeKeyDown(callback:Function, target:any):void {
        for (var i = 0; i < this.key_downs.length; i++) {
            if (this.key_downs[i][0] == callback && this.key_downs[i][1] == target) {
                this.key_downs.splice(i, 1);
                i--;
            }
        }
    }
}
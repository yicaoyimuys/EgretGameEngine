/**
 * cacheAsBitmap的替代方案，解决QQ浏览器在1G内存的机器上最多能使用20个Canvas的限制
 */
class RenderTextureManager extends BaseClass {
    private _pool:Array<egret.RenderTexture>;
    private _maxNum:number;
    private _useNum:number;

    /**
     * 构造函数
     */
    public constructor() {
        super();

        this._pool = [];
        this._useNum = 0;

        if (this.isLowerQQBrowser()) {
            this._maxNum = 18;
        } else {
            this._maxNum = -1;
        }
    }

    /**
     * 是否是低端手机的QQ浏览器
     * @returns {boolean}
     */
    private isLowerQQBrowser():boolean {
        if (App.DeviceUtils.IsQQBrowser) {
            //判定机型，因为拿不到内存信息，现在只能根据机型进行判定
            var arr:Array<string> = [
                "2013022",
                "Lenovo A630t",
                "SM-G3818",
                "vivo X3t",
                "GT-I9100"
            ];

            var lower:boolean = false;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (navigator.userAgent.indexOf(arr[i]) != -1) {
                    lower = true;
                    break;
                }
            }
            return lower;
        }
        return false;
    }

    /**
     * 获取一个egret.RenderTexture
     * @returns {egret.RenderTexture}
     */
    public pop():egret.RenderTexture {
        var result = this._pool.pop();
        if (!result) {
            if (this._maxNum == -1 || this._useNum < this._maxNum) {
                result = new egret.RenderTexture();
                this._useNum++;
            }
        }
        return result;
    }

    /**
     * 回收一个egret.RenderTexture
     * @param texture
     */
    public push(texture:egret.RenderTexture):void {
        var exists:boolean = false;
        for (var i = 0, len = this._pool.length; i < len; i++) {
            if (this._pool[i] == texture) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            this._pool.push(texture);
        }
    }
}
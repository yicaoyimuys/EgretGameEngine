/**
 * Created by yangsong on 15-1-20.
 */
class DeviceUtils extends SingtonClass {

    public static OS_IOS: string = "ios";
    public static OS_Android: string = "android";

    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 当前是否Html5版本
     * @returns {boolean}
     * @constructor
     */
    public get IsHtml5(): boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
    }

    /**
     * 当前是否是Native版本
     * @returns {boolean}
     * @constructor
     */
    public get IsNative(): boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
    }

    /**
     * 当前是否是微信小游戏平台
     */
    public get IsWxGame(): boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
    }

    /**
     * 是否是在手机上
     * @returns {boolean}
     * @constructor
     */
    public get IsMobile(): boolean {
        return egret.Capabilities.isMobile;
    }

    /**
     * 是否是在PC上
     * @returns {boolean}
     * @constructor
     */
    public get IsPC(): boolean {
        return !egret.Capabilities.isMobile;
    }

    /**
     * 是否是QQ浏览器
     * @returns {boolean}
     * @constructor
     */
    public get IsQQBrowser(): boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
    }

    /**
     * 是否是IE浏览器
     * @returns {boolean}
     * @constructor
     */
    public get IsIEBrowser(): boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
    }

    /**
     * 是否是Firefox浏览器
     * @returns {boolean}
     * @constructor
     */
    public get IsFirefoxBrowser(): boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
    }

    /**
     * 是否是Chrome浏览器
     * @returns {boolean}
     * @constructor
     */
    public get IsChromeBrowser(): boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
    }

    /**
     * 是否是Safari浏览器
     * @returns {boolean}
     * @constructor
     */
    public get IsSafariBrowser(): boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
    }

    /**
     * 是否是Opera浏览器
     * @returns {boolean}
     * @constructor
     */
    public get IsOperaBrowser(): boolean {
        return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
    }

    /**
     * 得到设备系统 如：iOS/Android/WP7
     */
    public get DeviceOs(): string {
        var os: string = "";
        var ua: string;
        ua = this.IsHtml5 ? navigator.userAgent.toLowerCase() : egret.Capabilities.os.toLowerCase();
        if (ua.indexOf("ipod") != -1 || ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("macintosh") != -1 || ua.indexOf("ios") != -1) {
            os = "ios";
        } else if (ua.indexOf("windows") != -1) {// ua.indexOf("Windows NT") != -1 || ua.indexOf("Windows Phone") != -1
            os = "windows";
        } else if (ua.indexOf("android") != -1) {
            os = "android";
        } else if (ua.indexOf("symbian") != -1) {
            os = "symbian";
        }
        else if (ua.indexOf("linux") != -1) {
            os = "linux";
        }
        return os;
    }
}
/**
 * Created by yangsong on 15-1-20.
 */
class DeviceUtils extends BaseClass{
    /**
     * 构造函数
     */
    public constructor(){
        super();
    }

    /**
     * 当前是否Html5版本
     * @returns {boolean}
     * @constructor
     */
    public get IsHtml5():boolean{
        return egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5;
    }

    /**
     * 当前是否是Native版本
     * @returns {boolean}
     * @constructor
     */
    public get IsNative():boolean{
        return egret.MainContext.runtimeType == egret.MainContext.RUNTIME_NATIVE;
    }

    /**
     * 是否是在手机上
     * @returns {boolean}
     * @constructor
     */
    public get IsMobile():boolean{
        return egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE;
    }
}
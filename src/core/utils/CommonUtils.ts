/**
 * Created by yangsong on 15-1-12.
 * 通用工具类
 */
class CommonUtils extends BaseClass{
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
}
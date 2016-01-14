/**
 * Created by yangsong on 15-4-21.
 * 单一资源通过版本号加载管理类
 */
class ResVersionManager extends BaseClass {
    private static resVersionData:any;
    private complateFunc:Function;
    private complateFuncTarget:any;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.res_loadByVersion();
    }

    /**
     * Res加载使用版本号的形式
     */
    private res_loadByVersion():void {
        RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
            var version:string = "";
            var resVersion:any = ResVersionManager.resVersionData;
            var urlTemp:string = url.substring(9);
            if (resVersion && resVersion[urlTemp]) {
                version = resVersion[urlTemp];
            }

            if (version.length == 0) {
                version = Math.random() + "";
            }

            if (url.indexOf("?") == -1) {
                url += "?v=" + version;
            } else {
                url += "&v=" + version;
            }
            return url;
        }
    }

    /**
     * 加载资源版本号配置文件
     * @param url 配置文件路径
     * @param complateFunc 加载完成执行函数
     * @param complateFuncTarget 加载完成执行函数所属对象
     */
    public loadConfig(url:string, complateFunc:Function, complateFuncTarget:any):void {
        this.complateFunc = complateFunc;
        this.complateFuncTarget = complateFuncTarget;
        RES.getResByUrl(url, this.loadResVersionComplate, this);
    }

    /**
     * 配置文件加载完成
     * @param data
     */
    private loadResVersionComplate(data:any):void {
        ResVersionManager.resVersionData = data;
        this.complateFunc.call(this.complateFuncTarget);
    }

}

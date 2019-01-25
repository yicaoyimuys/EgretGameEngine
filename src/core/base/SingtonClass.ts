/**
 * Created by yangsong on 14/12/18.
 * 基类
 */
class SingtonClass {
    public constructor() {

    }

    /**
     * 获取一个单例
     * @returns {any}
     */
    public static getSingtonInstance(...param: any[]): any {
        let Class: any = this;
        if (!Class._instance) {
            Class._instance = new Class(...param);
        }
        return Class._instance;
    }
}
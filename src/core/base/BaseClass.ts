/**
 * Created by yangsong on 14/12/18.
 * 基类
 */
class BaseClass{
    public constructor(){

    }

    /**
     * 获取一个单例
     * @returns {any}
     */
    public static getInstance(...args:any[]):any{
        var Class:any = this;
        if(!Class._instance){
            Class._instance = new Class(arguments);
        }
        return Class._instance;
    }
}
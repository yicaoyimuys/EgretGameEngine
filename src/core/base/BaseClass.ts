/**
 * Created by yangsong on 14/12/18.
 * 基类
 */
class BaseClass{
    public constructor(){

    }

    public static getInstance():any{
        var Class:any = this;
        if(!Class._instance){
            Class._instance = new Class();
        }
        return Class._instance;
    }
}
/**
 * Created by yangsong on 2014/11/25.
 * 服务端消息解析
 */
class Msg{
    /**
     * 构造函数
     */
    public constructor(){

    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg:any):any{
        return JSON.parse(msg);
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg:any):string{
        return JSON.stringify(msg);
    }
}

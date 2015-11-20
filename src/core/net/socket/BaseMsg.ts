/**
 * Created by yangsong on 2014/11/25.
 * 服务端消息解析
 */
interface BaseMsg {
    /**
     * 接收消息处理
     * @param msg
     */
    receive(socket:egret.WebSocket):void;

    /**
     * 发送消息处理
     * @param msg
     */
    send(socket:egret.WebSocket, msg:any):void;

    /**
     * 消息解析,返回格式{key:XX, body:XX}
     * @param msg
     */
    decode(msg:any):any;

    /**
     * 消息封装
     * @param msg
     */
    encode(msg:any):any;
}

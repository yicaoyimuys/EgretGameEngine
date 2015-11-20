/**
 * Created by yangsong on 2014/11/25.
 * Socket使用常量
 */
class SocketConst {
    /**
     * Socket已经连接上
     * @type {string}
     */
    public static SOCKET_CONNECT:string = "SOCKET_CONNECT";
    /**
     * Socket重新连接上
     * @type {string}
     */
    public static SOCKET_RECONNECT:string = "SOCKET_RECONNECT";
    /**
     * Socket开始重新连接上
     * @type {string}
     */
    public static SOCKET_START_RECONNECT:string = "SOCKET_START_RECONNECT";
    /**
     * Socket已关闭
     * @type {string}
     */
    public static SOCKET_CLOSE:string = "SOCKET_CLOSE";
    /*
     * socket收到消息
     * */
    public static SOCKET_DATA:string = "SOCKET_DATA";
    /**
     * Socket不能连接上
     * @type {string}
     */
    public static SOCKET_NOCONNECT:string = "SOCKET_NOCONNECT";
    /**
     * Socketdebug的消息
     * @type {string}
     */
    public static SOCKET_DEBUG_INFO:string = "SOCKET_DEBUG_INFO";
}

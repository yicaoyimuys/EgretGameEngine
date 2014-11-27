/**
 * Created by yangsong on 2014/11/25.
 * Socket类
 */
class Socket{
    private _needReconnect:boolean = true;
    private _maxReconnectCount = 3;

    private _msg:Msg;
    private _reconnectCount:number;
    private _socket:WebSocket;
    private _host:string;
    private _port:string;

    /**
     * 构造函数
     * @param host IP
     * @param port 端口
     */
    public constructor(host:string, port:string) {
        this._host = host;
        this._port = port;
        this._msg = new Msg();
    }

    /**
     * 开始Socket连接
     */
    public connect():void{
        if (!window["WebSocket"]) {
            egret.Logger.fatal("不支持WebSocket");
            return;
        }
        this._socket = new WebSocket("ws://" + this._host + ":" + this._port);
        this.addListeners();
    }

    private addListeners():void {
        var that:any = this;
        this._socket.onopen = function (evt) {
            if (that._reconnectCount > 0) {
                that._reconnectCount = 0;
                App.MessageCenter.dispatch(SocketConst.SOCKET_RECONNECT);
            } else {
                App.MessageCenter.dispatch(SocketConst.SOCKET_CONNECT);
            }
        };
        this._socket.onclose = function (evt) {
            if (that._needReconnect) {
                that._reconnectCount = 0;
                that.reconnect();
            }else{
                App.MessageCenter.dispatch(SocketConst.SOCKET_CLOSE);
            }
        };
        this._socket.onerror = function(evt){
            App.MessageCenter.dispatch(SocketConst.SOCKET_NOCONNECT);
        };
        this._socket.onmessage = function(evt) {
            var msg:any = this._msg.decode(evt.data);
            App.MessageCenter.dispatch(msg.id, msg);

            this.debugInfo("接收到服务器消息：" + msg.id);
        };
    }

    /**
     * 重新连接
     */
    private reconnect():void {
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) {
            this.connect();
        } else {
            App.MessageCenter.dispatch(SocketConst.SOCKET_CLOSE);
        }
    }

    /**
     * 发送消息到服务器
     * @param msg
     */
    public send(msg:any):void {
        this.debugInfo("客户端发送消息：" + msg.id);

        var sendMsg:string = this._msg.encode(msg);
        this._socket.send(sendMsg);
    }

    /**
     * 关闭Socket连接
     */
    public close():void {
        this._socket.close();
    }

    /**
     * Debug信息
     * @param str
     */
    private debugInfo(str:String):void{
        App.MessageCenter.dispatch(SocketConst.SOCKET_DEBUG_INFO, str);
    }
}
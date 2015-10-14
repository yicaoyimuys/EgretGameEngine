/**
 * Created by yangsong on 2014/11/25.
 * Socket类
 */
class Socket extends BaseClass {
    private _needReconnect:boolean = true;
    private _maxReconnectCount = 10;

    private _reconnectCount:number = 0;
    private _connectFlag:boolean;
    private _host:string;
    private _port:any;
    private _socket:egret.WebSocket;
    private _msg:BaseMsg;

    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 添加事件监听
     */
    private addEvents() {
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }

    /**
     * 移除事件监听
     */
    private removeEvents():void {
        this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }

    /**
     * 服务器连接成功
     */
    private onSocketOpen():void {
        this._reconnectCount = 0;

        if (this._connectFlag) {
            App.MessageCenter.dispatch(SocketConst.SOCKET_RECONNECT);
        } else {
            App.MessageCenter.dispatch(SocketConst.SOCKET_CONNECT);
        }

        this._connectFlag = true;
    }

    /**
     * 服务器断开连接
     */
    private onSocketClose():void {
        if (this._needReconnect) {
            this.reconnect();
            App.MessageCenter.dispatch(SocketConst.SOCKET_START_RECONNECT);
        } else {
            App.MessageCenter.dispatch(SocketConst.SOCKET_CLOSE);
        }
    }

    /**
     * 服务器连接错误
     */
    private onSocketError():void {
        if (this._needReconnect) {
            this.reconnect();
        } else {
            App.MessageCenter.dispatch(SocketConst.SOCKET_NOCONNECT);
        }
    }

    /**
     * 收到服务器消息
     * @param e
     */
    private onReceiveMessage(e:egret.Event):void {
        this._msg.receive(this._socket);
    }

    /**
     * 初始化服务区地址
     * @param host IP
     * @param port 端口
     * @param msg 消息发送接受处理类
     */
    public initServer(host:string, port:any, msg:BaseMsg):void {
        this._host = host;
        this._port = port;
        this._msg = msg;
    }

    /**
     * 开始Socket连接
     */
    public connect():void {
        if (!window["WebSocket"]) {
            Log.trace("不支持WebSocket");
            return;
        }
        this._socket = new egret.WebSocket();
        if (this._msg instanceof ByteArrayMsg) {
            this._socket.type = egret.WebSocket.TYPE_BINARY;
        }
        this._socket.connect(this._host, this._port);
        this.addEvents();
    }

    /**
     * 重新连接
     */
    private reconnect():void {
        this.close();
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) {
            this.connect();
        } else {
            this._reconnectCount = 0;
            if (this._connectFlag) {
                App.MessageCenter.dispatch(SocketConst.SOCKET_CLOSE);
            } else {
                App.MessageCenter.dispatch(SocketConst.SOCKET_NOCONNECT);
            }
        }
    }

    /**
     * 发送消息到服务器
     * @param msg
     */
    public send(msg:any):void {
        this._msg.send(this._socket, msg);
    }

    /**
     * 关闭Socket连接
     */
    public close():void {
        this.removeEvents();
        this._socket.close();
        this._socket = null;
    }

    /**
     * Debug信息
     * @param str
     */
    private debugInfo(str:String):void {
        App.MessageCenter.dispatch(SocketConst.SOCKET_DEBUG_INFO, str);
    }

}
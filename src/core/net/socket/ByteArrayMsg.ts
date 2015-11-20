/**
 * Created by yangsong on 15-2-11.
 */
class ByteArrayMsg implements BaseMsg {
    private _msgBuffer:egret.ByteArray;

    /**
     * 构造函数
     */
    public constructor() {
        this._msgBuffer = new egret.ByteArray();
    }

    /**
     * 接收消息处理
     * @param msg
     */
    public receive(socket:egret.WebSocket):void {
        socket.readBytes(this._msgBuffer);

        var obj:any = this.decode(this._msgBuffer);
        if (obj) {
            App.MessageCenter.dispatch(obj.key, obj.body);
        }

        //TODO double bytearray clear
        if (this._msgBuffer.bytesAvailable == 0) {
            this._msgBuffer.clear();
        }
    }

    /**
     * 发送消息处理
     * @param msg
     */
    public send(socket:egret.WebSocket, msg:any):void {
        var obj:any = this.encode(msg);
        if (obj) {
            obj.position = 0;
            socket.writeBytes(obj, 0, obj.bytesAvailable);
        }
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg:any):any {
        Log.trace("decode需要子类重写，根据项目的协议结构解析");
        return null;
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg:any):any {
        Log.trace("encode需要子类重写，根据项目的协议结构解析");
        return null;
    }
}
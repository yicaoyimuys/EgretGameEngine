/**
 * Created by yangsong on 15-3-25.
 */
class ByteArrayMsgByProtobuf extends ByteArrayMsg{
    private msgClass:any = null;

    /**
     * 构造函数
     */
    public constructor(){
        super();
        this.msgClass = {};
    }

    /**
     * 获取msgID对应的类
     * @param msgID
     * @returns {any}
     */
    private getMsgClass(msgID:number):any{
        var cls:any = this.msgClass[msgID];
        if(cls == null){
            cls = App.ProtoFile.build(App.ProtoConfig[msgID]);
            this.msgClass[msgID] = cls;
        }
        return cls;
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg:any):any{
        var msgID = msg.readShort();
        var len = msg.readShort();
        if(msg.bytesAvailable >= len) {
            var bytes:egret.ByteArray = new egret.ByteArray();
            msg.readBytes(bytes, 0, len);

            var obj:any = {};
            obj.key = msgID + "";
            obj.body = this.getMsgClass(msgID).decode(bytes.buffer);
            return obj;
        }
        return null;
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg:any):any{
        var msgID = msg.key;
        var msgBody = new (this.getMsgClass(msgID))(msg.body);

        var sendMsg:egret.ByteArray = new egret.ByteArray();
        sendMsg.writeShort(msgID);
        sendMsg.writeBytes(new egret.ByteArray(msgBody.toArrayBuffer()));
        return sendMsg;
    }
}
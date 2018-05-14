/**
 * Created by yangsong on 15-3-27.
 * ProtoBuf测试
 */
class ProtoBufTest {
    public constructor() {
        App.ResourceUtils.loadGroup("preload_core", this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(): void {
        App.Init();

        this.clientTest();
        // this.socketTest();
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded: number, itemsTotal: number): void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }

    private clientTest(): void {
        //创建一条消息
        var msg = simple.user_login_c2s.fromObject({
            accid: 1,
            tstamp: 2,
            ticket: "yangsong"
        });

        //序列化
        var buffer = simple.user_login_c2s.encode(msg).finish();
        Log.trace("序列化数据：", buffer);

        //反序列化
        var message = simple.user_login_c2s.decode(buffer);
        Log.trace("反序列化数据：", message);
    }

    private socketTest(): void {
        //发送一条消息到服务器
        function send(): void {
            var msg: any = {};
            msg.key = "simple.user_login_c2s";
            msg.body = {
                "accid": 888,
                "tstamp": 999,
                "ticket": "yangsong"
            };
            App.Socket.send(msg);
        }

        App.Socket.connect();
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, () => {
            Log.trace("与服务器连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, () => {
            Log.trace("与服务器重新连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, () => {
            Log.trace("开始与服务器重新连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, () => {
            Log.trace("与服务器断开连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, () => {
            Log.trace("服务器连接不上");
        }, this);
        App.MessageCenter.addListener("10001", function (msg): void {
            Log.trace("收到服务器消息:", msg);
        }, this);
    }
}
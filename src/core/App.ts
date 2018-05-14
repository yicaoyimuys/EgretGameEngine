/**
 * Created by yangsong on 2014/11/22.
 */
class App {
    /**
     * 请求服务器使用的用户标识
     * @type {string}
     */
    public static ProxyUserFlag: string = "";
    /**
     * 全局配置数据
     * @type {null}
     */
    public static GlobalData: any = null;
    /**
     * ProtoConfig
     * @type {null}
     */
    public static ProtoConfig: any = null;

    /**
     * Http请求
     * @type {Http}
     */
    public static get Http(): Http {
        return Http.getInstance();
    }

    /**
     * Socket请求
     * @type {null}
     */
    public static get Socket(): Socket {
        return Socket.getInstance();
    }

    /**
     * 模块管理类
     * @type {ControllerManager}
     */
    public static get ControllerManager(): ControllerManager {
        return ControllerManager.getInstance();
    }

    /**
     * View管理类
     * @type {ViewManager}
     */
    public static get ViewManager(): ViewManager {
        return ViewManager.getInstance();
    }

    /**
     * 场景管理类
     * @type {SceneManager}
     */
    public static get SceneManager(): SceneManager {
        return SceneManager.getInstance();
    }

    /**
     * 调试工具
     * @type {DebugUtils}
     */
    public static get DebugUtils(): DebugUtils {
        return DebugUtils.getInstance();
    }

    /**
     * 服务器返回的消息处理中心
     * @type {MessageCenter}
     */
    public static get MessageCenter(): MessageCenter {
        return MessageCenter.getInstance(0);
    }

    /**
     * 统一的计时器和帧刷管理类
     * @type {TimerManager}
     */
    public static get TimerManager(): TimerManager {
        return TimerManager.getInstance();
    }

    /**
     * 日期工具类
     * @type {DateUtils}
     */
    public static get DateUtils(): DateUtils {
        return DateUtils.getInstance();
    }

    /**
     * 数学计算工具类
     * @type {MathUtils}
     */
    public static get MathUtils(): MathUtils {
        return MathUtils.getInstance();
    }

    /**
     * 随机数工具类
     * @type {RandomUtils}
     */
    public static get RandomUtils(): RandomUtils {
        return RandomUtils.getInstance();
    }

    /**
     * 显示对象工具类
     * @type {DisplayUtils}
     */
    public static get DisplayUtils(): DisplayUtils {
        return DisplayUtils.getInstance();
    }

    /*
     * 图片合成数字工具类
     * */
    public static get BitmapNumber(): BitmapNumber {
        return BitmapNumber.getInstance();
    }

    /**
     * 引导工具类
     */
    public static get GuideUtils(): GuideUtils {
        return GuideUtils.getInstance();
    }

    /**
     * Stage操作相关工具类
     */
    public static get StageUtils(): StageUtils {
        return StageUtils.getInstance();
    }

    /**
     * Effect工具类
     */
    public static get EffectUtils(): EffectUtils {
        return EffectUtils.getInstance();
    }

    /**
     * 字符串工具类
     */
    public static get StringUtils(): StringUtils {
        return StringUtils.getInstance();
    }

    /**
     * 通过工具类
     */
    public static get CommonUtils(): CommonUtils {
        return CommonUtils.getInstance();
    }

    /**
     * 音乐管理类
     */
    public static get SoundManager(): SoundManager {
        return SoundManager.getInstance();
    }

    /**
     * 设备工具类
     */
    public static get DeviceUtils(): DeviceUtils {
        return DeviceUtils.getInstance();
    }

    /**
     * 引擎扩展类
     */
    public static get EgretExpandUtils(): EgretExpandUtils {
        return EgretExpandUtils.getInstance();
    }

    /**
     * 键盘操作工具类
     */
    public static get KeyboardUtils(): KeyboardUtils {
        return KeyboardUtils.getInstance();
    }

    /**
     * 摇杆操作工具类
     */
    public static get RockerUtils(): RockerUtils {
        return RockerUtils.getInstance();
    }

    /**
     * 震动类
     */
    public static get ShockUtils(): ShockUtils {
        return ShockUtils.getInstance();
    }

    /**
     * 资源加载工具类
     */
    public static get ResourceUtils(): ResourceUtils {
        return ResourceUtils.getInstance();
    }

    /**
     * RenderTextureManager
     */
    public static get RenderTextureManager(): RenderTextureManager {
        return RenderTextureManager.getInstance();
    }

    /**
     * TextFlow
     */
    public static get TextFlowMaker(): TextFlowMaker {
        return TextFlowMaker.getInstance();
    }

    /**
     * 消息通知中心
     */
    private static _notificationCenter: MessageCenter;

    public static get NotificationCenter(): MessageCenter {
        if (App._notificationCenter == null) {
            App._notificationCenter = new MessageCenter(1);
        }
        return App._notificationCenter;
    }


    /**
     * 分帧处理类
     * @returns {any}
     * @constructor
     */
    public static get DelayOptManager(): DelayOptManager {
        return DelayOptManager.getInstance();
    }

    /**
     * 数组工具类
     * @returns {any}
     * @constructor
     */
    public static get ArrayUtils(): ArrayUtils {
        return ArrayUtils.getInstance();
    }

    /**
     * 通用Loading动画
     * @returns {any}
     * @constructor
     */
    public static get EasyLoading(): EasyLoading {
        return EasyLoading.getInstance();
    }

    /**
     * DragonBones工厂类
     * @returns {any}
     * @constructor
     */
    public static get DragonBonesFactory(): DragonBonesFactory {
        return DragonBonesFactory.getInstance();
    }

    /**
     * StarlingSwf工厂类
     * @returns {StarlingSwfFactory}
     * @constructor
     */
    public static get StarlingSwfFactory(): StarlingSwfFactory {
        return StarlingSwfFactory.getInstance();
    }

    /**
     * 初始化函数
     * @constructor
     */
    public static Init(): void {
        console.log("当前引擎版本: ", egret.Capabilities.engineVersion);
        //全局配置数据
        App.GlobalData = RES.getRes("global");
        //开启调试
        App.DebugUtils.isOpen(App.GlobalData.IsDebug);
        App.DebugUtils.setThreshold(5);
        //扩展功能初始化
        App.EgretExpandUtils.init();
        //实例化Http请求
        App.Http.initServer(App.GlobalData.HttpSerever);
        //实例化ProtoBuf和Socket请求
        App.ProtoConfig = RES.getRes(App.GlobalData.ProtoConfig);
        App.Socket.initServer(App.GlobalData.SocketServer, App.GlobalData.SocketPort, new ByteArrayMsgByProtobuf());
    }
}

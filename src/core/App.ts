/**
 * Created by yangsong on 2014/11/22.
 */
class App{
    /**
     * 请求服务器使用的用户标识
     * @type {string}
     */
    public static ProxyUserFlag:string = "";
    /**
     * Http请求
     * @type {Http}
     */
    public static Http:Http;
    /**
     * Socket请求
     * @type {null}
     */
    public static Socket:Socket;
    /**
     * 模块管理类
     * @type {ControllerManager}
     */
    public static ControllerManager:ControllerManager;
    /**
     * View管理类
     * @type {ViewManager}
     */
    public static ViewManager:ViewManager;
    /**
     * 场景管理类
     * @type {SceneManager}
     */
    public static SceneManager:SceneManager;
    /**
     * 调试工具
     * @type {DebugUtils}
     */
    public static DebugUtils:DebugUtils;
    /**
     * 服务器返回的消息处理中心
     * @type {MessageCenter}
     */
    public static MessageCenter:MessageCenter;
    /**
     * 统一的计时器和帧刷管理类
     * @type {TimerManager}
     */
    public static TimerManager:TimerManager;
    /**
     * 日期工具类
     * @type {DateUtils}
     */
    public static DateUtils:DateUtils;
    /**
     * 数学计算工具类
     * @type {MathUtils}
     */
    public static MathUtils:MathUtils;
    /**
     * 随机数工具类
     * @type {RandomUtils}
     */
    public static RandomUtils:RandomUtils;
    /**
     * 显示对象工具类
     * @type {DisplayUtils}
     */
    public static DisplayUtils:DisplayUtils;
    /*
     * 图片合成数字工具类
     * */
    public static BitmapNumber:BitmapNumber;

    /**
     * 初始化函数
     * @constructor
     */
    public static Init(stage:egret.Stage):void{
        //初始化所有utils
        App.initUtils();
        //开启调试
        App.DebugUtils.isOpen(true);
        //开启服务器返回的消息侦听
        App.TimerManager.doFrame(1, 0, App.MessageCenter.run, App.MessageCenter);
        //实例化Http请求
        App.Http.initServer("http://www.baidu.com");;
        //实例化Socket请求
        App.Socket.initServer("192.0.0.1", "8001");
        //初始化所有场景
        App.SceneManager.init(stage);
        App.SceneManager.add(SceneConsts.Game, new GameScene());
        App.SceneManager.add(SceneConsts.UI, new UIScene());
        //初始化所有模块
        App.ControllerManager.add(ControllerConst.LOGIN, new LoginController());
    }

    /**
     * 初始化所有utils
     */
    private static initUtils():void {
        App.Http = new Http();
        App.BitmapNumber = new BitmapNumber();
        App.Socket = new Socket();
        App.ControllerManager = new ControllerManager();
        App.DateUtils = new DateUtils();
        App.DebugUtils = new DebugUtils();
        App.DisplayUtils = new DisplayUtils();
        App.MathUtils = new MathUtils();
        App.MessageCenter = new MessageCenter();
        App.RandomUtils = new RandomUtils();
        App.SceneManager = new SceneManager();
        App.TimerManager = new TimerManager();
        App.ViewManager = new ViewManager();
    }
}
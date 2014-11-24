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
    public static Http:Http = null;
    /**
     * 模块管理类
     * @type {ControllerManager}
     */
    public static ControllerManager:ControllerManager = new ControllerManager();
    /**
     * View管理类
     * @type {ViewManager}
     */
    public static ViewManager:ViewManager = new ViewManager();
    /**
     * 调试工具
     * @type {DebugUtils}
     */
    public static DebugUtils:DebugUtils = new DebugUtils();
    /**
     * 服务器返回的消息处理中心
     * @type {MessageCenter}
     */
    public static MessageCenter:MessageCenter = new MessageCenter();
    /**
     * 统一的计时器和帧刷管理类
     * @type {TimerManager}
     */
    public static TimerManager:TimerManager = new TimerManager();
    /**
     * 日期工具类
     * @type {DateUtils}
     */
    public static DateUtils:DateUtils = new DateUtils();
    /**
     * 数学计算工具类
     * @type {MathUtils}
     */
    public static MathUtils:MathUtils = new MathUtils();
    /**
     * 随机数工具类
     * @type {RandomUtils}
     */
    public static RandomUtils:RandomUtils = new RandomUtils();
    /**
     * 显示对象工具类
     * @type {DisplayUtils}
     */
    public static DisplayUtils:DisplayUtils = new DisplayUtils();

    /**
     * 初始化函数
     * @constructor
     */
    public static Init():void{
        //开启调试
        App.DebugUtils.isOpen(true);
        //开启服务器返回的消息侦听
        App.TimerManager.doFrame(1, 0, App.MessageCenter.run, App.MessageCenter);
        //实例化Http请求
        App.Http = new Http("http://www.baidu.com");
        //初始化所有模块
        App.ControllerManager.add(ControllerConst.LOGIN, new LoginController());
    }
}
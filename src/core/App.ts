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
    public static get Http():Http{
        return Http.getInstance();
    }
    /**
     * Socket请求
     * @type {null}
     */
    public static get Socket():Socket{
        return Socket.getInstance();
    }
    /**
     * 模块管理类
     * @type {ControllerManager}
     */
    public static get ControllerManager():ControllerManager{
        return ControllerManager.getInstance();
    }
    /**
     * View管理类
     * @type {ViewManager}
     */
    public static get ViewManager():ViewManager{
        return ViewManager.getInstance();
    }
    /**
     * 场景管理类
     * @type {SceneManager}
     */
    public static get SceneManager():SceneManager{
        return SceneManager.getInstance();
    }
    /**
     * 调试工具
     * @type {DebugUtils}
     */
    public static get DebugUtils():DebugUtils{
        return DebugUtils.getInstance();
    }
    /**
     * 服务器返回的消息处理中心
     * @type {MessageCenter}
     */
    public static get MessageCenter():MessageCenter{
        return MessageCenter.getInstance();
    }
    /**
     * 统一的计时器和帧刷管理类
     * @type {TimerManager}
     */
    public static get TimerManager():TimerManager{
        return TimerManager.getInstance();
    }
    /**
     * 日期工具类
     * @type {DateUtils}
     */
    public static get DateUtils():DateUtils{
        return DateUtils.getInstance();
    }
    /**
     * 数学计算工具类
     * @type {MathUtils}
     */
    public static get MathUtils():MathUtils{
        return MathUtils.getInstance();
    }
    /**
     * 随机数工具类
     * @type {RandomUtils}
     */
    public static get RandomUtils():RandomUtils{
        return RandomUtils.getInstance();
    }
    /**
     * 显示对象工具类
     * @type {DisplayUtils}
     */
    public static get DisplayUtils():DisplayUtils{
        return DisplayUtils.getInstance();
    }
    /*
     * 图片合成数字工具类
     * */
    public static get BitmapNumber():BitmapNumber{
        return BitmapNumber.getInstance();
    }
    /**
     * 引导工具类
     */
    public static get GuideUtils():GuideUtils{
        return GuideUtils.getInstance();
    }
    /**
     * Stage操作相关工具类
     */
    public static get StageUtils():StageUtils{
        return StageUtils.getInstance();
    }
    /**
     * Effect工具类
     */
    public static get EffectUtils():EffectUtils{
        return EffectUtils.getInstance();
    }
    /**
     * 字符串工具类
     */
    public static get StringUtils():StringUtils{
        return StringUtils.getInstance();
    }

    /**
     * 初始化函数
     * @constructor
     */
    public static Init(stage:egret.Stage):void{
        //开启调试
        App.DebugUtils.isOpen(true);
        //开启服务器返回的消息侦听
        App.TimerManager.doFrame(1, 0, App.MessageCenter.run, App.MessageCenter);
        //实例化Http请求
        App.Http.initServer("http://www.baidu.com");
        //实例化Socket请求
        App.Socket.initServer("192.0.0.1", "8001");
        //初始化所有场景
        App.SceneManager.init(stage);
        App.SceneManager.add(SceneConsts.Game, new GameScene());
        App.SceneManager.add(SceneConsts.UI, new UIScene());
        //初始化所有模块
        App.ControllerManager.add(ControllerConst.LOGIN, new LoginController());
    }
}
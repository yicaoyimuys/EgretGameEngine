/**
 * Created by Administrator on 2014/11/23.
 */
class LoginController extends BaseController{
    //本模块的数据存储
    private userInfo:any;
    //本模块的所有UI
    private loginView:LoginView;
    //本模块的Proxy
    private proxy:LoginProxy;

    public constructor(){
        super();

        //初始化UI
        this.loginView = new LoginView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.LOGIN, this.loginView);

        //初始化Proxy
        this.proxy = new LoginProxy(this);

        //注册模块间、模块内部事件监听

        //注册C2S消息
        this.registerFunc(LoginConst.LOGIN_C2S, this.onLogin, this);

        //注册S2C消息
        this.registerFunc(LoginConst.LOGIN_S2C, this.loginSuccess, this);
    }

    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    private onLogin(userName:string, pwd:string):void{
        this.proxy.login(userName, pwd);
    }

    /**
     * 登陆成功处理
     */
    private loginSuccess(userInfo:any):void{
        //保存数据
        this.userInfo = userInfo;
        //本模块UI处理
        this.loginView.loginSuccess();
        //UI跳转
        App.ViewManager.close(ViewConst.LOGIN);
        App.ViewManager.open(ViewConst.ROLE);
    }
}
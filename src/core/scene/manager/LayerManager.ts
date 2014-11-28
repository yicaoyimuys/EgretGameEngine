/**
 * Created by yangsong on 2014/11/23.
 * 游戏层级类
 */
class LayerManager{
    /**
     * 游戏背景层
     * @type {egret.DisplayObjectContainer}
     */
    public static Game_Bg:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    /**
     * 主游戏层
     * @type {egret.DisplayObjectContainer}
     */
    public static Game_Main:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

    /**
     * UI主界面
     * @type {egret.DisplayObjectContainer}
     */
    public static UI_Main:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    /**
     * UI弹出框层
     * @type {egret.DisplayObjectContainer}
     */
    public static UI_Popup:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    /**
     * UI警告消息层
     * @type {egret.DisplayObjectContainer}
     */
    public static UI_Message:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    /**
     * UITips层
     * @type {egret.DisplayObjectContainer}
     */
    public static UI_Tips:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
}
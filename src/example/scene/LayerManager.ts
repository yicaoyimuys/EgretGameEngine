/**
 * Created by yangsong on 2014/11/23.
 * 游戏层级类
 */
class LayerManager{
    /**
     * 游戏背景层
     * @type {BaseSpriteLayer}
     */
    public static Game_Bg:BaseSpriteLayer = new BaseSpriteLayer();
    /**
     * 主游戏层
     * @type {BaseSpriteLayer}
     */
    public static Game_Main:BaseSpriteLayer = new BaseSpriteLayer();

    /**
     * UI主界面
     * @type {BaseGuiLayer}
     */
    public static UI_Main:BaseGuiLayer = new BaseGuiLayer();
    /**
     * UI弹出框层
     * @type {BaseGuiLayer}
     */
    public static UI_Popup:BaseGuiLayer = new BaseGuiLayer();
    /**
     * UI警告消息层
     * @type {BaseGuiLayer}
     */
    public static UI_Message:BaseGuiLayer = new BaseGuiLayer();
    /**
     * UITips层
     * @type {BaseGuiLayer}
     */
    public static UI_Tips:BaseGuiLayer = new BaseGuiLayer();
}
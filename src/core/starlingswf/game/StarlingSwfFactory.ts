/**
 * Created by yangsong on 2014/6/16.
 * StarlingSwf工厂类
 */
class StarlingSwfFactory extends BaseClass {

    private swfAssetsManager:starlingswf.SwfAssetManager;
    private swfAssetsNames:Array<string>;
    private swfAssets:Array<starlingswf.Swf>;
    private swfData:any;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.swfAssetsManager = new starlingswf.SwfAssetManager();
        this.swfAssetsNames = new Array<string>();
        this.swfAssets = new Array<starlingswf.Swf>();
        this.swfData = {};
    }

    /**
     * 添加一个swf
     * @param name 唯一标识
     * @param swfData swf配置数据
     * @param spriteSheep 资源配置数据
     */
    public addSwf(name:string, swfData:Object, spriteSheep:egret.SpriteSheet):void {
        if (this.swfAssetsNames.indexOf(name) != -1)
            return;
        if (swfData == null || spriteSheep == null) {
            console.log("SWF加载失败:" + name);
            return;
        }
        this.swfAssetsManager.addSpriteSheet(name, spriteSheep);
        var swf:starlingswf.Swf = new starlingswf.Swf(swfData, this.swfAssetsManager, 24);
        swf.name = name;
        StarlingSwfUtils.addSwf(swf);
        this.swfAssetsNames.push(name);
        this.swfAssets.push(swf);
    }

    /**
     * 停止列表中的swf
     * @param arr
     */
    public stopSwfs(arr:Array<string>):void {
        for (var i:number = 0, len:number = arr.length; i < len; i++) {
            var swf:starlingswf.Swf = StarlingSwfUtils.getSwf(arr[i]);
            if (swf) {
                swf.swfUpdateManager.stop();
            }
        }
    }

    /**
     * 播放列表中的swf
     * @param arr
     */
    public playSwfs(arr:Array<string>):void {
        for (var i:number = 0, len:number = arr.length; i < len; i++) {
            var swf:starlingswf.Swf = StarlingSwfUtils.getSwf(arr[i]);
            if (swf) {
                swf.swfUpdateManager.play();
            }
        }
    }

    /**
     * 清空所有swf
     */
    private clearSwfs():void {
        while (this.swfAssets.length) {
            StarlingSwfUtils.removeSwf(this.swfAssets.pop());
        }
        while (this.swfAssetsNames.length) {
            this.swfAssetsNames.pop();
        }
        this.swfAssetsManager = new starlingswf.SwfAssetManager();
    }

    /**
     * 清空
     */
    public clear():void {
        this.clearSwfs();
    }

    /**
     * 创建一个StarlingSwfMovieClip
     * @param name mc的名字
     * @returns {StarlingSwfMovieClip}
     */
    public makeMc(name:string):StarlingSwfMovieClip {
        var mc:StarlingSwfMovieClip = <StarlingSwfMovieClip>StarlingSwfUtils.createMovie("mc_" + name, null, StarlingSwfMovieClip);
        if (mc == null) {
            console.log("SWF创建失败: " + name);
        }
        return mc;
    }

    /**
     * 创建一个Bitmap
     * @param name 图片的名称
     * @returns {egret.Bitmap}
     */
    public makeImage(name:string):egret.Bitmap {
        return StarlingSwfUtils.createImage("img_" + name);
    }

    /**
     * 获取材质
     * @param name 材质名称
     * @returns {egret.Texture}
     */
    public getTexture(name):egret.Texture {
        return StarlingSwfUtils.getTexture("img_" + name);
    }
}
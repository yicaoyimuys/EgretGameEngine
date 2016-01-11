/**
 * Created by yangsong on 2014/11/24.
 * 显示对象工具类
 */
class DisplayUtils extends BaseClass {
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    public createBitmap(resName:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    }

    /**
     * 创建一张Gui的图片
     * @param resName
     * @returns {egret.Bitmap}
     */
    public createEuiImage(resName:string):eui.Image {
        var result:eui.Image = new eui.Image();
        var texture:egret.Texture = RES.getRes(resName);
        result.source = texture;
        return result;
    }

    /**
     * 从父级移除child
     * @param child
     */
    public removeFromParent(child:egret.DisplayObject) {
        if (child.parent == null)
            return;

        child.parent.removeChild(child);
    }
}

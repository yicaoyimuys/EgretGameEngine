/**
 * Created by yangsong on 2014/11/24.
 * 显示对象工具类
 */
class DisplayUtils extends SingtonClass {
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
    public createBitmap(resName: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    }

    /**
     * 创建一个textField
     * @param size;
     * @param color;
     * @param otherParam;
     */
    public createTextField(size: number = 12, color: number = 0xFFFFFF, otherParam?: {rotation?:number, x?: number, y?: number, width?: number, height?: number, textAlign?: egret.HorizontalAlign, verticalAlign?: egret.VerticalAlign, skewX?:number, skewY?:number, text?:string, bold?:boolean }): egret.TextField {
        let txt: egret.TextField = new egret.TextField();
        txt.size = size;
        txt.textColor = color;
        if (!otherParam) return txt;
        for (let key in otherParam) {
            txt[key] = otherParam[key];
        }
        return txt;
    }

    /**
     * 创建一个位图字体
     */
    public createBitmapFont(fontName:string): egret.BitmapText{
        let bpFont: egret.BitmapText = new egret.BitmapText();
        bpFont.font = RES.getRes(fontName);
        return bpFont;
    }

    /**
     * 创建一张Gui的图片
     * @param resName
     * @returns {egret.Bitmap}
     */
    public createEuiImage(resName: string): eui.Image {
        var result: eui.Image = new eui.Image();
        var texture: egret.Texture = RES.getRes(resName);
        result.source = texture;
        return result;
    }

    /**
     * 从父级移除child
     * @param child
     */
    public removeFromParent(child: egret.DisplayObject) {
        if (child.parent == null)
            return;

        child.parent.removeChild(child);
    }

    /**
     * 添加到指定容器
     * @param child
     * @param parent
     */
    public addChild(child: egret.DisplayObject, parent: egret.DisplayObjectContainer) {
        if (!child || !parent) return;
        parent.addChild(child);
    }
}

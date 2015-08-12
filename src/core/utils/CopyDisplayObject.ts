/**
 * Created by Saco on 2015/7/3.
 */
class CopyDisplayObject extends BaseClass
{
    private _doPool:egret.DisplayObject[];
    private _renderDic:any;
    private _isTimerStart:boolean;
    private _cachRenderTexture:any;

    public constructor()
    {
        this._renderDic = Object.create(null);
        this._cachRenderTexture = Object.create(null);
    }

    /**
     * 创建该有效现实对象的副本
     * @param sourceDisplay
     */
    public createDisplayObjectCopy(sourceDisplay:egret.DisplayObject):egret.DisplayObject{
        sourceDisplay._makeBitmapCache();
        var dis:egret.DisplayObject = this.getDisplayObject();
        this._renderDic[dis.hashCode] = {copy:dis, source:sourceDisplay};
        this.startTimer();
        return dis;
    }

    private startTimer():void{
        if(this._isTimerStart) return;
        this._isTimerStart = true;
        <TimerManager>(App.TimerManager).doFrame(1, 0, this.render, this);
    }

    private stopTimer():void{
        this._isTimerStart = false;
        <TimerManager>(App.TimerManager).remove(this.render, this)
    }

    private render():void{
        var keys = Object.keys(this._renderDic);
        var dis:egret.DisplayObject;
        var source:egret.DisplayObject;
        for(var i = 0, len = keys.length; i < len; i++){
            dis = this._renderDic[keys[i]].copy;
            source = this._renderDic[keys[i]].source;
            //拷贝显示
            if(!this._cachRenderTexture[source.hashCode]){
                source._makeBitmapCache();
                this._cachRenderTexture[source.hashCode] = source.renderTexture;
                dis._texture_to_render = source.renderTexture;
            }
            dis._texture_to_render = this._cachRenderTexture[source.hashCode];
            dis._DO_Props_._cacheAsBitmap = true;
        }
        this._cachRenderTexture = Object.create(null);
    }

    /**
     * 销毁复制的显示对象
     * @param dis
     */
    public destroyDisplayObjectCopy(dis:egret.DisplayObject):void{
        var dis:egret.DisplayObject;
        dis = this._renderDic[dis.hashCode].copy;
        dis._texture_to_render = null;
        dis.renderTexture = null;
        if(dis.parent) dis.parent.removeChild(dis);
        this._doPool.push(dis);
        delete this._renderDic[dis.hashCode];
        if(Object.keys(this._renderDic).length == 0) this.stopTimer();
    }

    private getDisplayObject():egret.DisplayObject{
        if(this._doPool.length){
            return this._doPool.shift();
        }
        return new egret.DisplayObject();
    }
}

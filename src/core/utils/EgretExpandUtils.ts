/**
 * Created by yangsong on 15-1-23.
 * 引擎扩展类
 */
class EgretExpandUtils extends BaseClass{
    /**
     * 构造函数
     */
    public constructor(){
        super();
    }

    /**
     * 初始化函数
     */
    public init():void{
        this.bug_half_screen();
        this.bug_qqBrowser_CanvasNum();
        this.cocosStudio2DragonBones_egretFactory();
    }

    /**
     * 在高分辨率屏幕会显示半屏的bug修复
     */
    private bug_half_screen():void{
        if(!App.DeviceUtils.IsHtml5){
            return;
        }

        egret.HTML5CanvasRenderer.prototype.clearRect = function (x, y, w, h) {
            this.canvasContext.clearRect(x, y, w * window.devicePixelRatio, h * window.devicePixelRatio);
        };
    }

    /**
     * cacheAsBitmap的替代方案，解决QQ浏览器在1G内存的机器上最多能使用20个Canvas的限制
     */
    private bug_qqBrowser_CanvasNum():void{
        if(!App.DeviceUtils.IsHtml5){
            return;
        }

        egret.DisplayObject.prototype._makeBitmapCache = function () {
            if (this.stage == null || this.visible == false){
                return false;
            }

            if (!this.renderTexture) {
                this.renderTexture = App.RenderTextureManager.pop();
            }

            if (!this.renderTexture) {
                return false;
            }

            var result = this.renderTexture.drawToTexture(this);
            if (result) {
                this._texture_to_render = this.renderTexture;
            }
            else {
                App.RenderTextureManager.push(this.renderTexture);
                this._texture_to_render = null;
                this.renderTexture = null;
            }
            return result;
        };

        egret.DisplayObject.prototype._onRemoveFromStage = function () {
            egret.DisplayObjectContainer.__EVENT__REMOVE_FROM_STAGE_LIST.push(this);

            if(this.renderTexture){
                App.RenderTextureManager.push(this.renderTexture);
                this._texture_to_render = null;
                this.renderTexture = null;
            }
        };

        Object.defineProperty(egret.DisplayObject.prototype, "cacheAsBitmap", {
            /**
             * 如果设置为 true，则 egret 运行时将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。
             * 具有已缓存位图的显示对象的所有矢量数据都将被绘制到位图而不是主显示。像素按一对一与父对象进行映射。如果位图的边界发生更改，则将重新创建位图而不会拉伸它。
             * 除非将 cacheAsBitmap 属性设置为 true，否则不会创建内部位图。
             * @member {number} egret.DisplayObject#cacheAsBitmap
             */
            get: function () {
                return this._cacheAsBitmap;
            },
            set: function (bool) {
                this._cacheAsBitmap = bool;
                if (bool) {
                    egret.callLater(this._makeBitmapCache, this);
                }
                else {
                    if(this.renderTexture){
                        App.RenderTextureManager.push(this.renderTexture);
                        this._texture_to_render = null;
                        this.renderTexture = null;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

    }

    /**
     * dragonBones创建图片修改
     * cocostudio动画转dragonBones专用
     */
    private cocosStudio2DragonBones_egretFactory():void{
        if(!App.GlobalData.CocosStudio2DragonBones){
            return;
        }

        dragonBones.EgretFactory.prototype._generateDisplay = function (textureAtlas, fullName, pivotX, pivotY) {
            if(fullName.indexOf("particles_") != -1){
                var particleConfig = RES.getRes(fullName);
                if(particleConfig){
                    particleConfig.emitter = {"x":0, "y":0};

                    var particleTexture = RES.getRes(particleConfig.texture);
                    if(particleTexture == null){
                        Log.trace("粒子图片"+particleConfig.texture+"不存在");
                    }
                    var particleSystem = new particle.GravityParticleSystem(particleTexture, particleConfig);
                    particleSystem.addEventListener(egret.Event.COMPLETE, function():void{
                        particleSystem.stop();
                    }, this);
                    return particleSystem;
                }else{
                    Log.trace("粒子配置文件"+fullName+"不存在");
                    return new egret.DisplayObjectContainer();
                }
            }else{
                var c = new egret.DisplayObjectContainer();
                var bitmap = new egret.Bitmap();
                bitmap.texture = textureAtlas.getTexture(fullName);
                if(bitmap.texture){
                    bitmap.anchorX = pivotX;
                    bitmap.anchorY = pivotY;
                    if(textureAtlas["getFrame"]){
                        var frame:dragonBones.Rectangle = textureAtlas["getFrame"](fullName);
                        bitmap.x = frame.x;
                        bitmap.y = -frame.y;
                    }
                }
                c.addChild(bitmap);
                return c;
            }
        };

        dragonBones.EgretSlot.prototype._updateDisplay = function (value) {
            this._egretDisplay = value;
            if(value instanceof particle.GravityParticleSystem && value.visible){
                var particleSystem = (<particle.GravityParticleSystem>value);
                particleSystem.start(parseFloat(particleSystem.particleConfig.duration));
            }
        };
    }

    /**
     * addChild 的高效实现，慎用
     * @param container
     * @param child
     */
    public addChild(container:egret.DisplayObjectContainer, child:egret.DisplayObject):void{
        if(child._parent != container){
            if(child._parent)
                this.removeFromParent(child);
            container._children.push(child);
            child._parent = container;
        }
    }

    /**
     * addChildAt 的高效实现，慎用
     * @param container
     * @param child
     * @param index
     */
    public addChildAt(container:egret.DisplayObjectContainer, child:egret.DisplayObject, index:number):void{
        if(child._parent != container){
            if(child._parent)
                this.removeFromParent(child);
            container._children.splice(index, 0, child);
            child._parent = container;
        }
    }

    /**
     * removeFromParent 的高效实现，慎用
     * @param child
     */
    public removeFromParent(child:egret.DisplayObject):void{
        if (child && child._parent) {
            var index = child._parent._children.indexOf(child);
            child._parent._children.splice(index, 1);
            child._parent = null;
        }
    }

    /**
     * removeChildAt 的高效实现，慎用
     * @param container
     * @param index
     */
    public removeChildAt(container:egret.DisplayObjectContainer, index:number):void{
        var child:egret.DisplayObject = container._children[index];
        if(child){
            container._children.splice(index, 1);
            child._parent = null;
        }
    }

    /**
     * removeAllChild 的高效实现，慎用
     * @param container
     */
    public removeAllChild(container:egret.DisplayObjectContainer):void{
        while(container._children.length){
            this.removeChildAt(container, 0);
        }
    }
}
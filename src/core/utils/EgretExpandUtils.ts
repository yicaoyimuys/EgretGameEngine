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
        if(App.GlobalData.CocosStudio2DragonBones){
            this.cocosStudio2DragonBones_egretFactory();
        }
    }

    /**
     * 在高分辨率屏幕会显示半屏的bug修复
     */
    private bug_half_screen():void{
        if(App.DeviceUtils.IsHtml5){
            egret.HTML5CanvasRenderer.prototype.clearRect = function (x, y, w, h) {
                this.canvasContext.clearRect(x, y, w * window.devicePixelRatio, h * window.devicePixelRatio);
            };
        }
    }

    /**
     * dragonBones创建图片修改
     * cocostudio动画转dragonBones专用
     */
    private cocosStudio2DragonBones_egretFactory():void{
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
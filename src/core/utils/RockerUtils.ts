/**
 * Created by yangsong on 15-1-27.
 * 摇杆控制类
 */
class RockerUtils extends BaseClass {
    private keys:Array<number>;
    private moveFlagRec:egret.Rectangle;
    private moveFlagCheckRec:egret.Rectangle;
    private moveFlag:egret.Bitmap;
    private moveFlagWidthHelf:number;

    private moveFlagX:number;
    private moveFlagY:number;
    private isMoveing:boolean;
    private moveFlagGoX:number;
    private moveFlagGoY:number;
    private mouseX:number;
    private mouseY:number;
    private checkKeying:boolean;

    private dealKeyFunc:Function;
    private dealKeyTarget:any;

    public constructor() {
        super();
    }

    /**
     * 摇杆初始化
     * @param moveBg 摇杆背景图
     * @param moveFlag 摇杆图标
     * @param dealKeyFunc 摇杆移动时处理函数
     * @param dealKeyTarget 摇杆移动时处理函数所属对象
     */
    public init(moveBg:egret.Bitmap, moveFlag:egret.Bitmap, dealKeyFunc:Function, dealKeyTarget:any):void {
        this.keys = [0, 0];

        this.mouseX = -1;
        this.mouseY = -1;

        this.moveFlag = moveFlag;
        this.moveFlagX = moveFlag.x;
        this.moveFlagY = moveFlag.y;
        this.moveFlagGoX = this.moveFlagX;
        this.moveFlagGoY = this.moveFlagY;
        this.moveFlagWidthHelf = moveBg.width * 0.5;
        this.moveFlagRec = new egret.Rectangle(this.moveFlagX - moveBg.width * 0.5, this.moveFlagY - moveBg.height * 0.5, moveBg.width, moveBg.height);
        this.moveFlagCheckRec = new egret.Rectangle(0, 0, App.StageUtils.getWidth() * 0.5, App.StageUtils.getHeight());

        this.dealKeyFunc = dealKeyFunc;
        this.dealKeyTarget = dealKeyTarget;

        this.moveFlag.touchEnabled = true;
        this.moveFlag.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
        this.moveFlag.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        this.moveFlag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopEvent, this);
        App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_END, this.leaveStateEvent, this);
        App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.heroMoveEvent, this);

        //键盘控制
        App.KeyboardUtils.addKeyDown(this.onKeyDown, this);
        App.KeyboardUtils.addKeyUp(this.onKeyUp, this);
    }

    /**
     * 键盘按下处理
     * @param keyCode
     */
    private onKeyDown(keyCode:number):void {
        switch (keyCode) {
            case Keyboard.A:
                this.keys[0] = -1;
                this.startCheckKey();
                break;
            case Keyboard.D:
                this.keys[0] = 1;
                this.startCheckKey();
                break;
            case Keyboard.W:
                this.keys[1] = -1;
                this.startCheckKey();
                break;
            case Keyboard.S:
                this.keys[1] = 1;
                this.startCheckKey();
                break;
            default :
                break;
        }
    }

    /**
     * 键盘弹起处理
     * @param keyCode
     */
    private onKeyUp(keyCode:number):void {
        switch (keyCode) {
            case Keyboard.A:
                if (this.keys[0] == -1) {
                    this.keys[0] = 0;
                }
                break;
            case Keyboard.D:
                if (this.keys[0] == 1) {
                    this.keys[0] = 0;
                }
                break;
            case Keyboard.W:
                if (this.keys[1] == -1) {
                    this.keys[1] = 0;
                }
                break;
            case Keyboard.S:
                if (this.keys[1] == 1) {
                    this.keys[1] = 0;
                }
                break;
            default :
                break;
        }
    }

    /**
     * 事件拦截
     * @param e
     */
    private stopEvent(e:egret.TouchEvent):void {
        e.stopPropagation();
    }

    /**
     * 手指离开Stage事件处理
     * @param e
     */
    private leaveStateEvent(e:egret.TouchEvent):void {
        if (e.stageX == this.mouseX && e.stageY == this.mouseY) {
            this.stopMove();
        }
    }

    /**
     * 开始移动
     */
    private startMove(e:egret.TouchEvent):void {
        this.isMoveing = true;
        this.moveFlagGoX = this.moveFlagX;
        this.moveFlagGoY = this.moveFlagY;
        this.mouseX = e.stageX;
        this.mouseY = e.stageY;
    }

    /**
     * 停止移动
     */
    private stopMove():void {
        this.isMoveing = false;
        this.keys[0] = 0;
        this.keys[1] = 0;
        this.moveFlagGoX = this.moveFlagX;
        this.moveFlagGoY = this.moveFlagY;
        this.mouseX = -1;
        this.mouseY = -1;
    }

    /**
     * 复位摇杆位置
     */
    private resetRockerPos():void {
        this.moveFlag.x = this.moveFlagX;
        this.moveFlag.y = this.moveFlagY;
    }

    /**
     * 摇杆移动事件
     * @param e
     */
    private heroMoveEvent(e:egret.TouchEvent):void {
        this.runMove(e.stageX, e.stageY)
    }

    /**
     * 摇杆移动
     * @param e
     */
    private runMove(stageX:number, stageY:number):void {
        if (!this.isMoveing) {
            return;
        }

        if (!this.moveFlagCheckRec.contains(stageX, stageY)) {
            if (Math.abs(this.mouseX - stageX) > 50 || Math.abs(this.mouseY - stageY) > 50) {
                return;
            }
        }

        this.mouseX = stageX;
        this.mouseY = stageY;

        if (this.moveFlagRec.contains(this.mouseX, this.mouseY)) {
            this.moveFlagGoX = this.mouseX;
            this.moveFlagGoY = this.mouseY;
        } else {
            var radian:number = App.MathUtils.getRadian2(this.moveFlagX, this.moveFlagY, this.mouseX, this.mouseY);
            this.moveFlagGoX = this.moveFlagX + Math.cos(radian) * this.moveFlagWidthHelf;
            this.moveFlagGoY = this.moveFlagY + Math.sin(radian) * this.moveFlagWidthHelf;
        }

        if (this.moveFlagGoX > this.moveFlagX && Math.abs(this.moveFlagGoX - this.moveFlagX) > 10) {
            this.keys[0] = 1;
        } else if (this.moveFlagGoX < this.moveFlagX && Math.abs(this.moveFlagGoX - this.moveFlagX) > 10) {
            this.keys[0] = -1;
        } else {
            this.keys[0] = 0;
        }

        if (this.moveFlagGoY > this.moveFlagY && Math.abs(this.moveFlagGoY - this.moveFlagY) > 10) {
            this.keys[1] = 1;
        } else if (this.moveFlagGoY < this.moveFlagY && Math.abs(this.moveFlagGoY - this.moveFlagY) > 10) {
            this.keys[1] = -1;
        } else {
            this.keys[1] = 0;
        }

        this.startCheckKey();
    }

    /**
     * 开启检测
     */
    private startCheckKey():void {
        if (!this.checkKeying) {
            this.checkKeying = true;
            App.TimerManager.doFrame(1, 0, this.delKeys, this);
        }
    }

    /**
     * 停止检测
     */
    private stopCheckKey():void {
        this.keys[0] = 0;
        this.keys[1] = 0;
        if (this.checkKeying) {
            App.TimerManager.remove(this.delKeys, this);
            this.checkKeying = false;
        }
    }

    /**
     * 检测
     */
    private delKeys():void {
        if (this.mouseX != -1 && !this.moveFlagCheckRec.contains(this.mouseX, this.mouseY)) {
            this.stopMove();
        }

        if (this.moveFlag.x != this.moveFlagGoX) {
            this.moveFlag.x = this.moveFlagGoX;
        }

        if (this.moveFlag.y != this.moveFlagGoY) {
            this.moveFlag.y = this.moveFlagGoY;
        }

        if (!this.keys[0] && !this.keys[1]) {
            this.stopCheckKey();
        }

        if (!this.dealKeyFunc.call(this.dealKeyTarget, this.keys[0], this.keys[1])) {
            this.resetRockerPos();
        }
    }

    /**
     * 停止处理
     */
    public stop():void {
        this.stopCheckKey();
        this.stopMove();
    }
}
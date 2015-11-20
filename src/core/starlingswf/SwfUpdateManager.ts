/**
 * Created by zmliu on 14-5-11.
 */
module starlingswf {
    /** 动画更新管理器 */
    export class SwfUpdateManager {
        private _animations:starlingswf.ISwfAnimation[];

        private _addQueue:starlingswf.ISwfAnimation[];//添加队列
        private _removeQueue:starlingswf.ISwfAnimation[];//移除队列

        private _fps:number;
        private _fpsTime:number;
        private _currentTime:number;

        public static createSwfUpdateManager(fps:number):SwfUpdateManager {
            var updateManager:SwfUpdateManager = new SwfUpdateManager();
            updateManager._animations = [];
            updateManager._addQueue = [];
            updateManager._removeQueue = [];
            updateManager._currentTime = 0;
            updateManager.setFps(fps);

            App.TimerManager.doFrame(1, 0, updateManager.update, updateManager);

            return updateManager;
        }

        private clear():void {
            this._addQueue.splice(0);
            this._removeQueue.splice(0);
            this._animations.splice(0);
        }

        public stop():void {
            this.clear();
            App.TimerManager.remove(this.update, this);
        }

        public play():void {
            App.TimerManager.doFrame(1, 0, this.update, this);
        }

        public setFps(fps:number):void {
            this._fps = fps;
            this._fpsTime = 1000 / fps;
        }

        public addSwfAnimation(animation:starlingswf.ISwfAnimation):void {
            this._addQueue.push(animation);
        }

        public removeSwfAnimation(animation:starlingswf.ISwfAnimation):void {
            this._removeQueue.push(animation);
            var addIndex:number = this._addQueue.indexOf(animation);
            if (addIndex != -1) {
                this._addQueue.splice(addIndex, 1);
            }
        }

        private updateAdd():void {
            var len:number = this._addQueue.length;
            var index:number;
            var animation:ISwfAnimation;
            for (var i:number = 0; i < len; i++) {
                animation = this._addQueue.pop();
                index = this._animations.indexOf(animation);
                if (index == -1) {
                    this._animations.push(animation);
                }
            }
        }

        private updateRemove():void {
            var len:number = this._removeQueue.length;
            var index:number;
            var animation:ISwfAnimation;
            for (var i:number = 0; i < len; i++) {
                animation = this._removeQueue.pop();
                index = this._animations.indexOf(animation);
                if (index != -1) {
                    this._animations.splice(index, 1);
                }
            }
        }

        private update(time:number):void {
            this._currentTime += time;
            if (this._currentTime < this._fpsTime) {
                return;
            }
            this._currentTime -= this._fpsTime;
            this._update();

            var jumpFlag:number = 0;
            while (this._currentTime > this._fpsTime) {
                this._currentTime -= this._fpsTime;
                jumpFlag++;
                if (jumpFlag < 4) {
                    this._update();
                }
            }
        }

        private _update():void {
            this.updateRemove();
            this.updateAdd();
            var len:number = this._animations.length;
            for (var i:number = 0; i < len; i++) {
                this._animations[i].update();
            }
        }
    }
}

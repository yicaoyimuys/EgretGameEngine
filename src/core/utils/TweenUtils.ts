/**
 * Tween工具类
 */
class TweenUtils extends SingtonClass {
    public constructor() {
        super();
    }

    /**
     * 暂停所有的Tween
     */
    public pause(): void {
        let tweens = egret.Tween["_tweens"];
        for (var i = 0, l = tweens.length; i < l; i++) {
            var tween_2 = tweens[i];
            tween_2.paused = true;
        }
    }

    /**
     * 从暂停中恢复
     */
    public resume(): void {
        let tweens = egret.Tween["_tweens"];
        for (var i = 0, l = tweens.length; i < l; i++) {
            var tween_2 = tweens[i];
            tween_2.paused = false;
        }
    }
}
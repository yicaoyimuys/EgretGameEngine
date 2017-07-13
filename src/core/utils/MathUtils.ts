/**
 * Created by yangsong on 2014/11/22.
 * 数学计算工具类
 */
class MathUtils extends BaseClass {
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    public getAngle(radian:number):number {
        return 180 * radian / Math.PI;
    }

    /**
     * 角度值转换为弧度制
     * @param angle
     */
    public getRadian(angle:number):number {
        return angle / 180 * Math.PI;
    }

    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public getRadian2(p1X:number, p1Y:number, p2X:number, p2Y:number):number {
        var xdis:number = p2X - p1X;
        var ydis:number = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    }

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public getDistance(p1X:number, p1Y:number, p2X:number, p2Y:number):number {
        var disX:number = p2X - p1X;
        var disY:number = p2Y - p1Y;
        var disQ:number = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    }
}
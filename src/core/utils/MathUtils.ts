/**
 * Created by yangsong on 2014/11/22.
 * 数学计算工具类
 */
class MathUtils extends BaseClass{
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    public getAngle(radian:number):number{
        return 180 * radian / Math.PI;
    }

    /**
     * 角度值转换为弧度制
     * @param angle
     */
    public getRadian(angle:number):number{
        return Math.PI = angle / 180 * Math.PI;
    }
}
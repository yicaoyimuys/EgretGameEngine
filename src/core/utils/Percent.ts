/**
 * Created by yangsong on 2014/11/23.
 * 百分比类
 */
class Percent {
    public currentValue:number;
    public totalValue:number;

    /**
     * 构造函数
     * @param $currentValue 当前值
     * @param $totalValue 总值
     */
    public constructor($currentValue:number, $totalValue:number) {
        this.currentValue = $currentValue;
        this.totalValue = $totalValue;
    }

    /**
     * 计算当前百分比
     * @returns {number}
     */
    public computePercent():number {
        return this.currentValue / this.totalValue * 100;
    }

    /**
     * 计算当前比例
     * @returns {number}
     */
    public computeRate():number {
        return this.currentValue / this.totalValue;
    }

    /**
     * 反转
     * @returns {Percent}
     */
    public reverse():Percent {
        this.currentValue = this.totalValue - this.currentValue;
        return this;
    }

    /**
     * 复制
     * @returns {Percent}
     */
    public copy():Percent {
        return new Percent(this.currentValue, this.totalValue);
    }

    /**
     * 计算百分比反转
     * @returns {number}
     */
    public computePercentReverse():number {
        return (this.totalValue - this.currentValue) / this.totalValue * 100;
    }

    /**
     * 计算比例反转
     * @returns {number}
     */
    public computeRateReverse():number {
        return (this.totalValue - this.currentValue) / this.totalValue;
    }
}

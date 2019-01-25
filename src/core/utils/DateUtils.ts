/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
class DateUtils extends SingtonClass {
    public constructor() {
        super();
    }

    /**
     * 根据秒数格式化字符串
     * @param second 秒数
     * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00(分:秒)   4:xx天前，xx小时前，xx分钟前    6:00:00(时:分)  
     * @return
     *
     */
    public getFormatBySecond(second: number, type: number = 1): string {
        var str: string = "";
        switch (type) {
            case 1:
                str = this.getFormatBySecond1(second);
                break;
            case 2:
                str = this.getFormatBySecond2(second);
                break;
            case 3:
                str = this.getFormatBySecond3(second);
                break;
            case 4:
                str = this.getFormatBySecond4(second);
                break;
            case 5:
                str = this.getFormatBySecond5(second);
                break;
            case 6:
                str = this.getFormatBySecond6(second);
                break;
        }
        return str;
    }

    //1: 00:00:00
    private getFormatBySecond1(t: number = 0): string {
        var hourst: number = Math.floor(t / 3600);
        var hours: string;
        if (hourst == 0) {
            hours = "00";
        } else {
            if (hourst < 10)
                hours = "0" + hourst;
            else
                hours = "" + hourst;
        }
        var minst: number = Math.floor((t - hourst * 3600) / 60);
        var secondt: number = Math.floor((t - hourst * 3600) % 60);
        var mins: string;
        var sens: string;
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return hours + ":" + mins + ":" + sens;
    }

    //3:00:00(分:秒)
    private getFormatBySecond3(t: number = 0): string {
        var hourst: number = Math.floor(t / 3600);
        var minst: number = Math.floor((t - hourst * 3600) / 60);
        var secondt: number = Math.floor((t - hourst * 3600) % 60);
        var mins: string;
        var sens: string;
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return mins + ":" + sens;
    }

    //2:yyyy-mm-dd h:m:s
    private getFormatBySecond2(time: number): string {
        var date: Date = new Date(time);
        var year: number = date.getFullYear();
        var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
        var day: number = date.getDate();
        var hours: number = date.getHours();
        var minute: number = date.getMinutes();
        var second: number = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;

    }

    //4:xx天前，xx小时前，xx分钟前
    private getFormatBySecond4(time: number): string {
        var t = Math.floor(time / 3600);
        if (t > 0) {
            if (t > 24) {
                return Math.floor(t / 24) + "天前";
            }
            else {
                return t + "小时前";
            }
        }
        else {
            return Math.floor(time / 60) + "分钟前";
        }
    }

    private getFormatBySecond5(time: number): string {
        //每个时间单位所对应的秒数
        var oneDay: number = 3600 * 24;
        var oneHourst: number = 3600;
        var oneMinst: number = 60;

        var days = Math.floor(time / oneDay);
        var hourst: number = Math.floor(time % oneDay / oneHourst)
        var minst: number = Math.floor((time - hourst * oneHourst) / oneMinst)  //Math.floor(time % oneDay % oneHourst / oneMinst);
        var secondt: number = Math.floor((time - hourst * oneHourst) % oneMinst) //time;

        var dayss: string = "";
        var hourss: string = ""
        var minss: string = "";
        var secss: string = ""
        if (time > 0) {
            //天
            if (days == 0) {
                dayss = "";
                //小时
                if (hourst == 0) {
                    hourss = "";
                    //分
                    if (minst == 0) {
                        minss = "";
                        if (secondt == 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                        return secss;
                    }
                    else {
                        minss = "" + minst + "分";
                        if (secondt == 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                    }

                    return minss + secss;
                }
                else {
                    hourss = hourst + "小时";
                    if (minst == 0) {
                        minss = "";
                        if (secondt == 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                        return secss

                    } else if (minst < 10) {
                        minss = "0" + minst + "分";
                    } else {
                        minss = "" + minst + "分";
                    }

                    return hourss + minss;

                }
            }
            else {
                dayss = days + "天";
                if (hourst == 0) {
                    hourss = "";
                } else {
                    if (hourst < 10)
                        hourss = "0" + hourst + "小时";
                    else
                        hourss = "" + hourst + "小时";
                    ;
                }
                return dayss + hourss;
            }
        }
        return "";
    }

    //6:00:00(时:分) 
    private getFormatBySecond6(t: number = 0): string {
        var hourst: number = Math.floor(t / 3600);
        var minst: number = Math.floor((t - hourst * 3600) / 60);
        var houers: string;
        var mins: string;
        if (hourst == 0) {
            houers = "00";
        } else if (hourst < 10) {
            houers = "0" + hourst;
        } else {
            houers = "" + hourst;
        }
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        return houers + ":" + mins;
    }


    /**
     * 获取当前是周几
     * ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
     */
    public getDay(timestamp: number): number {
        let date = new Date(timestamp);
        return date.getDay();
    }

    /**
     * 判定两个时间是否是同一天
     */
    public isSameDate(timestamp1: number, timestamp2: number): boolean {
        let date1 = new Date(timestamp1);
        let date2 = new Date(timestamp2);
        return date1.getFullYear() == date2.getFullYear()
            && date1.getMonth() == date2.getMonth()
            && date1.getDate() == date2.getDate();
    }

    /**
     * 日期格式化
     */
    public format(d: Date, fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
        let o = {
            "M+": d.getMonth() + 1, //month
            "d+": d.getDate(),    //day
            "h+": d.getHours(),   //hour
            "m+": d.getMinutes(), //minute
            "s+": d.getSeconds(), //second
            "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
            "S": d.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,
            (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return fmt;
    }

    /**
     * 计算两个时间相差天数
     */
    public dateDifference(timestamp1: number, timestamp2: number): number {
        const d_value: number = Math.abs(timestamp2 - timestamp1);
        return Math.ceil(d_value / (24 * 60 * 60 * 1000));
    }
}
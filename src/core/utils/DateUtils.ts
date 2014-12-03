/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
class DateUtils{
    public constructor(){

    }

    /**
     * 根据秒数格式化字符串
     * @param second 秒数
     * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前
     * @return
     *
     */
    public getFormatBySecond(second:number, type:number = 1):string{
        var str:string = "";
        switch(type){
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
        }
        return str;
    }

    //1: 00:00:00
    private getFormatBySecond1(t:number = 0):string{
        var hourst : number = Math.floor(t/3600);
        var hours : string;
        if(hourst==0){
            hours = "00";
        }else{
            if(hourst<10)
                hours = "0"+hourst;
            else
                hours = ""+hourst;
        }
        var minst : number = Math.floor((t-hourst*3600)/60);
        var secondt : number = Math.floor((t-hourst*3600)%60);
        var mins : string;
        var sens:string;
        if(minst==0){
            mins = "00";
        }else if(minst<10){
            mins = "0"+minst;
        }else{
            mins=""+minst;
        }
        if(secondt==0){
            sens="00";
        }else if(secondt<10){
            sens="0"+secondt;
        }else{
            sens=""+secondt;
        }
        return hours+":"+mins+":"+sens;
    }

    //3: 00:00
    private getFormatBySecond3(t:number = 0):string{
        var hourst : number = Math.floor(t/3600);
        var minst : number = Math.floor((t-hourst*3600)/60);
        var secondt : number = Math.floor((t-hourst*3600)%60);
        var mins : string;
        var sens:string;
        if(minst==0){
            mins = "00";
        }else if(minst<10){
            mins = "0"+minst;
        }else{
            mins=""+minst;
        }
        if(secondt==0){
            sens="00";
        }else if(secondt<10){
            sens="0"+secondt;
        }else{
            sens=""+secondt;
        }
        return mins+":"+sens;
    }

    //2:yyyy-mm-dd h:m:s
    private getFormatBySecond2(time:number):string{
        var date:Date = new Date(time);
        var year:number = date.getFullYear();
        var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
        var day:number = date.getDate();
        var hours:number = date.getHours();
        var minute:number = date.getMinutes();
        var second:number = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    }

    //4:xx天前，xx小时前，xx分钟前
    private getFormatBySecond4(time:number):string {
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

}
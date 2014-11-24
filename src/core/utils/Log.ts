/**
 * Created by yangsong on 2014/11/22.
 */
class Log{
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    public static trace(message?: any, ...optionalParams: any[]):void{
        if(App.DebugUtils.isDebug){
            console.log("[DebugLog]" + message, optionalParams);
        }
    }
}
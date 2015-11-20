/**
 * Created by yangsong on 2014/12/8.
 * StringBuffer类
 */
class StringBuffer {
    private _strings:Array<string>;

    /**
     * 构造函数
     */
    public constructor() {
        this._strings = new Array<string>();
    }

    /**
     * 追加一个字符串
     * @param str
     */
    public append(str:string):void {
        this._strings.push(str);
    }

    /**
     * 转换为字符串
     * @returns {string}
     */
    public toString():string {
        return this._strings.join("");
    }

    /**
     * 清空
     */
    public clear():void {
        this._strings.length = 0;
    }
}

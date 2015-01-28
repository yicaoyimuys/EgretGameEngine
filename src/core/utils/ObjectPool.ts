/**
 * Created by yangsong on 2014/11/22.
 * 对象池类
 */
class ObjectPool{
    private static _content:any = {};
    private _objs:Array<any>;

    /**
     * 构造函数
     */
    public constructor(){
        this._objs = new Array<any>();
    }

    /**
     * 放回一个对象
     * @param obj
     */
    public pushObj(obj:any):void{
        this._objs.push(obj);
    }

    /**
     * 取出一个对象
     * @returns {*}
     */
    public popObj():any{
        if(this._objs.length > 0){
            return this._objs.pop();
        }else{
            return null;
        }
    }

    /**
     * 清除所有缓存对象
     */
    public clear():void{
        while(this._objs.length > 0){
            this._objs.pop();
        }
    }

    /**
     * 取出一个对象
     * @param ref Class
     * @return Object
     *
     */
    public static pop(ref:any, ...args:any[]):any{
        if(!ObjectPool._content[ref]){
            ObjectPool._content[ref] = [];
        }

        var list:Array<any> = ObjectPool._content[ref];
        if(list.length){
            return list.pop();
        }else{
            if(args.length == 0){
                return new ref();
            }else if(args.length == 1){
                return new ref(args[0]);
            }else if(args.length == 2){
                return new ref(args[0], args[1]);
            }else if(args.length == 3){
                return new ref(args[0], args[1], args[2]);
            }else if(args.length == 4){
                return new ref(args[0], args[1], args[2], args[3]);
            }else if(args.length == 5){
                return new ref(args[0], args[1], args[2], args[3], args[4]);
            }
        }
    }

    /**
     * 放入一个对象
     * @param obj
     *
     */
    public static push(obj:any):boolean{
        if(obj == null){
            return false;
        }

        var ref:any = obj.constructor;
        //保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
        if(!ObjectPool._content[ref]){
            return false;
        }

        ObjectPool._content[ref].push(obj);
        return true;
    }

    /**
     * 清除所有对象
     */
    public static clear():void{
        ObjectPool._content = {};
    }

    /**
     * 清除某一类对象
     * @param ref Class
     * @param clearFuncName 清除对象需要执行的函数
     */
    public static clearClass(ref:any, clearFuncName:string = null):void{
        var list:Array<any> = ObjectPool._content[ref];
        while(list && list.length){
            var obj:any = list.pop();
            if(clearFuncName){
                obj[clearFuncName]();
            }
            obj = null;
        }
        ObjectPool._content[ref] = null;
        delete ObjectPool._content[ref];
    }

    /**
     * 缓存中对象统一执行一个函数
     * @param ref Class
     * @param dealFuncName 要执行的函数名称
     */
    public static dealFunc(ref:any, dealFuncName:string):void{
        var list:Array<any> = ObjectPool._content[ref];
        if(list == null){
            return;
        }

        var i:number = 0;
        var len:number = list.length;
        for(i; i<len; i++){
            list[i][dealFuncName]();
        }
    }
}
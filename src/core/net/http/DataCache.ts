/**
 * Created by yangsong on 2014/11/22.
 * Http数据缓存类
 */
class DynamicChange {
    private _dataCache:any;

    private _pUpdate:ProxyUpdate;

    public constructor() {
        this._dataCache = [];
        this._pUpdate = new ProxyUpdate(this._dataCache);
    }

    public get pUpdate():ProxyUpdate {
        return this._pUpdate;
    }

    public getCacheData(key:string):any {
        if (this._dataCache[key]) {
            return this._dataCache[key];
        }
        return null;
    }

    public clearCache():void {
        var keys = Object.keys(this._dataCache);
        for (var i:number = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            this._dataCache[key] = null;
            delete this._dataCache[key];
        }
    }

    public getCacheKeyInfos():Array<any> {
        var results:Array<any> = [];
        var keys = Object.keys(this._dataCache);
        for (var i:number = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var k:any = this._dataCache[key];
            results.push(k);
        }
        return results;
    }

    public isCache(key:string):boolean {
        return this._dataCache[key];
    }
}

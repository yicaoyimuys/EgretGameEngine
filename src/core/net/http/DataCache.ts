/**
 * Created by yangsong on 2014/11/22.
 * Http数据缓存类
 */
class DynamicChange{
	private _dataCache:any;
	
	private _pUpdate:ProxyUpdate;
	
	public constructor(){
		this._dataCache = [];
		this._pUpdate = new ProxyUpdate(this._dataCache);
	}
	
	public get pUpdate():ProxyUpdate{
		return this._pUpdate;
	}
	
	public getCacheData(key:string):any{
		if (this._dataCache[key]){
			return this._dataCache[key];
		}
		return null;
	}
	
	public clearCache():void{
		for (var i in this._dataCache) {
			this._dataCache[i] = null;
			delete this._dataCache[i];
		}
	}
	
	public getCacheKeyInfos():Array<any>{
		var results:Array<any> = [];
		for (var i in this._dataCache){
            var k:any = this._dataCache[i];
			results.push(k);
		}
		return results;
	}
	
	public isCache(key:string):boolean{
		return this._dataCache[key];
	}
}

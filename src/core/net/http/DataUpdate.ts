/**
 * Created by yangsong on 2014/11/22.
 * Http数据更新类
 */
class ProxyUpdate {
    private _cache:any;

    public constructor(cache:any) {
        this._cache = cache;
    }

    public isArray(key:any):boolean {
        return key instanceof Array;
    }

    public isObject(key:string):boolean {
        return key.indexOf("object") > -1;
    }

    public isNormal(key:string):boolean {
        var isAt:boolean = key.indexOf("@") > -1;
        var isDot:boolean = key.indexOf(".") > -1;
        var isUnderline:boolean = key.indexOf("_") > -1;

        return (!isAt && !isDot && !isUnderline);
    }

    public isAddToArray(key:string):boolean {
        return (key == "@a");
    }

    public isRemoveToArray(key:string):boolean {
        var arr:Array<any> = key.split("_");
        return (arr.length <= 3 && arr[0] == "@d");
    }

    public isFilter(key:string):boolean {
        var arr:Array<any> = key.split("_");
        return (arr[0] == "@f");
    }

    public isNumeric(v:string):boolean {
        return parseFloat(v).toString() == v.toString();
    }

    private _updateObject(name:string, value:any, cacheData:any):void {
        var arr:Array<any> = name.split(".");
        if (arr[0] == "@a" || arr[0] == "@s") {
            cacheData[arr[1]] = value;
        }
        else if (arr[0] == "@d") {
            delete cacheData[arr[1]];
        }
    }

    private _getFilterObject(filter:string, cacheData:any):any {
        if (cacheData) {
            var arr:Array<any> = filter.split("_");
            if (arr.length == 3 && arr[0] == "@f" && this.isArray(cacheData)) {
                var key:any = arr[1];
                var value:any = arr[2];

                for (var i:number = 0; i < cacheData.length; i++) {
                    var v:any = cacheData[i];
                    if (arr.length == 3 && this.isObject(v.toString())) {
                        var cacheValue:any = v[key];
                        if (cacheValue) {
                            if (value[0] == "@") {
                                value = value.replace("@", "");
                            }
                            if (value == cacheValue) {
                                return v;
                            }
                        }
                    }
                }

            }
        }
        return null;

    }

    private _addObjectToArray(cacheData:any, changeValue:any):void {
        if (this.isArray(changeValue)) {
            for (var i:number = 0; i < changeValue.length; i++) {
                cacheData.push(changeValue[i]);
            }
        }
        else {
            cacheData.push(changeValue);
        }
    }

    private _removeObjectFromArray(cacheData:any, key:string, changeValue:any):void {
        var arr:Array<any> = key.split("_");
        if (arr.length <= 3 && arr[0] == "@d") {
            if (this.isArray(cacheData)) {
                var count:number = cacheData.length;
                for (var i:number = count - 1; i >= 0; i--) {
                    var cacheDataItem:any = cacheData[i];
                    if (arr.length == 3) {
                        if (cacheDataItem.hasOwnProperty(arr[1])) {
                            var val:any = arr[2];
                            if (val[0] == "@") {
                                val = val.replace("@", "");
                            }
                            if (val == cacheDataItem[arr[1]]) {
                                cacheData.splice(i, 1);
                            }
                        }
                    }
                    else if (arr.length == 2 && cacheDataItem.hasOwnProperty(arr[1])) {
                        if (changeValue == cacheDataItem[arr[1]]) {
                            cacheData.splice(i, 1);
                        }
                    }
                    else if (arr.length == 1) {
                        if (changeValue == cacheDataItem) {
                            cacheData.splice(i, 1);
                        }
                    }
                }
            }
        }
    }

    public update(key:string, data:any):void {
        this._cache[key] = data;

        if (data.hasOwnProperty("c")) {
            var cdata:any = data["c"];
            var keys = Object.keys(cdata);
            for (var i:number = 0, len = keys.length; i < len; i++) {
                var k1 = keys[i];
                if (this._cache[k1]) {
                    this._update(this._cache[k1], cdata[k1]);
                    App.MessageCenter.dispatch(k1 + "_HttpUpdate");
                }
            }
        }
    }

    private _update(cacheData:any, changeData:any):void {
        if (cacheData && changeData && this.isObject(changeData.toString())) {
            var keys = Object.keys(changeData);
            for (var i:number = 0, len = keys.length; i < len; i++) {
                var k = keys[i];
                var v:any = changeData[k];
                if (this.isNormal(k) && this.isObject(v.toString())) {
                    if (cacheData.hasOwnProperty(k)) {
                        this._update(cacheData[k], v);
                    }
                }
                else if (this.isNormal(k) && this.isNumeric(v)) {
                    var cv:any = cacheData[k];
                    cacheData[k] = cv + v;
                }
                else if (this.isNormal(k)) {
                    cacheData[k] = v;
                }
                else if (this.isAddToArray(k)) {
                    this._addObjectToArray(cacheData, v);
                }
                else if (this.isRemoveToArray(k)) {
                    this._removeObjectFromArray(cacheData, k, v);
                }
                else if (this.isFilter(k)) {
                    var subCacheData:any = this._getFilterObject(k, cacheData);
                    if (subCacheData) {
                        this._update(subCacheData, v);
                    }
                }
                else {
                    this._updateObject(k, v, cacheData);
                }
            }
        }
    }

}

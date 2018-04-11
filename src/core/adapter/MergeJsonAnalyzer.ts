// /**
//  * Created by yangsong on 15-11-4.
//  * 合并过的json文件解析
//  */
// class MergeJsonAnalyzer extends RES.JsonAnalyzer {
//     //按名字指定要特殊处理的json数据
//     private mergeJsons:Array<string> = ["MergeConfig_json"];

//     /**
//      * 解析并缓存加载成功的数据
//      */
//     public analyzeData(resItem:RES.ResourceItem, data:any):void {
//         var name:string = resItem.name;
//         if (this.fileDic[name] || !data) {
//             return;
//         }
//         try {
//             var jsonData:any = JSON.parse(<string> data);
//             if (this.mergeJsons.indexOf(name) != -1) {
//                 for (var key in jsonData) {
//                     this.fileDic[key] = jsonData[key];
//                 }
//             }
//             else {
//                 this.fileDic[name] = jsonData;
//             }
//         }
//         catch (e) {
//             egret.$warn(1017, resItem.url, data);
//         }
//     }
// }
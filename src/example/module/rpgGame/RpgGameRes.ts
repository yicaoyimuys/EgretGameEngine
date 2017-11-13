/**
 * Created by yangsong on 2017/10/18.
 */
class RpgGameRes {
    private static ComplateResList: any = {};
    private static LoadingResList: any = {};

    public static clearAvatar(avatarResName: string): void {
        var groupName = "avatarGroup_" + avatarResName;

        if (this.LoadingResList[groupName]) {
            this.LoadingResList[groupName] = null;
            delete this.LoadingResList[groupName];
        }

        if (this.ComplateResList[groupName]) {
            this.ComplateResList[groupName] = null;
            delete this.ComplateResList[groupName];
        }

        RES.destroyRes(groupName);
    }

    public static loadAvatar(avatarResPath: string, avatarResName: string, onLoadComplate: Function, onLoadComplateTarget: any): void {
        var groupName = "avatarGroup_" + avatarResName;
        if (this.ComplateResList[groupName]) {
            onLoadComplate.call(onLoadComplateTarget);
        }
        else if (this.LoadingResList[groupName]) {
            this.LoadingResList[groupName].push([onLoadComplate, onLoadComplateTarget]);
        }
        else {
            this.LoadingResList[groupName] = [];
            this.LoadingResList[groupName].push([onLoadComplate, onLoadComplateTarget]);

            var avatarResKeys: string[] = [];
            [
                {
                    name: avatarResName + ".json",
                    type: "json"
                },
                {
                    name: avatarResName + ".png",
                    type: "image"
                }
            ].forEach(function (res: any) {
                var resKey: string = "avatar_" + res.name;
                avatarResKeys.push(resKey);
                App.ResourceUtils.createResource(resKey, res.type, avatarResPath + res.name);
            });

            App.ResourceUtils.createGroup(groupName, avatarResKeys);
            App.ResourceUtils.loadGroup(groupName, this.onLoadGroupComplate, this.onLoadGroupProgress, this);
        }
    }

    private static onLoadGroupComplate(groupName: string): void {
        var callBacks = this.LoadingResList[groupName];
        callBacks.forEach(function (arr) {
            arr[0].call(arr[1]);
        })

        this.LoadingResList[groupName] = null;
        delete this.LoadingResList[groupName];

        this.ComplateResList[groupName] = 1;
    }

    private static onLoadGroupProgress(groupName: string): void {

    }
}
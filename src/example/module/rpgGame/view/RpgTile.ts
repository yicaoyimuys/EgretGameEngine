/**
 * Created by yangsong on 2017/10/11.
 */
class RpgTile extends egret.Bitmap {
    public col: number;
    public row: number;
    private tileResKey: string;

    public constructor() {
        super();
    }

    public init(mapId: number, col: number, row: number) {
        this.col = col;
        this.row = row;
        this.x = this.col * RpgGameData.GameTileWidth;
        this.y = this.row * RpgGameData.GameTileHeight;

        var tileResName: string = row + "_" + col + ".jpg";
        var tileResPath: string = "resource/assets/rpgGame/map/" + mapId + "/" + tileResName;
        this.tileResKey = "map_" + mapId + "_" + tileResName;

        //异步加载
        App.ResourceUtils.createResource(this.tileResKey, "image", tileResPath);
        RES.getResAsync(this.tileResKey, function (img: egret.Texture) {
            this.texture = img;
        }, this);
    }

    public destory(): void {
        App.DisplayUtils.removeFromParent(this);
        RES.destroyRes(this.tileResKey);
        this.texture = null;
    }
}
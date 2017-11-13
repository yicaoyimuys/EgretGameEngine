/**
 * Created by yangsong on 2017/10/11.
 */
class RpgBackground extends egret.DisplayObjectContainer {
    private mapId: number;
    private miniBg: egret.Bitmap;
    private tiles: RpgTiles;
    public mapWidth:number;
    public mapHeight:number;

    public constructor() {
        super();
    }

    public init(mapId: number) {
        this.mapId = mapId;

        var mapData: any = RES.getRes("map_" + mapId + "_data.json");
        this.mapWidth = mapData.width;
        this.mapHeight = mapData.height;

        this.miniBg = new egret.Bitmap();
        this.miniBg.texture = RES.getRes("map_" + mapId + "_mini.jpg");
        this.miniBg.width = this.mapWidth;
        this.miniBg.height = this.mapHeight;
        this.addChild(this.miniBg);

        this.tiles = new RpgTiles();
        this.tiles.init(mapId);
        this.addChild(this.tiles);
    }

    public updateCameraPos($x: number, $y: number): void {
        this.tiles.updateCameraPos($x, $y);
    }
}
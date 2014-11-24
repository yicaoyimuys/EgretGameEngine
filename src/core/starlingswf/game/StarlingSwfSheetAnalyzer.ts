/**
 * StarlingSwfSpriteSheet解析器
 * 在最新版本的StarlingSwf中已经不需要了
 */
module starlingswf {
    export class StarlingSwfSheetAnalyzer extends RES.SheetAnalyzer {
        public parseSpriteSheet(texture:egret.Texture, data:any):egret.SpriteSheet {
            var frames:any = data.frames;
            if (!frames) {
                return;
            }
            var spriteSheet:egret.SpriteSheet = new egret.SpriteSheet(texture);
            for (var name in frames) {
                var config:any = frames[name];
                spriteSheet.createTexture(name, config.x, config.y, config.w, config.h, -config.offX, -config.offY);
            }
            return spriteSheet;
        }
    }
}
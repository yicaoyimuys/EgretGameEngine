/**
 * Created by zmliu on 14-5-11.
 */
module starlingswf {
    /**
     * swf资源管理器
     * */
    export class SwfAssetManager {

        private _sheets:Object;
        private _textures:Object;

        constructor() {
            this._sheets = {};
            this._textures = {};
        }

        public addSpriteSheet(name:string, spriteSheep:egret.SpriteSheet) {
            this._sheets[name] = spriteSheep;
        }

        public addTexture(name:string, texture:egret.Texture):void {
            this._textures[name] = texture;
        }

        public createBitmap(name:string):egret.Bitmap {
            var texture:egret.Texture = this.getTexture(name);
            if (texture == null)
                return null;

            var bitmap:egret.Bitmap = new egret.Bitmap();
            bitmap.texture = texture;
            return bitmap;
        }

        public getTexture(name):egret.Texture {
            var texture:egret.Texture;
            var sheet:egret.SpriteSheet;
            var key:string;
            for (key in this._sheets) {
                sheet = this._sheets[key];
                texture = sheet.getTexture(name);
                if (texture != null)
                    break;
            }
            if (texture == null)
                texture = this._textures[name];
            return texture;
        }
    }
}
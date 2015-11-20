/**
 * Created by zmliu on 14-5-11.
 */
module starlingswf {
    /**Sprite*/
    export class SwfSprite extends egret.DisplayObjectContainer {
        public getTextField(name:string):egret.TextField {
            return <egret.TextField>this.getChildByName(name);
        }

        public getMovie(name:string):starlingswf.SwfMovieClip {
            return <starlingswf.SwfMovieClip>this.getChildByName(name);
        }

        public getSprite(name:string):starlingswf.SwfSprite {
            return <starlingswf.SwfSprite>this.getChildByName(name);
        }

        public getImage(name:string):egret.Bitmap {
            return <egret.Bitmap>this.getChildByName(name);
        }
    }
}
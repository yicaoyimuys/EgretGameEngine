/**
 * Created by yangsong on 2017/10/12.
 */
class RpgGameUtils {
    private static _convertUsePoint: egret.Point = new egret.Point();

    public static convertCellToXY(col: number, row: number): egret.Point {
        this._convertUsePoint.x = col * RpgGameData.GameCellWidth + RpgGameData.GameCellWidth * 0.5;
        this._convertUsePoint.y = row * RpgGameData.GameCellHeight + RpgGameData.GameCellHeight * 0.5;
        return this._convertUsePoint;
    }

    public static convertXYToCell(x: number, y: number): egret.Point {
        this._convertUsePoint.x = Math.floor(x / RpgGameData.GameCellWidth);
        this._convertUsePoint.y = Math.floor(y / RpgGameData.GameCellHeight);
        return this._convertUsePoint;
    }

    public static convertXYToAoi(x: number, y: number): egret.Point {
        this._convertUsePoint.x = Math.floor(x / RpgGameData.GameAoiWidth);
        this._convertUsePoint.y = Math.floor(y / RpgGameData.GameAoiHeight);
        return this._convertUsePoint;
    }

    public static computeGameObjDir(currX: number, currY: number, gotoX: number, gotoY: number): Dir {
        var radian: number = App.MathUtils.getRadian2(currX, currY, gotoX, gotoY);

        var angle: number = App.MathUtils.getAngle(radian);
        var dir: Dir;
        if (angle == 0) {
            dir = Dir.Right;
        }
        else if (angle == 90) {
            dir = Dir.Bottom;
        }
        else if (angle == 180) {
            dir = Dir.Left;
        }
        else if (angle == -90) {
            dir = Dir.Top;
        }
        else if (angle > 0 && angle < 90) {
            dir = Dir.BottomRight;
        }
        else if (angle > 90 && angle < 180) {
            dir = Dir.BottomLeft;
        }
        else if (angle > -180 && angle < -90) {
            dir = Dir.TopLeft;
        }
        else if (angle > -90 && angle < 0) {
            dir = Dir.TopRight;
        }
        return dir;
    }
}
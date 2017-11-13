/**
 * Created by yangsong on 2017/10/11.
 */
class RpgGameModel extends BaseModel {
    public mapId: number;
    public playerData: any;
    public monsterNum: number;

    public constructor($controller: BaseController) {
        super($controller)
    }
}
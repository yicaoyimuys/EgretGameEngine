/**
 * Created by yangsong on 2017/10/13.
 */
class RpgMonster extends RpgGameObject {
    public constructor() {
        super();
    }

    public init(data: any): void {
        super.init(data);

        this.addComponent(ComponentType.Aoi);
        this.addComponent(ComponentType.Ai);
        this.addComponent(ComponentType.Move);
    }

    public setInCamera(value: boolean) {
        super.setInCamera(value);
        if(value){
            this.addComponent(ComponentType.Avatar);
            this.addComponent(ComponentType.Battle);
        } else {
            this.removeComponent(ComponentType.Avatar);
            this.removeComponent(ComponentType.Battle);
        }
    }

    public destory(): void {
        super.destory();
    }
}
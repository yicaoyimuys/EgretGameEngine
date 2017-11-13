/**
 * Created by yangsong on 2017/10/11.
 */
class RpgGameObject {
    private _components: any;

    public id: number;
    public x: number;
    public y: number;
    public col: number;
    public row: number;
    public mcName: string;
    public mcPath: string;
    public skillPath: string;
    public gameView: RpgGameView;
    public speed: number;
    public dir: Dir;
    public pathChange: boolean;
    public action: string;
    public propertyData: any;
    public battleObj: RpgGameObject;

    private _inCamera: boolean;
    private _path: PathNode[];

    public constructor() {
        this._components = {};
    }

    public init(data: any): void {
        this.id = data.id;
        this.col = data.col;
        this.row = data.row;
        this.gameView = data.gameView;
        this.mcPath = data.mcPath;
        this.mcName = data.mcName;
        this.skillPath = data.skillPath;
        this.speed = data.speed || RpgGameData.WalkSpeed;
        this.dir = data.dir || Dir.Bottom;
        this.propertyData = data.propertyData;

        var p: egret.Point = RpgGameUtils.convertCellToXY(this.col, this.row);
        this.x = p.x;
        this.y = p.y;
        this.action = Action.Stand;
    }

    public destory(): void {
        var componentNames: string[] = Object.keys(this._components);
        while (componentNames.length) {
            var componentName: string = componentNames[0];
            this.removeComponent(componentName);

            componentNames = Object.keys(this._components);
        }

        this._path = null;
        this.gameView = null;
        this.battleObj = null;
        this.propertyData = null;
    }

    public addComponent(componentName: string): void {
        if (this._components[componentName]) {
            return;
        }

        var component: Component = ObjectPool.pop(componentName);
        component.type = componentName;
        component.entity = this;
        component.start();

        ComponentSystem.addComponent(component);

        this._components[componentName] = component;
    }

    public removeComponent(componentName: string): void {
        var component: Component = this._components[componentName];
        if (!component) {
            return;
        }

        ComponentSystem.removeComponent(component);

        component.stop();
        ObjectPool.push(component);

        this._components[componentName] = null;
        delete this._components[componentName];
    }

    public getComponent(componentName: string): Component {
        var hasComponent: Component = this._components[componentName];
        return hasComponent;
    }

    public get path(): PathNode[] {
        return this._path;
    }

    public set path(value: PathNode[]) {
        this._path = value;
        this.pathChange = true;
        if (this._path) {
            this.action = Action.Move;
        } else {
            this.action = Action.Stand;
        }
    }

    public setInCamera(value: boolean) {
        this._inCamera = value;
    }

    public getInCamera(): boolean {
        return this._inCamera;
    }
}
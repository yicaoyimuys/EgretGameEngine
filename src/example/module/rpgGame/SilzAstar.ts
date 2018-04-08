class SilzAstar {

    /**
     * 寻路方式，8方向和4方向，有效值为8和4
     */
    private WorkMode: number = 8;

    private _grid: Grid;
    private _path: PathNode[];
    private _astar: AStar;

    /**
     * @param    mapdata        地图数据
     */
    public constructor(mapdata: number[][]) {
        this.makeGrid(mapdata);
    }

    /**
     * @param        xnow    当前坐标X(世界坐标)
     * @param        ynow    当前坐标Y(世界坐标)
     * @param        xpos    目标点X(世界坐标)
     * @param        ypos    目标点Y(世界坐标)
     */
    public find(xnow: number, ynow: number, xpos: number, ypos: number): PathNode[] {
        xpos = Math.floor(xpos / RpgGameData.GameCellWidth);
        ypos = Math.floor(ypos / RpgGameData.GameCellHeight);
        xpos = Math.min(xpos, this._grid.numCols - 1);
        ypos = Math.min(ypos, this._grid.numRows - 1);
        this._grid.setEndNode(xpos, ypos); //1

        xnow = Math.floor(xnow / RpgGameData.GameCellWidth);
        ynow = Math.floor(ynow / RpgGameData.GameCellHeight);
        this._grid.setStartNode(xnow, ynow); //2

        var time: number = egret.getTimer();

        if (this._astar.findPath()) { //3
            // this._astar.floyd();
            // this._path = this._astar.floydPath;
            this._path = this._astar.path;

            // time = egret.getTimer() - time;
            // console.log("[SilzAstar]", time + "ms   length:" + this._astar.path.length);

            return this._path;
        } else {
            this._grid.setEndNode(xpos - 1, ypos - 1);
            time = egret.getTimer() - time;
            console.log("[SilzAstar]", time + "ms 找不到");
        }

        return null;
    }

    private makeGrid(data: number[][]): void {
        var rows: number = data.length;
        var cols: number = data[0].length;
        this._grid = new Grid(cols, rows);

        var px: number;
        var py: number;

        for (py = 0; py < rows; py++) {
            for (px = 0; px < cols; px++) {
                this._grid.setWalkable(px, py, data[py][px] == 1);
            }
        }

        if (this.WorkMode == 4)
            this._grid.calculateLinks(1);
        else
            this._grid.calculateLinks();

        this._astar = new AStar(this._grid);
    }
}

class AStar {
    private _open: BinaryHeap;
    private _grid: Grid;
    private _endNode: PathNode;
    private _startNode: PathNode;
    private _path: PathNode[];
    private _floydPath: PathNode[];
    private _straightCost: number = 1.0;
    private _diagCost: number = Math.SQRT2;
    private _nowversion: number = 1;
    private _heuristic: Function;


    public constructor(grid: Grid) {
        this._grid = grid;
        this._heuristic = this.manhattan;
    }

    private justMin(x: any, y: any): boolean {
        return x.f < y.f;
    }

    public findPath(): boolean {
        this._endNode = this._grid.endNode;
        this._nowversion++;
        this._startNode = this._grid.startNode;
        this._open = new BinaryHeap(this.justMin);
        this._startNode.g = 0;
        return this.search();
    }

    public floyd(): void {
        if (this.path == null)
            return;
        this._floydPath = this.path.concat();
        var len: number = this._floydPath.length;
        if (len > 2) {
            var vector: PathNode = new PathNode(0, 0);
            var tempVector: PathNode = new PathNode(0, 0);
            this.floydVector(vector, this._floydPath[len - 1], this._floydPath[len - 2]);
            for (var i: number = this._floydPath.length - 3; i >= 0; i--) {
                this.floydVector(tempVector, this._floydPath[i + 1], this._floydPath[i]);
                if (vector.x == tempVector.x && vector.y == tempVector.y) {
                    this._floydPath.splice(i + 1, 1);
                } else {
                    vector.x = tempVector.x;
                    vector.y = tempVector.y;
                }
            }
        }
        len = this._floydPath.length;
        for (i = len - 1; i >= 0; i--) {
            for (var j: number = 0; j <= i - 2; j++) {
                if (this.floydCrossAble(this._floydPath[i], this._floydPath[j])) {
                    for (var k: number = i - 1; k > j; k--) {
                        this._floydPath.splice(k, 1);
                    }
                    i = j;
                    len = this._floydPath.length;
                    break;
                }
            }
        }
    }

    private floydCrossAble(n1: PathNode, n2: PathNode): boolean {
        var ps: egret.Point[] = this.bresenhamNodes(new egret.Point(n1.x, n1.y), new egret.Point(n2.x, n2.y));
        for (var i: number = ps.length - 2; i > 0; i--) {
            if (!this._grid.getNode(ps[i].x, ps[i].y).walkable) {
                return false;
            }
        }
        return true;
    }

    private bresenhamNodes(p1: egret.Point, p2: egret.Point): egret.Point[] {
        var steep: boolean = Math.abs(p2.y - p1.y) > Math.abs(p2.x - p1.x);
        if (steep) {
            var temp: number = p1.x;
            p1.x = p1.y;
            p1.y = temp;
            temp = p2.x;
            p2.x = p2.y;
            p2.y = temp;
        }
        var stepX: number = p2.x > p1.x ? 1 : (p2.x < p1.x ? -1 : 0);
        var stepY: number = p2.y > p1.y ? 1 : (p2.y < p1.y ? -1 : 0);
        var deltay: number = (p2.y - p1.y) / Math.abs(p2.x - p1.x);
        var ret: egret.Point[] = [];
        var nowX: number = p1.x + stepX;
        var nowY: number = p1.y + deltay;
        if (steep) {
            ret.push(new egret.Point(p1.y, p1.x));
        } else {
            ret.push(new egret.Point(p1.x, p1.y));
        }
        while (nowX != p2.x) {
            var fy: number = Math.floor(nowY)
            var cy: number = Math.ceil(nowY);
            if (steep) {
                ret.push(new egret.Point(fy, nowX));
            } else {
                ret.push(new egret.Point(nowX, fy));
            }
            if (fy != cy) {
                if (steep) {
                    ret.push(new egret.Point(cy, nowX));
                } else {
                    ret.push(new egret.Point(nowX, cy));
                }
            }
            nowX += stepX;
            nowY += deltay;
        }
        if (steep) {
            ret.push(new egret.Point(p2.y, p2.x));
        } else {
            ret.push(new egret.Point(p2.x, p2.y));
        }
        return ret;
    }

    private floydVector(target: PathNode, n1: PathNode, n2: PathNode): void {
        target.x = n1.x - n2.x;
        target.y = n1.y - n2.y;
    }

    public search(): boolean {
        var node: PathNode = this._startNode;
        node.version = this._nowversion;
        while (node != this._endNode) {
            var len: number = node.links.length;
            for (var i: number = 0; i < len; i++) {
                var test: PathNode = node.links[i].node;
                if(!test.walkable){
                    continue;
                }
                var cost: number = node.links[i].cost;
                var g: number = node.g + cost;
                var h: number = this._heuristic(test);
                var f: number = g + h;
                if (test.version == this._nowversion) {
                    if (test.f > f) {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                    }
                } else {
                    test.f = f;
                    test.g = g;
                    test.h = h;
                    test.parent = node;
                    this._open.ins(test);
                    test.version = this._nowversion;
                }

            }
            if (this._open.a.length == 1) {
                return false;
            }
            node = this._open.pop();
        }
        this.buildPath();
        return true;
    }

    private buildPath(): void {
        this._path = [];
        var node: PathNode = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    }

    public get path(): PathNode[] {
        return this._path;
    }

    public get floydPath(): PathNode[] {
        return this._floydPath;
    }

    public manhattan(node: PathNode): number {
        return Math.abs(node.x - this._endNode.x) + Math.abs(node.y - this._endNode.y);
    }

    public manhattan2(node: PathNode): number {
        var dx: number = Math.abs(node.x - this._endNode.x);
        var dy: number = Math.abs(node.y - this._endNode.y);
        return dx + dy + Math.abs(dx - dy) / 1000;
    }

    public euclidian(node: PathNode): number {
        var dx: number = node.x - this._endNode.x;
        var dy: number = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private TwoOneTwoZero: number = 2 * Math.cos(Math.PI / 3);

    public chineseCheckersEuclidian2(node: PathNode): number {
        var y: number = node.y / this.TwoOneTwoZero;
        var x: number = node.x + node.y / 2;
        var dx: number = x - this._endNode.x - this._endNode.y / 2;
        var dy: number = y - this._endNode.y / this.TwoOneTwoZero;
        return this.sqrt(dx * dx + dy * dy);
    }

    private sqrt(x: number): number {
        return Math.sqrt(x);
    }

    public euclidian2(node: PathNode): number {
        var dx: number = node.x - this._endNode.x;
        var dy: number = node.y - this._endNode.y;
        return dx * dx + dy * dy;
    }

    public diagonal(node: PathNode): number {
        var dx: number = Math.abs(node.x - this._endNode.x);
        var dy: number = Math.abs(node.y - this._endNode.y);
        var diag: number = Math.min(dx, dy);
        var straight: number = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    }
}

class BinaryHeap {
    public a: any[] = [];

    public justMinFun = function (x: any, y: any): boolean {
        return x < y;
    };

    public constructor(justMinFun = null) {
        this.a.push(-1);
        if (justMinFun != null) {
            this.justMinFun = justMinFun;
        }
    }

    public ins(value: any): void {
        var p: number = this.a.length;
        this.a[p] = value;
        var pp: number = p >> 1;
        while (p > 1 && this.justMinFun(this.a[p], this.a[pp])) {
            var temp: any = this.a[p];
            this.a[p] = this.a[pp];
            this.a[pp] = temp;
            p = pp;
            pp = p >> 1;
        }
    }

    public pop(): any {
        var min: any = this.a[1];
        this.a[1] = this.a[this.a.length - 1];
        this.a.pop();
        var p: number = 1;
        var l: number = this.a.length;
        var sp1: number = p << 1;
        var sp2: number = sp1 + 1;
        while (sp1 < l) {
            if (sp2 < l) {
                var minp: number = this.justMinFun(this.a[sp2], this.a[sp1]) ? sp2 : sp1;
            } else {
                minp = sp1;
            }
            if (this.justMinFun(this.a[minp], this.a[p])) {
                var temp: any = this.a[p];
                this.a[p] = this.a[minp];
                this.a[minp] = temp;
                p = minp;
                sp1 = p << 1;
                sp2 = sp1 + 1;
            } else {
                break;
            }
        }
        return min;
    }
}

class Grid {

    private _startNode: PathNode;
    private _endNode: PathNode;
    private _nodes: PathNode[][];
    private _numCols: number;
    private _numRows: number;

    private type: number;

    private _straightCost: number = 1.0;
    private _diagCost: number = Math.SQRT2;

    public constructor(numCols: number, numRows: number) {
        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = [];

        for (var i: number = 0; i < this._numCols; i++) {
            this._nodes[i] = [];
            for (var j: number = 0; j < this._numRows; j++) {
                this._nodes[i][j] = new PathNode(i, j);
            }
        }
    }

    /**
     *
     * @param   type    0八方向 1四方向 2跳棋
     */
    public calculateLinks(type: number = 0): void {
        this.type = type;
        for (var i: number = 0; i < this._numCols; i++) {
            for (var j: number = 0; j < this._numRows; j++) {
                this.initNodeLink(this._nodes[i][j], type);
            }
        }
    }

    public getType(): number {
        return this.type;
    }

    /**
     *
     * @param   node
     * @param   type    0八方向 1四方向 2跳棋
     */
    private initNodeLink(node: PathNode, type: number): void {
        var startX: number = Math.max(0, node.x - 1);
        var endX: number = Math.min(this.numCols - 1, node.x + 1);
        var startY: number = Math.max(0, node.y - 1);
        var endY: number = Math.min(this.numRows - 1, node.y + 1);
        node.links = [];
        for (var i: number = startX; i <= endX; i++) {
            for (var j: number = startY; j <= endY; j++) {
                var test: PathNode = this.getNode(i, j);
                if (test == node || !test.walkable) {
                    continue;
                }
                if (type != 2 && i != node.x && j != node.y) {
                    var test2: PathNode = this.getNode(node.x, j);
                    if (!test2.walkable) {
                        continue;
                    }
                    test2 = this.getNode(i, node.y);
                    if (!test2.walkable) {
                        continue;
                    }
                }
                var cost: number = this._straightCost;
                if (!((node.x == test.x) || (node.y == test.y))) {
                    if (type == 1) {
                        continue;
                    }
                    if (type == 2 && (node.x - test.x) * (node.y - test.y) == 1) {
                        continue;
                    }
                    if (type == 2) {
                        cost = this._straightCost;
                    } else {
                        cost = this._diagCost;
                    }
                }
                node.links.push(new Link(test, cost));
            }
        }
    }

    public getNode(x: number, y: number): PathNode {
        return this._nodes[x][y];
    }

    public setEndNode(x: number, y: number): void {
        this._endNode = this._nodes[x][y];
    }

    public setStartNode(x: number, y: number): void {
        this._startNode = this._nodes[x][y];
    }

    public setWalkable(x: number, y: number, value: boolean): void {
        this._nodes[x][y].walkable = value;
    }

    public get endNode(): PathNode {
        return this._endNode;
    }

    public get numCols(): number {
        return this._numCols;
    }

    public get numRows(): number {
        return this._numRows;
    }

    public get startNode(): PathNode {
        return this._startNode;
    }

}

class Link {
    public node: PathNode;
    public cost: number;

    public constructor(node: PathNode, cost: number) {
        this.node = node;
        this.cost = cost;
    }
}

class PathNode {
    public x: number;
    public y: number;
    public f: number;
    public g: number;
    public h: number;
    public walkable: boolean = true;
    public parent: PathNode;
    //public costMultiplier:number = 1.0;
    public version: number = 1;
    public links: Link[];

    //public index:number;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public toString(): String {
        return "x:" + this.x + " y:" + this.y;
    }
}

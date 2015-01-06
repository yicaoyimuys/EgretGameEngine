/**
 * Created by yangsong on 2014/11/23.
 * 服务端返回消息处理
 */
class MessageCenter extends BaseClass{
	private dict:any;
	private eVec:Array<MessageVo>;
	private lastRunTime:number;
	
	public constructor(){
        super();
		this.dict = {};
		this.eVec = new Array<MessageVo>();
        this.lastRunTime = 0;
	}
	
	/**
	 * 添加消息监听 
	 * @param type 消息唯一标识
	 * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
	 * 
	 */	
	public addListener(type:string, listener:Function, listenerObj:any):void{
		var arr:Array<any> = this.dict[type];
		if(arr == null){
			arr = new Array<any>();
			this.dict[type] = arr;
		}

        //检测是否已经存在
        var i:number = 0;
        var len:number = arr.length;
        for(i; i<len; i++){
            if(arr[i][0] == listener && arr[i][1] == listenerObj){
                return;
            }
        }

		arr.push([listener, listenerObj]);
	}
	
	/**
	 * 移除消息监听 
	 * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
	 */		
	public removeListener(type:string, listener:Function, listenerObj:any):void{
		var arr:Array<any> = this.dict[type];
		if(arr == null){
            return;
        }

        var i:number = 0;
        var len:number = arr.length;
        for(i; i<len; i++){
            if(arr[i][0] == listener && arr[i][1] == listenerObj){
                arr.splice(i, 1);
                break;
            }
        }

		if(arr.length == 0){
			this.dict[type] = null;
			delete this.dict[type];
		}
	}
	
	/**
	 * 触发消息 
	 * @param type 消息唯一标识
	 * @param param 消息参数
	 * 
	 */		
	public dispatch(type:string, ...param:any[]):void{
		if(this.dict[type] == null){
            return;
        }
		
		var vo:MessageVo = ObjectPool.pop(MessageVo);
		vo.type = type;
		vo.param = param;
		this.eVec.push(vo);
	}
	
	/**
	 * 运行 
	 * 
	 */		
	public run():void{
		var currTime:number = egret.getTimer();
		var inSleep:boolean = currTime - this.lastRunTime>100;
		this.lastRunTime = currTime;
		if(inSleep){
			while(this.eVec.length > 0){
                this.dealMsg(this.eVec.shift());
			}
		}else{
			while(this.eVec.length > 0){
                this.dealMsg(this.eVec.shift());
				if((egret.getTimer() - currTime)>5){
                    break;
                }
			}
		}			
	}

    /**
     * 处理一条消息
     * @param msgVo
     */
    private dealMsg(msgVo:MessageVo):void{
        var listeners:Array<any> = this.dict[msgVo.type];
        var i:number = 0;
        var len:number = listeners.length;
        var listener:Array<any> = null;
        while(i < len){
            listener = listeners[i];
            listener[0].apply(listener[1], msgVo.param);
            i++;
        }
        msgVo.dispose();
        ObjectPool.push(msgVo);
    }
}

class MessageVo{
	public type:string;
	public param:any[];
	
	public constructor(){
	}
	
	public dispose():void{
		this.type = null
		this.param = null;
	}
}
EgretGameEngine
===============

Egret游戏开发使用框架，便于快速开发，以及各项目组开发统一规范

1:MVC模块

2:Net网络请求模块

3:Utils工具类模块

目录结构
===============

src
│  Main.ts
│  
├─core
│  │  App.ts
│  │  
│  ├─mvc
│  │  │  ControllerManager.ts
│  │  │  ViewManager.ts
│  │  │  
│  │  ├─controller
│  │  │      BaseController.ts
│  │  │      
│  │  ├─proxy
│  │  │      BaseProxy.ts
│  │  │      
│  │  └─view
│  │          BaseGuiView.ts
│  │          BaseSpriteView.ts
│  │          IBaseView.ts
│  │          
│  ├─net
│  │  ├─http
│  │  │      DataCache.ts
│  │  │      DataUpdate.ts
│  │  │      Http.ts
│  │  │      
│  │  └─socket
│  └─utils
│          DateUtils.ts
│          DebugUtils.ts
│          FrameDelay.ts
│          FrameExecutor.ts
│          Log.ts
│          MathUtils.ts
│          MessageCenter.ts
│          ObjectPool.ts
│          Percent.ts
│          RandomUtils.ts
│          TimerManager.ts
│          
└─example
    │  LayerManager.ts
    │  
    ├─const
    │  │  ControllerConst.ts
    │  │  HttpConst.ts
    │  │  ViewConst.ts
    │  │  
    │  └─module
    │          LoginConst.ts
    │          
    └─module
        └─login
                LoginController.ts
                LoginProxy.ts
                LoginView.ts
                

联系我们
===============
QQ: 4607384

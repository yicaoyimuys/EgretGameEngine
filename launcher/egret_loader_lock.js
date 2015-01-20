/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var rotationState=0;//0－横屏状态，1-竖屏状态
var gameRotation=0;
var gamePosX=0;
var tipDiv;
var gameDiv;

egret_h5.startGame = function () {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    if(w<h || window.orientation==180||window.orientation==0){
        //alert("竖屏状态！");
        rotationState=1;
        gameRotation=90;
        gamePosX = 594;
    }
    if(w>h || window.orientation==90||window.orientation==-90){
        //alert("横屏状态！");
        rotationState=0;
        gameRotation=0;
        gamePosX=0;
    }
    tipDiv=document.getElementById("tipDiv");
    gameDiv=document.getElementById("gameDiv");
    gameDiv.style.display="block";
    tipDiv.style.display="none";
    realStartGame();
}

function realStartGame(){
    var  context = egret.MainContext.instance;
    context.touchContext = new egret.HTML5TouchContext();
    context.deviceContext = new egret.HTML5DeviceContext();
    context.netContext = new egret.HTML5NetContext();
    if(rotationState==1){
        egret.StageDelegate.getInstance().setDesignSize(594, 1200);
    }else{
        egret.StageDelegate.getInstance().setDesignSize(1200, 594);
    }
    context.stage = new egret.Stage();
    var scaleMode =  egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ? egret.StageScaleMode.SHOW_ALL : egret.StageScaleMode.NO_SCALE;
    context.stage.scaleMode = scaleMode;

    //WebGL是egret的Beta特性，默认关闭
    var rendererType = 0;
    if (rendererType == 1) {// egret.WebGLUtils.checkCanUseWebGL()) {
        context.rendererContext = new egret.WebGLRenderer();
    }
    else {
        context.rendererContext = new egret.HTML5CanvasRenderer();
    }

    egret.MainContext.instance.rendererContext.texture_scale_factor = 1;
    context.run();

    var rootClass;
    if(document_class){
        rootClass = egret.getDefinitionByName(document_class);
    }
    if(rootClass) {
        var rootContainer = new rootClass();
        rootContainer.rotation=gameRotation;
        rootContainer.x = gamePosX;
        window.gameApp=rootContainer;
        if(rootContainer instanceof egret.DisplayObjectContainer){
            context.stage.addChild(rootContainer);
        }
        else{
            throw new Error("文档类必须是egret.DisplayObjectContainer的子类!");
        }
    }
    else{
        throw new Error("找不到文档类！");
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize",rotationChange);
}

function rotationChange(){
    gameDiv.style.display="none";
    tipDiv.style.display="block";
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    tipDiv.style.width=w;
    tipDiv.style.height=h;
    tipDiv.style.textAlign="center";
    tipDiv.style.lineHeight="40px";
    tipDiv.style.fontSize="20px"
    tipDiv.style.verticalAlign="middle";
    alert("只能横屏状态下游戏，请在手机设置里关闭系统旋转，或者在浏览器设置里，把网页显示状态改为横屏显示。重新刷新网页即可正常游戏。");
};
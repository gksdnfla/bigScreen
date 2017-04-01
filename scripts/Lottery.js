/*
 * ScrolledAnimation({
 *   configId:'元素ID名',
 *   length:奖品数量,
 *   valueArray:[奖品列表],
 *   selectedIndex:中奖索引,
 *   width:宽度,
 *   height:高度,
 *   moving:自动播放开关true/false,
 * });
 */

"use strict";

function ScrolledAnimation(config){
	this.ele = document.getElementById(config.compId);
	this.list = config.valueArray;
	this.selectedIndex = config.selected;
	this.length = config.length || 10;
	this.width = config.width || this.ele.parentNode.offsetWidth;
	this.height = config.height || this.ele.parentNode.offsetHeight;
	this.moving = config.moving || false;
	this.bg = config.background || '#000';
	this.lotteryTitle = config.lotteryTitle || '';
	this.index = config.index;
	this.speed = 5;
	this.deg = 0;
	this.arr = [];
	this.moveCheck = false;
	this.selected = this.length/2;
	this.arrPush();
	this.createElement();
	if(this.move){
		this.start();
	}
}
ScrolledAnimation.prototype.createElement = function(){
	var _this = this;
	this.ele.innerHTML = "";
	this.setStyle(this.ele,{
		perspective		:'800px',
		transformStyle	:'preserve-3d',
	});
	var oDiv = document.createElement('div');
	this.setStyle(oDiv,{
		width			: this.width+'px',
		height			: this.height+'px',
		transform		: 'translateZ(-'+this.height/2/Math.tan(360/this.length/2*Math.PI/180)+'px)',
		transformStyle	: 'preserve-3d',
		posittion		: 'relative',
		margin			: '0 auto',
	});
	this.ele.appendChild(oDiv);
	for(var i=0;i<this.length;i++){
		var oList = document.createElement('div');
		this.setStyle(oList,{
			width		: '100%',
			height		: '100%',
			transform	: 'rotateX('+360/this.length*i+'deg) translateZ('+this.height/2/Math.tan(360/this.length/2*Math.PI/180)+'px)',
			position	: 'absolute',
			top			: '0',
			left		: '0'
		});
		oList.innerHTML = this.arr[i];
		oDiv.appendChild(oList);
	}
	for(var i=0;i<this.length;i++){
		if(typeof this.bg == 'string'){
			oDiv.children[i].style.background = this.bg;
		}
		else{
			oDiv.children[i].style.background = this.bg[i];
		}
	}
}
ScrolledAnimation.prototype.arrPush = function(){
	var _this = this;
	if(this.list.length < this.length){
		for(var i=0;i<this.length;i++){
			this.arr[i] = this.list[i%this.list.length];
		}
	}
	else{
		for(var i=0;i<this.length;i++){
			var rndIndex = this.random(0,this.list.length);
			if(checkRndArr(rndIndex)){
				i--;
			}
			else{
				this.arr.push(this.list[rndIndex]);
			}
		}
	}
	function checkRndArr(rndNum){
		for(var i=0;i<_this.arr.length;i++){
			if(rndNum == _this.arr[i]){
				return true;
			}
		}
		return false;
	}
	// this.arr[this.selected] = this.list[this.selectedIndex];
}
ScrolledAnimation.prototype.start = function(){
	var _this = this;
	if(this.moveCheck) return;
	this.moveCheck = true;
	this.timer = window.setInterval(function(){
		_this.ele.children[0].style.transform = 'translateZ(-'+_this.height/2/Math.tan(360/_this.length/2*Math.PI/180)+'px) rotateX(-'+(_this.deg+=_this.speed)+'deg)';
	},30);
	// this.ele.children[0].style.transform = 'rotateX(-'+(360*10+360/9*5)+'deg)';
}
ScrolledAnimation.prototype.stop = function(prizeList){
	var _this = this;
	clearInterval(this.timer);
	_this.ele.children[0].children[_this.selected].innerHTML = prizeList[_this.index];
	_this.ele.children[0].style.transition = '3s cubic-bezier(0, 0.15, 0, 1)';
	_this.deg += 360;
	_this.ele.children[0].style.transform = 'translateZ(-'+_this.height/2/Math.tan(360/_this.length/2*Math.PI/180)+'px) rotateX(-'+(_this.deg+(360/_this.length*_this.selected-_this.deg%360))+'deg)';
	window.setTimeout(function(){
		_this.moveCheck = false;
	},3000);
}
ScrolledAnimation.prototype.setStyle = function(obj,styleJson){
	for(var value in styleJson){
		obj.style[value] = styleJson[value];
	}
}
ScrolledAnimation.prototype.random = function(min,max){
	return parseInt(Math.random()*(max-min))+min;
}
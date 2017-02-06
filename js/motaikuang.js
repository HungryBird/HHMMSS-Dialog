window.onload=function(){
	var inArg;
	var openW;
	if(document.getElementsByClassName){
		openW=document.getElementsByClassName('openW');
	}else{
		openW=getByClass('openW');
	}
	function getByClass(sClass){  
	    var aEle=document.getElementsByTagName('*');  
	    var arr=[];  
	    for(var i=0;i<aEle.length;i++)  
	    {  
	        if(aEle[i].className==sClass)  
	        {  
	            arr.push(aEle[i])  
	        }  
	    }  
	    return arr;  
	}
	var openWlength=openW.length;
	for(var j=0;j<openWlength;j++){
		!function(j){
			openW[j].onclick=function(){
				inArg=j;
				toOpen();
			}
		}(j)
	}
	var windowH=window.screen.availHeight;
	var mtkw;
	var curTime,curHours,curMinutes,curSeconds
	var hours,minutes,seconds,h,m,s;
	function toOpen(){
		curTime=new Date();
		curHours=curTime.getHours();
		curMinutes=curTime.getMinutes();
		curSeconds=curTime.getSeconds();
		if(document.getElementById("mtkw")){
			updateTime();
			mtkw.style.display='block';
			return;
		}
		//创造蒙版和模态框;
		var createDiv=document.createElement("div");
		createDiv.id='mtkw';
		document.body.appendChild(createDiv);
		mtkw=document.getElementById('mtkw');
		mtkw.style.height=windowH+'px';
		mtkw.innerHTML='<div id="clockWrap"><img src="img/关闭.png" id="toClose"><div>选择时间</div><div class="clockC">时<select id="hours"></select>:分<select id="minutes"></select>:秒<select id="seconds"></select></div><div id="ConfirmButton">确定</div></div>';
		//获取当前时间
		hours=document.getElementById('hours'),minutes=document.getElementById('minutes'),seconds=document.getElementById('seconds');
		for(h=0;h<24;h++){
			var op=document.createElement('option');
			if (h<10) {
				op.innerHTML='0'+h;
			}else{
				op.innerHTML=h;
			}	
			hours.appendChild(op);
			if(h==curHours){
				getNowTime(h,hours,curHours);
			}
		}
		for(m=0;m<60;m++){
			var op=document.createElement('option');
			if (m<10) {
				op.innerHTML='0'+m;
			}else{
				op.innerHTML=m;
			}
			minutes.appendChild(op);
			if(m==curMinutes){
				getNowTime(m,minutes,curMinutes);
			}
		}
		for(s=0;s<60;s++){
			var op=document.createElement('option');
			if(s<10){
				op.innerHTML='0'+s;
			}else{
				op.innerHTML=s;
			}	
			seconds.appendChild(op);
			if(s==curSeconds){
				getNowTime(s,seconds,curSeconds);
			}
		}
		//隐藏模态框
		var toClose=document.getElementById('toClose');
		toClose.onclick=function(){
			mtkw.style.display='none';
		}
		//点击确认
		var ConfirmButton=document.getElementById('ConfirmButton');
		var hIndex=hours.selectedIndex,mIndex=minutes.selectedIndex,sIndex=seconds.selectedIndex;
		ConfirmButton.onclick=function(){
			hIndex=hours.selectedIndex,mIndex=minutes.selectedIndex,sIndex=seconds.selectedIndex;
			openW[inArg].value=hours.options[hIndex].value+':'+minutes.options[mIndex].value+':'+seconds.options[sIndex].value;
			mtkw.style.display='none';
		}
	}
	function updateTime(){
		if(hours!=curHours){
			getNowTime(curHours,hours);
		}
		if(minutes!=curMinutes){
			getNowTime(curMinutes,minutes);
		}
		if(seconds!=curSeconds){
			getNowTime(curSeconds,seconds);
		}
	}
	function getNowTime(num,unit){
		for(var i=0;i<num;i++){
			if(unit[i].selected=true){
				unit[i].selected=false;
				break;
			}		
		}
		unit[num].selected=true;
	}
}
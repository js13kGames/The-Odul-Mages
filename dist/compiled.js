function game(){function e(){if(t(),l(),C.ball.update(),d.now=(new Date).getTime(),d.elapsed=d.now-d.start,h.fillStyle="black","menu"===T.state)r(o.toUpperCase(),c.x,c.y-50,"center","52px"),r("press [space]",c.x,c.y+20,"center");else if("intro"===T.state)r("INTRO",c.x,c.y+100,"center"),C.g.reduceOffset(b.fast),C.mod.reduceOffset(b.fast),C.w.reduceOffset(b.fast),C.ps1.reduceOffset(b.fast),C.ps2.reduceOffset(b.fast),C.m.reduceOffset(b.med),C.stars.forEach(function(e){e.reduceOffset()}),C.ps1.scrollComplete&&(T.start=!0),T.start&&(T.state="toss");else if("toss"===T.state)if(w.getScore()<m&&g.getScore()<m)w.draw(h),g.draw(h),d.start=(new Date).getTime();else{var a="";console.log(d.elapsed),120>v?(v++,a=w.getScore()>=m?"player one":"player two",T.tossWinner=w.getScore()>=m?1:2,T.defender=1===T.tossWinner?2:1,C.ball.setPlayer(T.tossWinner),a+=" has the power"):240>v?(a="choose your attack",v++):a=null,null!==a?r(a,c.x,c.y,"center"):T.state="attackSelection"}else if("attackSelection"==T.state){var s=!1;(1===T.defender&&T.playerTwoReversed>=2||2===T.defender&&T.playerOneReversed>=2)&&(s=!0),x.displayAttacks(c,s),i()}else if("attack"==T.state){C.ball.setAttack(T.chosenAttack);var y="player "+T.tossWinner+" does a "+T.chosenAttack.type+" attack";r(y,c.x,c.y,"center"),v++,v>=120&&i({state:"defense"})}else if("defense"==T.state)r("player "+T.defender+", reverse it!!",c.x,c.y,"center"),v++,v>=120&&i({state:"attackIncoming"});else if("attackIncoming"==T.state){v++;var f=60/T.chosenAttack.speed*10;switch(r(f+" : "+v,c.x,n.height-50,"center"),C.ball.speed=575/(f/10)/10,C.ball.show=!0,T.defender){case 1:w.draw(h),w.getScore()>=100&&(T.state="attackFail",T.playerOneReversed++);break;case 2:g.draw(h),g.getScore()>=100&&(T.state="attackFail",T.playerTwoReversed++)}v>=f&&(T.state="attackSuccess")}else if("attackFail"==T.state)i(),C.ball.show=!1,1===T.defender?(T.playerTwoHealth-=T.chosenAttack.damage/2,C.ps2.health=T.playerTwoHealth,T.playerTwoHealth<=0?(T.playerTwoHealth=0,C.ps2.health=T.playerTwoHealth,i({state:"gameOver"})):T.state="toss"):(T.playerOneHealth-=T.chosenAttack.damage/2,C.ps1.health=T.playerOneHealth,T.playerOneHealth<=0?(T.playerOneHealth=0,C.ps1.health=T.playerOneHealth,T.state="gameOver"):T.state="toss");else if("attackSuccess"==T.state){C.ball.show=!1;var u=!0;1===T.defender?(T.playerOneHealth-=T.chosenAttack.damage,C.ps1.health=T.playerOneHealth,T.playerOneHealth<=0&&(T.playerOneHealth=0,C.ps1.health=T.playerOneHealth,T.state="gameOver",v=0,u=!1)):(T.playerTwoHealth-=T.chosenAttack.damage,C.ps2.health=T.playerTwoHealth,T.playerTwoHealth<=0&&(T.playerTwoHealth=0,C.ps2.health=T.playerTwoHealth,T.state="gameOver",v=0,u=!1)),u&&i({state:"toss"})}else if("gameOver"==T.state){var p=T.playerOneHealth<=0?"Player 2":"Player 1";p+=" wins",r(p,c.x,c.y,"center"),v++,v>=120&&(T.start=!1,i({state:"menu",health:!0}))}window.requestAnimationFrame(e)}function t(){h.clearRect(0,0,n.width,n.height)}function a(e,t,a){var s=0;return{draw:function(){h.lineWidth=3,h.strokeStyle="black",r(a.getLetter(),e,t,"center","400px","rgba(255,255,255,0.8)"),h.strokeText(a.getLetter(),e,t),h.lineWidth=0},getScore:function(){return s},updateScore:function(e){s+=e},resetScore:function(){s=0}}}function s(){return{x:n.width/2,y:n.height/2}}function i(e){v=0,w.resetScore(),g.resetScore(),void 0!==e&&(void 0!==e.health&&(T.playerOneHealth=T.playerTwoHealth=S),void 0!==e.state&&(T.state=e.state))}function r(e,t,a,s,i,r){void 0!==s&&(h.textAlign=s),void 0===r?(h.fillStyle="rgb(255,255,255)",h.shadowColor="white"):(h.fillStyle=r,h.shadowColor=r),h.font=(void 0===i?"22px":i)+" sans-serif",h.shadowBlur=10,h.fillText(e,t,a),h.shadowBlur=0}function l(){C.stars.forEach(function(e){e.draw()}),C.mod.draw(),C.ball.draw(),C.ball.drawReflection(),C.m.draw(),C.g.draw(),C.ps1.draw(T.playerOneReversed,T.playerOneHealth),C.ps1.drawReflection(),C.ps2.draw(T.playerTwoReversed,T.playerTwoHealth),C.ps2.drawReflection(),C.w.draw()}var o="The Odul Mages",n=document.getElementById("canvas"),h=n.getContext("2d");n.width=960,n.height=540;var c=s(),d={elapsed:0,start:(new Date).getTime(),now:(new Date).getTime()},y=new Sounds,f=new AvailableKeys,u=new KeyStroke(f.getKey()),p=new KeyStroke(f.getKey()),w=a(240,n.height/2+100,u),g=a(720,n.height/2+100,p),x=new Attack(h),v=0,k={yOffset:1.25*n.height,medYOffset:1.25*n.height*.1,slowYOffset:1.25*n.height*.05},b={fast:2,med:.2,slow:.1},T={state:"menu",attackingPlayer:null,playerOneHealth:100,playerTwoHealth:100,playerOneReversed:0,playerTwoReversed:0,tossWinner:null,chosenAttack:null,defender:null,start:!1},S=100,m=50,O={water:{type:"water",speed:2,damage:30,colour:"rgb(0,0,255)"},fire:{type:"fire",speed:1,damage:40,colour:"rgb(255,0,0)"},electric:{type:"electric",speed:3,damage:15,colour:"rgb(255,255,0)"},special:{type:"special",speed:2,damage:50,colour:"rbg(255,0,255)"}},C={stars:starField(h,30,k,b),ball:attackBall(h,180,290,40,5,1),g:ground(h,0,370,k.yOffset),ps1:playerSprite(h,150,340,k.yOffset),ps2:playerSprite(h,810,340,k.yOffset,2),w:water(h,0,380,k.yOffset),mod:modesty(h,0,380,k.yOffset),m:moon(h,800,100,k.medYOffset)};window.requestAnimationFrame(e),window.addEventListener("keydown",function(e){if("menu"===T.state)32===e.keyCode&&(T.state="intro");else if("toss"===T.state)e.keyCode===u.currentLetter?(f.keys[u.currentLetter-65].available=!0,u.assignLetter(f.getKey()),w.updateScore(10),y.playSuccess(Math.round(w.getScore()/10-1),1)):e.keyCode===p.currentLetter&&(f.keys[p.currentLetter-65].avaialble=!0,p.assignLetter(f.getKey()),g.updateScore(10),y.playSuccess(Math.round(g.getScore()/10-1),2));else if("attackIncoming"===T.state)e.keyCode===u.currentLetter?(f.keys[u.currentLetter-65].available=!0,u.assignLetter(f.getKey()),w.updateScore(20)):e.keyCode===p.currentLetter&&(f.keys[p.currentLetter-65].available=!0,p.assignLetter(f.getKey()),g.updateScore(20));else if("attackSelection"===T.state&&x.available)switch(e.keyCode){case 87:x.available=!1,T.state="attack",T.chosenAttack=O.water;break;case 70:x.available=!1,T.state="attack",T.chosenAttack=O.fire;break;case 69:x.available=!1,T.state="attack",T.chosenAttack=O.electric;break;case 83:(1===T.defender&&T.playerTwoReversed>=3||2===T.defender&&T.playerOneReversed>=3)&&(x.available=!1,T.state="attack",T.chosenAttack=O.special,T.playerTwoReversed=2===T.defender?0:T.playerTwoReversed,T.playerOneReversed=1===T.defender?0:T.playerOneReversed)}})}function moon(e,t,a,s){var i=a;return{x:t,y:a+s,radius:40,draw:function(){e.fillStyle="rgb(255,255,255)",e.shadowColor="rgba(255,255,255,0.8)",e.shadowBlur=30,e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill(),e.shadowBlur=0,e.fillStyle="rgb(0,0,0)",e.beginPath(),e.arc(this.x+10,this.y-10,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill()},reduceOffset:function(e){this.y<=i?this.y=i:this.y-=e}}}function attackBall(e,t,a,s,i,r){return{x:t,y:a,speed:i,player:r,radius:s,show:!1,colour:"rgb(255,255,255)",gradient:this.colour,setPlayer:function(e){this.player=e,this.x=1===this.player?180:780},setAttack:function(e){this.colour=e.colour,this.radius=e.damage},draw:function(){this.show&&(e.fillStyle=this.colour,e.shadowColor=this.colour,e.shadowBlur=40,e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill(),this.shadowBlur=0)},drawReflection:function(){this.show&&(e.fillStyle=this.colour,e.shadowColor=this.colour,e.shadowBlur=30,e.beginPath(),e.arc(this.x,this.y+170,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill(),e.shadowBlur=0)},update:function(){this.show&&(this.x+=1===this.player?this.speed:-1*this.speed)}}}function star(e,t,a,s,i){var r=a;return{x:t,y:a+s,radius:rnd(1,3),draw:function(){e.fillStyle="rgb(255,255,255)",e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill()},reduceOffset:function(){this.y<=r?this.y=r:this.y-=i}}}function starField(e,t,a,s){for(var i=[],r=0;t>r;r++){var l=rnd(0,960),o=rnd(0,540),n=rnd(0,1),h={};1===n?(h.speed=s.med,h.offset=a.medYOffset):(h.speed=s.slow,h.offset=a.slowYOffset),i.push(star(e,l,o,h.offset,h.speed))}return i}function ground(e,t,a,s){var i=a;return{x:t,y:a+s,height:10,draw:function(){e.fillStyle="rgb(99,99,99)",e.fillRect(this.x,this.y,canvas.width,this.height)},reduceOffset:function(e){this.y<=i?this.y=i:this.y-=e}}}function water(e,t,a,s){var i=a;return{x:t,y:a+s,height:70,draw:function(){var t=e.createLinearGradient(canvas.width/2,this.y,canvas.width/2,this.y+this.height);t.addColorStop(0,"rgba(0,0,0,1)"),t.addColorStop(.5,"rgba(0,0,0,0.4)"),t.addColorStop(.6,"rgba(0,0,0,0.2)"),t.addColorStop(.65,"rgba(0,0,0,0.1)"),t.addColorStop(.7,"rgba(0,0,0,0.05)"),t.addColorStop(.75,"rgba(0,0,0,0)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.rect(this.x,this.y,canvas.width,this.height),e.fill(),e.fillStyle="black"},reduceOffset:function(e){this.y<=i?this.y=i:this.y-=e}}}function modesty(e,t,a,s){var i=a;return{x:t,y:a+s,height:250,draw:function(){e.fillStyle="black",e.rect(this.x,this.y,canvas.width,this.height),e.fill()},reduceOffset:function(e){this.y<=i?this.y=i:this.y-=e}}}function playerSprite(e,t,a,s,i){var r=a,l=2===i?-1:1;return{x:t,y:a+s,health:100,scrollComplete:!1,draw:function(t,a){var s=new Path2D;if(e.fillStyle="rgb(255,255,255)",e.shadowColor="white",e.shadowBlur=10,s.moveTo(this.x,this.y),s.lineTo(this.x-40*l,this.y),s.lineTo(this.x-10*l,this.y-100),s.lineTo(this.x+20*l,this.y-100),s.lineTo(this.x+30*l,this.y),s.moveTo(this.x-10*l,this.y),s.lineTo(this.x-12*l,this.y+30),s.lineTo(this.x-20*l,this.y+30),s.lineTo(this.x-18*l,this.y),s.moveTo(this.x+15*l,this.y),s.lineTo(this.x+15*l,this.y+30),s.lineTo(this.x+7*l,this.y+30),s.lineTo(this.x+7*l,this.y),e.fill(s),e.shadowBlur=0,t>0){t=t>3?3:t;for(var i=7,r=1;t>=r;r++)e.fillStyle="white",e.shadowColor="white",e.shadowBlur=15,e.beginPath(),e.arc(this.x-45*l,this.y-20-20*r,i,0,2*Math.PI,!0),e.closePath(),e.fill()}e.fillStyle="white",e.fillRect(this.x-70*l,this.y,10,-1*a);var o=new Path2D;e.fillStyle="rgb(40,40,40)",o.moveTo(this.x+17*l,this.y-98),o.lineTo(this.x+19*l,this.y-75),o.lineTo(this.x+4*l,this.y-75),o.lineTo(this.x+9*l,this.y-98),e.fill(o)},drawReflection:function(){var t=new Path2D;e.fillStyle="rgba(255,255,255,"+this.health/100+")",e.shadowColor="rgba(255,255,255,"+this.health/100+")",e.shadowBlur=20;var a=this.y+70;t.moveTo(this.x,a),t.lineTo(this.x-40*l,a),t.lineTo(this.x-10*l,a+100),t.lineTo(this.x+20*l,a+100),t.lineTo(this.x+30*l,a),t.moveTo(this.x-10*l,a),t.lineTo(this.x-12*l,a-30),t.lineTo(this.x-20*l,a-30),t.lineTo(this.x-18*l,a),t.moveTo(this.x+15*l,a),t.lineTo(this.x+15*l,a-30),t.lineTo(this.x+7*l,a-30),t.lineTo(this.x+7*l,a),e.fill(t),e.shadowBlur=0;var s=new Path2D;e.fillStyle="rgba(40,40,40,"+this.health/100+")",s.moveTo(this.x+17*l,a+98),s.lineTo(this.x+19*l,a+75),s.lineTo(this.x+4*l,a+75),s.lineTo(this.x+9*l,a+98),e.fill(s)},reduceOffset:function(e){this.y<=r?(this.y=r,this.scrollComplete=!0):this.y-=e}}}function rnd(e,t){return Math.floor(Math.random()*(t-e+1))+e}function KeyStroke(e){this.currentLetter=e}function AvailableKeys(){this.keys=[];for(var e=65;91>e;e++)this.keys.push({key:e,available:!0})}function Attack(e,t){this.ctx=e,this.available=!1,this.special=t}function Sounds(){this.audioContext=new AudioContext,this.notes=[{notes:[-3,2,9],delay:.1,feedback:.4},{notes:[0,5,12],delay:.1,feedback:.4},{notes:[3,8,15],delay:.1,feedback:.4},{notes:[6,11,18],delay:.1,feedback:.4},{notes:[9,14,21,22,28,30,32,32,35,9,9,9],delay:.1,feedback:.6}],this.p2notes=[{notes:[-5,-2,-1],delay:.1,feedback:.4},{notes:[-3,0,1],delay:.1,feedback:.4},{notes:[-1,2,3],delay:.1,feedback:.4},{notes:[1,4,5],delay:.1,feedback:.4},{notes:[3,6,7,2,12,10,14,17,20,0,0,2,1],delay:.1,feedback:.4}]}function test(){var e=new AudioContext,t=e.createOscillator();t.type="square",t.frequency.value=220,t.detune.value=1500,t.connect(e.destination);for(var a=e.currentTime+.1,s=80,i=60/s/2,r=0;2>r;r++){var l=a+8*r*i;t.start(l),t.stop(l+i)}}KeyStroke.prototype.assignLetter=function(e){this.currentLetter=e},KeyStroke.prototype.getLetter=function(){return String.fromCharCode(this.currentLetter).toUpperCase()},KeyStroke.prototype.getRandom=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},AvailableKeys.prototype.getKey=function(){var e=rnd(0,this.keys.length-1),t=this.keys[e];return t.available?(this.keys[e].available=!1,t.key):this.getKey()},Attack.prototype.displayAttacks=function(e){this.available=!0,this.ctx.fillStyle="white",this.ctx.shadowBlur=20,this.ctx.shadowColor="white",this.ctx.fillText("fire",e.x-100,e.y),this.ctx.fillText("water",e.x,e.y-100),this.ctx.fillText("electric",e.x+105,e.y),this.special||(this.ctx.fillStyle="rgba(255,255,255,0.4)"),this.ctx.fillText("special",e.x,e.y+100),this.special||(this.ctx.fillStyle="white")},Attack.prototype.selectedAttack=function(e){this.available&&(this.ctx.textAlign="left",this.ctx.fillText(e+" selected",20,100))},Sounds.prototype.playSuccess=function(e,t){for(var a=.05,s=0-a,i=.15,r=1===t?this.notes:this.p2notes,l=0;l<r[e].notes.length;l++)this.play(s+=a,r[e].notes[l],i,r[e])},Sounds.prototype.play=function(e,t,a,s){var i=this.audioContext.currentTime+e,r=this.audioContext.createGain(),l=this.audioContext.createGain(),o=this.audioContext.createDelay(),n=this.audioContext.createGain();n.connect(this.audioContext.destination),o.delayTime.value=s.delay,l.gain.value=s.feedback,r.connect(n),r.connect(o),o.connect(l),l.connect(o),l.connect(n);var h=this.audioContext.createOscillator();h.connect(o),h.type="square",h.detune.value=100*t,h.start(i),h.stop(i+a)};
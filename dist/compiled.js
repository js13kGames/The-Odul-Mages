function game(){function e(){if(t(),l(),d.now=(new Date).getTime(),h.fillStyle="black","menu"===b.state)i(o.toUpperCase(),c.x,c.y-50,"center","52px"),i("press [space]",c.x,c.y+20,"center");else if("intro"===b.state)i("INTRO",c.x,c.y+100,"center"),C.g.reduceOffset(m.fast),C.mod.reduceOffset(m.fast),C.w.reduceOffset(m.fast),C.ps1.reduceOffset(m.fast),C.ps2.reduceOffset(m.fast),C.m.reduceOffset(m.med),C.stars.forEach(function(e){e.reduceOffset()}),C.ps1.scrollComplete&&(b.start=!0),b.start&&(b.state="toss");else if("toss"===b.state)if(w.getScore()<S&&g.getScore()<S)w.draw(h),g.draw(h),d.start=(new Date).getTime();else{d.started||(d.elapsed=0,d.start=(new Date).getTime(),d.started=!0),d.elapsed=d.now-d.start;var a="";d.elapsed<1500?(v++,a=w.getScore()>=S?"player one":"player two",b.tossWinner=w.getScore()>=S?1:2,b.defender=1===b.tossWinner?2:1,C.ball.setPlayer(b.tossWinner),a+=" has the power"):d.elapsed<3e3?(a="choose your attack",v++):a=null,null!==a?i(a,c.x,c.y,"center"):(b.state="attackSelection",d.started=!1)}else if("attackSelection"==b.state){var s=!1;(1===b.defender&&b.playerTwoReversed>=2||2===b.defender&&b.playerOneReversed>=2)&&(s=!0),x.displayAttacks(c,s),r()}else if("attack"==b.state){d.started||(d.elapsed=0,d.start=(new Date).getTime(),d.started=!0),d.elapsed=d.now-d.start,C.ball.setAttack(b.chosenAttack);var y="player "+b.tossWinner+" does a "+b.chosenAttack.type+" attack";i(y,c.x,c.y,"center"),v++,d.elapsed>1500&&(d.started=!1,r({state:"defense"}))}else if("defense"==b.state)i("player "+b.defender+", reverse it!!",c.x,c.y,"center"),v++,d.started||(d.elapsed=0,d.start=(new Date).getTime(),d.started=!0),d.elapsed=d.now-d.start,d.elapsed>1500&&(d.started=!1,r({state:"attackIncoming"}),d.lastCall=(new Date).getDate());else if("attackIncoming"==b.state){d.started||(d.elapsed=0,d.start=(new Date).getTime(),d.started=!0),v++,d.elapsed=d.now-d.start;{60/b.chosenAttack.speed*(d.now-d.start)}i(d.elapsed,c.x,n.height-50,"center");var f=1e3*b.chosenAttack.speed,u=575,p=u/f;d.elapsed=d.now-d.start;var k=(d.elapsed/100*p,(new Date).getTime()-d.lastCall);switch(k>1e3&&console.error(k),C.ball.x+=k*p,C.ball.show=!0,d.elapsed>=b.chosenAttack.time&&(b.state="attackSuccess"),b.defender){case 1:w.draw(h),w.getScore()>=100&&(b.state="attackFail",b.playerOneReversed++);break;case 2:g.draw(h),g.getScore()>=100&&(b.state="attackFail",b.playerTwoReversed++)}d.lastCall=(new Date).getTime()}else if("attackFail"==b.state)r(),C.ball.show=!1,1===b.defender?(b.playerTwoHealth-=b.chosenAttack.damage/2,C.ps2.health=b.playerTwoHealth,b.playerTwoHealth<=0?(b.playerTwoHealth=0,C.ps2.health=b.playerTwoHealth,r({state:"gameOver"})):b.state="toss"):(b.playerOneHealth-=b.chosenAttack.damage/2,C.ps1.health=b.playerOneHealth,b.playerOneHealth<=0?(b.playerOneHealth=0,C.ps1.health=b.playerOneHealth,b.state="gameOver"):b.state="toss");else if("attackSuccess"==b.state){C.ball.show=!1;var T=!0;1===b.defender?(b.playerOneHealth-=b.chosenAttack.damage,C.ps1.health=b.playerOneHealth,b.playerOneHealth<=0&&(b.playerOneHealth=0,C.ps1.health=b.playerOneHealth,b.state="gameOver",v=0,T=!1)):(b.playerTwoHealth-=b.chosenAttack.damage,C.ps2.health=b.playerTwoHealth,b.playerTwoHealth<=0&&(b.playerTwoHealth=0,C.ps2.health=b.playerTwoHealth,b.state="gameOver",v=0,T=!1)),T&&r({state:"toss"})}else if("gameOver"==b.state){var O=b.playerOneHealth<=0?"Player 2":"Player 1";O+=" wins",i(O,c.x,c.y,"center"),v++,v>=120&&(b.start=!1,r({state:"menu",health:!0}))}window.requestAnimationFrame(e)}function t(){h.clearRect(0,0,n.width,n.height)}function a(e,t,a){var s=0;return{draw:function(){h.lineWidth=3,h.strokeStyle="black",i(a.getLetter(),e,t,"center","400px","rgba(255,255,255,0.8)"),h.strokeText(a.getLetter(),e,t),h.lineWidth=0},getScore:function(){return s},updateScore:function(e){s+=e},resetScore:function(){s=0}}}function s(){return{x:n.width/2,y:n.height/2}}function r(e){v=0,w.resetScore(),g.resetScore(),void 0!==e&&(void 0!==e.health&&(b.playerOneHealth=b.playerTwoHealth=T),void 0!==e.state&&(b.state=e.state))}function i(e,t,a,s,r,i){void 0!==s&&(h.textAlign=s),void 0===i?(h.fillStyle="rgb(255,255,255)",h.shadowColor="white"):(h.fillStyle=i,h.shadowColor=i),h.font=(void 0===r?"22px":r)+" sans-serif",h.shadowBlur=10,h.fillText(e,t,a),h.shadowBlur=0}function l(){C.stars.forEach(function(e){e.draw()}),C.mod.draw(),C.ball.draw(),C.ball.drawReflection(),C.m.draw(),C.g.draw(),C.ps1.draw(b.playerOneReversed,b.playerOneHealth),C.ps1.drawReflection(),C.ps2.draw(b.playerTwoReversed,b.playerTwoHealth),C.ps2.drawReflection(),C.w.draw()}var o="The Odul Mages",n=document.getElementById("canvas"),h=n.getContext("2d");n.width=960,n.height=540;var c=s(),d={elapsed:0,start:(new Date).getTime(),now:(new Date).getTime(),getElapsed:this.now-this.start,started:!1,lastCall:(new Date).getTime()},y=new Sounds,f=new AvailableKeys,u=new KeyStroke(f.getKey()),p=new KeyStroke(f.getKey()),w=a(240,n.height/2+100,u),g=a(720,n.height/2+100,p),x=new Attack(h),v=0,k={yOffset:1.25*n.height,medYOffset:1.25*n.height*.1,slowYOffset:1.25*n.height*.05},m={fast:2,med:.2,slow:.1},b={state:"menu",attackingPlayer:null,playerOneHealth:100,playerTwoHealth:100,playerOneReversed:0,playerTwoReversed:0,tossWinner:null,chosenAttack:null,defender:null,start:!1},T=100,S=50,O={water:{type:"water",speed:7,damage:30,colour:"rgb(0,0,255)",time:4900},fire:{type:"fire",speed:10,damage:40,colour:"rgb(255,0,0)",time:6e3},electric:{type:"electric",speed:4,damage:15,colour:"rgb(255,255,0)",time:3750},special:{type:"special",speed:5,damage:50,colour:"rbg(255,0,255)",time:4e3}},C={stars:starField(h,30,k,m),ball:attackBall(h,180,290,40,5,1),g:ground(h,0,370,k.yOffset),ps1:playerSprite(h,150,340,k.yOffset),ps2:playerSprite(h,810,340,k.yOffset,2),w:water(h,0,380,k.yOffset),mod:modesty(h,0,380,k.yOffset),m:moon(h,800,100,k.medYOffset)};window.requestAnimationFrame(e),window.addEventListener("keydown",function(e){if("menu"===b.state)32===e.keyCode&&(b.state="intro");else if("toss"===b.state)e.keyCode===u.currentLetter?(f.keys[u.currentLetter-65].available=!0,u.assignLetter(f.getKey()),w.updateScore(10),y.playSuccess(Math.round(w.getScore()/10-1),1)):e.keyCode===p.currentLetter&&(f.keys[p.currentLetter-65].avaialble=!0,p.assignLetter(f.getKey()),g.updateScore(10),y.playSuccess(Math.round(g.getScore()/10-1),2));else if("attackIncoming"===b.state)e.keyCode===u.currentLetter?(f.keys[u.currentLetter-65].available=!0,u.assignLetter(f.getKey()),w.updateScore(20)):e.keyCode===p.currentLetter&&(f.keys[p.currentLetter-65].available=!0,p.assignLetter(f.getKey()),g.updateScore(20));else if("attackSelection"===b.state&&x.available)switch(e.keyCode){case 87:x.available=!1,b.state="attack",b.chosenAttack=O.water;break;case 70:x.available=!1,b.state="attack",b.chosenAttack=O.fire;break;case 69:x.available=!1,b.state="attack",b.chosenAttack=O.electric;break;case 83:(1===b.defender&&b.playerTwoReversed>=3||2===b.defender&&b.playerOneReversed>=3)&&(x.available=!1,b.state="attack",b.chosenAttack=O.special,b.playerTwoReversed=2===b.defender?0:b.playerTwoReversed,b.playerOneReversed=1===b.defender?0:b.playerOneReversed)}})}function moon(e,t,a,s){var r=a;return{x:t,y:a+s,radius:40,draw:function(){e.fillStyle="rgb(255,255,255)",e.shadowColor="rgba(255,255,255,0.8)",e.shadowBlur=30,e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill(),e.shadowBlur=0,e.fillStyle="rgb(0,0,0)",e.beginPath(),e.arc(this.x+10,this.y-10,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill()},reduceOffset:function(e){this.y<=r?this.y=r:this.y-=e}}}function attackBall(e,t,a,s,r,i){return{x:t,y:a,speed:r,player:i,radius:s,show:!1,colour:"rgb(255,255,255)",gradient:this.colour,speedSet:!1,setPlayer:function(e){this.player=e,this.x=1===this.player?180:780},setAttack:function(e){this.colour=e.colour,this.radius=e.damage},draw:function(){this.show&&(e.fillStyle=this.colour,e.shadowColor=this.colour,e.shadowBlur=40,e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill(),this.shadowBlur=0)},drawReflection:function(){this.show&&(e.fillStyle=this.colour,e.shadowColor=this.colour,e.shadowBlur=30,e.beginPath(),e.arc(this.x,this.y+170,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill(),e.shadowBlur=0)},update:function(){this.show&&(this.x+=1===this.player?this.speed:-1*this.speed)}}}function star(e,t,a,s,r){var i=a;return{x:t,y:a+s,radius:rnd(1,3),draw:function(){e.fillStyle="rgb(255,255,255)",e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),e.closePath(),e.fill()},reduceOffset:function(){this.y<=i?this.y=i:this.y-=r}}}function starField(e,t,a,s){for(var r=[],i=0;t>i;i++){var l=rnd(0,960),o=rnd(0,540),n=rnd(0,1),h={};1===n?(h.speed=s.med,h.offset=a.medYOffset):(h.speed=s.slow,h.offset=a.slowYOffset),r.push(star(e,l,o,h.offset,h.speed))}return r}function ground(e,t,a,s){var r=a;return{x:t,y:a+s,height:10,draw:function(){e.fillStyle="rgb(99,99,99)",e.fillRect(this.x,this.y,canvas.width,this.height)},reduceOffset:function(e){this.y<=r?this.y=r:this.y-=e}}}function water(e,t,a,s){var r=a;return{x:t,y:a+s,height:70,draw:function(){var t=e.createLinearGradient(canvas.width/2,this.y,canvas.width/2,this.y+this.height);t.addColorStop(0,"rgba(0,0,0,1)"),t.addColorStop(.5,"rgba(0,0,0,0.4)"),t.addColorStop(.6,"rgba(0,0,0,0.2)"),t.addColorStop(.65,"rgba(0,0,0,0.1)"),t.addColorStop(.7,"rgba(0,0,0,0.05)"),t.addColorStop(.75,"rgba(0,0,0,0)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.rect(this.x,this.y,canvas.width,this.height),e.fill(),e.fillStyle="black"},reduceOffset:function(e){this.y<=r?this.y=r:this.y-=e}}}function modesty(e,t,a,s){var r=a;return{x:t,y:a+s,height:250,draw:function(){e.fillStyle="black",e.rect(this.x,this.y,canvas.width,this.height),e.fill()},reduceOffset:function(e){this.y<=r?this.y=r:this.y-=e}}}function playerSprite(e,t,a,s,r){var i=a,l=2===r?-1:1;return{x:t,y:a+s,health:100,scrollComplete:!1,draw:function(t,a){var s=new Path2D;if(e.fillStyle="rgb(255,255,255)",e.shadowColor="white",e.shadowBlur=10,s.moveTo(this.x,this.y),s.lineTo(this.x-40*l,this.y),s.lineTo(this.x-10*l,this.y-100),s.lineTo(this.x+20*l,this.y-100),s.lineTo(this.x+30*l,this.y),s.moveTo(this.x-10*l,this.y),s.lineTo(this.x-12*l,this.y+30),s.lineTo(this.x-20*l,this.y+30),s.lineTo(this.x-18*l,this.y),s.moveTo(this.x+15*l,this.y),s.lineTo(this.x+15*l,this.y+30),s.lineTo(this.x+7*l,this.y+30),s.lineTo(this.x+7*l,this.y),e.fill(s),e.shadowBlur=0,t>0){t=t>3?3:t;for(var r=7,i=1;t>=i;i++)e.fillStyle="white",e.shadowColor="white",e.shadowBlur=15,e.beginPath(),e.arc(this.x-45*l,this.y-20-20*i,r,0,2*Math.PI,!0),e.closePath(),e.fill()}e.fillStyle="white",e.fillRect(this.x-70*l,this.y,10,-1*a);var o=new Path2D;e.fillStyle="rgb(40,40,40)",o.moveTo(this.x+17*l,this.y-98),o.lineTo(this.x+19*l,this.y-75),o.lineTo(this.x+4*l,this.y-75),o.lineTo(this.x+9*l,this.y-98),e.fill(o)},drawReflection:function(){var t=new Path2D;e.fillStyle="rgba(255,255,255,"+this.health/100+")",e.shadowColor="rgba(255,255,255,"+this.health/100+")",e.shadowBlur=20;var a=this.y+70;t.moveTo(this.x,a),t.lineTo(this.x-40*l,a),t.lineTo(this.x-10*l,a+100),t.lineTo(this.x+20*l,a+100),t.lineTo(this.x+30*l,a),t.moveTo(this.x-10*l,a),t.lineTo(this.x-12*l,a-30),t.lineTo(this.x-20*l,a-30),t.lineTo(this.x-18*l,a),t.moveTo(this.x+15*l,a),t.lineTo(this.x+15*l,a-30),t.lineTo(this.x+7*l,a-30),t.lineTo(this.x+7*l,a),e.fill(t),e.shadowBlur=0;var s=new Path2D;e.fillStyle="rgba(40,40,40,"+this.health/100+")",s.moveTo(this.x+17*l,a+98),s.lineTo(this.x+19*l,a+75),s.lineTo(this.x+4*l,a+75),s.lineTo(this.x+9*l,a+98),e.fill(s)},reduceOffset:function(e){this.y<=i?(this.y=i,this.scrollComplete=!0):this.y-=e}}}function rnd(e,t){return Math.floor(Math.random()*(t-e+1))+e}function KeyStroke(e){this.currentLetter=e}function AvailableKeys(){this.keys=[];for(var e=65;91>e;e++)this.keys.push({key:e,available:!0})}function Attack(e,t){this.ctx=e,this.available=!1,this.special=t}function Sounds(){this.audioContext=new AudioContext,this.notes=[{notes:[-3,2,9],delay:.1,feedback:.4},{notes:[0,5,12],delay:.1,feedback:.4},{notes:[3,8,15],delay:.1,feedback:.4},{notes:[6,11,18],delay:.1,feedback:.4},{notes:[9,14,21,22,28,30,32,32,35,9,9,9],delay:.1,feedback:.6}],this.p2notes=[{notes:[-5,-2,-1],delay:.1,feedback:.4},{notes:[-3,0,1],delay:.1,feedback:.4},{notes:[-1,2,3],delay:.1,feedback:.4},{notes:[1,4,5],delay:.1,feedback:.4},{notes:[3,6,7,2,12,10,14,17,20,0,0,2,1],delay:.1,feedback:.4}]}function test(){var e=new AudioContext,t=e.createOscillator();t.type="square",t.frequency.value=220,t.detune.value=1500,t.connect(e.destination);for(var a=e.currentTime+.1,s=80,r=60/s/2,i=0;2>i;i++){var l=a+8*i*r;t.start(l),t.stop(l+r)}}KeyStroke.prototype.assignLetter=function(e){this.currentLetter=e},KeyStroke.prototype.getLetter=function(){return String.fromCharCode(this.currentLetter).toUpperCase()},KeyStroke.prototype.getRandom=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},AvailableKeys.prototype.getKey=function(){var e=rnd(0,this.keys.length-1),t=this.keys[e];return t.available?(this.keys[e].available=!1,t.key):this.getKey()},Attack.prototype.displayAttacks=function(e){this.available=!0,this.ctx.fillStyle="white",this.ctx.shadowBlur=20,this.ctx.shadowColor="white",this.ctx.fillText("fire",e.x-100,e.y),this.ctx.fillText("water",e.x,e.y-100),this.ctx.fillText("electric",e.x+105,e.y),this.special||(this.ctx.fillStyle="rgba(255,255,255,0.4)"),this.ctx.fillText("special",e.x,e.y+100),this.special||(this.ctx.fillStyle="white")},Attack.prototype.selectedAttack=function(e){this.available&&(this.ctx.textAlign="left",this.ctx.fillText(e+" selected",20,100))},Sounds.prototype.playSuccess=function(e,t){for(var a=.05,s=0-a,r=.15,i=1===t?this.notes:this.p2notes,l=0;l<i[e].notes.length;l++)this.play(s+=a,i[e].notes[l],r,i[e])},Sounds.prototype.play=function(e,t,a,s){var r=this.audioContext.currentTime+e,i=this.audioContext.createGain(),l=this.audioContext.createGain(),o=this.audioContext.createDelay(),n=this.audioContext.createGain();n.connect(this.audioContext.destination),o.delayTime.value=s.delay,l.gain.value=s.feedback,i.connect(n),i.connect(o),o.connect(l),l.connect(o),l.connect(n);var h=this.audioContext.createOscillator();h.connect(o),h.type="square",h.detune.value=100*t,h.start(r),h.stop(r+a)};
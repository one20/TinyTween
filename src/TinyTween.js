var TT = {
	timeline: [],
	paused: true,
	fps: 24,
	currentFrame: 0,
	noUnitProps: ['opacity'],
	onUpdate: null,
	finalFrame: 0,
	updateEvent: new Event('update'),
	select: function(selector){
		return document.querySelectorAll(selector);
	},
	create: function(selector, s,e){
		var timelineObject = {
			element: TT.select(selector),
			start: s,
			end: e,
			tweens: [],
			tween: function(sFrame,eFrame,sProps,eProps,ease){
				timelineObject.tweens.push({
					sFrame: sFrame,
					eFrame: eFrame,
					sProps: sProps,
					eProps: eProps,
					duration: eFrame - sFrame,
					ease: (ease)?ease:TT.defaultEase
				});
				return timelineObject;
			}
		};
		TT.timeline.push(timelineObject);
		TT.update();
		TT.finalFrame = (TT.finalFrame < e)?e:TT.finalFrame;
		return timelineObject;
	},
	update: function(){
		if(!TT.paused){
			setTimeout(function() {
				requestAnimationFrame(TT.update);
			}, 1000 / TT.fps);
			TT.currentFrame++;
		}
		if(TT.currentFrame > TT.finalFrame){
			TT.pause();
			return;
		} else {
			TT.apply(TT.timeline, function(timelineObject){
				if(timelineObject.start <= TT.currentFrame && timelineObject.end >= TT.currentFrame){
					TT.apply(timelineObject.element, function(el){
						el.style.display = 'block';
					});
					TT.apply(timelineObject.tweens, function(timelineObjTween){
						if(timelineObjTween.sFrame <= TT.currentFrame && timelineObjTween.eFrame >= TT.currentFrame){
							var twPlayhead = TT.currentFrame - timelineObjTween.sFrame;
							for(var i in timelineObjTween.sProps){
								var value = timelineObjTween.ease(twPlayhead,timelineObjTween.sProps[i],timelineObjTween.eProps[i]-timelineObjTween.sProps[i],timelineObjTween.duration);
								if(TT.noUnitProps.indexOf(i) == -1) value+='px';
								TT.apply(timelineObject.element, function(el){
									el.style[i] = value;
								});
							}
						}
					});
				} else {
					TT.apply(timelineObject.element, function(el){
						el.style.display = 'none';
					});
				}
			});
		}
	},
	apply: function(elementList, func){
		var a = elementList.length;
		while(a--){
			func(elementList[a]);
		}
	},
	defaultEase: function (t, b, c, d) {
	    return c * t / d + b;
	},
	play: function(){
		if(TT.paused){
			TT.paused = false;
			TT.update();
		}
	},
	pause: function(){
		TT.paused = true;
	},
	replay: function(){
		TT.pause();
		TT.setFrame(0);
		TT.play();
	},
	setFrame: function(frame){
		TT.currentFrame = frame;
		TT.update();
	}
}
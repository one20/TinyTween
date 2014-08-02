#TinyTween.js

A simple, small, frame-based animation plugin written in JS.

##Why?

TinyTween was conceived as an animation tool for creating HTML5 banner ads, focusing on small filesize and uses the concept of frames instead of creating time-based delays and tweens. This is a natural transition for those that have more experience working with animation timelines (e.g. Flash) and also gives the user more control over the code compared to SWF converters or any type of code generating software.

##Usage

```
<script type="text/javascript">

  	//Easing function
	function cubicInOut(t, b, c, d) {
		var ts=(t/=d)*t;
		var tc=ts*t;
		return b+c*(-2*tc + 3*ts);
	}
	
	//Set the animation 'frames per second', default is 24
	TT.fps = 40; 
	
	//Add the '#box1' element to the timeline, with a lifespan from frame 1 to 50
	var boxAnimation = TT.create('#box1', 1, 50);
	
	//Animate the 'left' css property of box from 0px to 200px between frames 1 to 50
	boxAnimation.tween(1,50,{left:0},{left:200},cubicInOut);
	
	//Animate the 'opacity' css property of box from 1 to 0 between frames 25 to 50
	boxAnimation.tween(25,50,{opacity:1},{opacity:0},cubicInOut);
	
	//Play the animation
	TT.play();
</script>
```

You could also chain the methods:

```
TT.create('#box1', 1, 200).tween(1,50,{left:0},{left:200},cubicInOut).tween(25,50,{opacity:1},{opacity:0},cubicInOut);
```

##Easing

All animations use a linear easing function by default. The ```tween()``` method accepts an optional fifth parameter where you can pass in an easing function of your choice.

Learn more about easing equations from Robert Penner: http://www.robertpenner.com/easing/

##Dependencies

TinyTween.js is written in raw javascript, which means that it's not dependent on any frameworks or libraries.

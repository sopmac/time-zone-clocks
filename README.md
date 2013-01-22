time-zone-clocks
================

[![](https://raw.github.com/Claromentis/time-zone-clocks/master/screenshot.png)](https://raw.github.com/Claromentis/time-zone-clocks/master/screenshot.png)

JS clocks drawn using canvas


Copy this javascript to your project:
```javascript
	<script src="js/raphael-min.js"></script>
	<script type="text/javascript">
		  var Clock = function(id,diff) {
			    this.id = id;
			    this.diff = diff;
			  };
			  Clock.prototype.drawClock = function(width, fillColor, strokeColor, pinColor, hourHandColor, minuteHandColor, secondHandColor) {
			    canvas = Raphael(this.id,width, width);
			    var clock = canvas.circle(width*.5,width*.5, width * .475);
			    clock.attr({"fill":fillColor,"stroke":strokeColor,"stroke-width":(width*.01)})
			    var hour_sign;
			    for(i=0;i<12;i++){
			      var start_x = width*.5+Math.round((width*.4)*Math.cos(30*i*Math.PI/180));
			      var start_y = width*.5+Math.round((width*.4)*Math.sin(30*i*Math.PI/180));
			      var end_x = width*.5+Math.round((width*.45)*Math.cos(30*i*Math.PI/180));
			      var end_y = width*.5+Math.round((width*.45)*Math.sin(30*i*Math.PI/180));
			      hour_sign = canvas.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y);
			    }
			    this.hour_hand = canvas.path("M" + width*.5 + " " + width*.5 + "L" + width*.5 + " " + (width*.25) + "");
			    this.hour_hand.attr({stroke: hourHandColor, "stroke-width": width*.03});
			    this.minute_hand = canvas.path("M" + width*.5 + " " + width*.5 + "L" + width*.5 + " " + (width*.2) + "");
			    this.minute_hand.attr({stroke: minuteHandColor, "stroke-width": width*.02});
			    this.second_hand = canvas.path("M" + width*.5 + " " + (width*.55) + "L" + width*.5 + " " + (width*.125) + "");
			    this.second_hand.attr({stroke: secondHandColor, "stroke-width": width*.01});
			    var pin = canvas.circle(width*.5, width*.5, width*.025);
			    pin.attr("fill", pinColor);
			    this.updateClock(width)
			    var self = this;
			    setInterval(function() {
			      self.updateClock(width);
			    }, 1000);
			  };

			Clock.prototype.updateClock = function(width) {
			  // get system time
			  var now = new Date();
			  var timeZoneTime = (parseInt(now.getHours() + (now.getTimezoneOffset() / 60))) + parseInt(this.diff);
			  var thisDate = dateAdd('h', now, (now.getTimezoneOffset() / 60) + parseInt(this.diff) );
			  var target = jQuery(this).attr("id");
			  // var splitPoint = thisDate.getFullYear();
			  // var shortDate = thisDate.toLocaleString().split(splitPoint);

			  //This part of the function gets the time and convertes it to 12 hour with AM and PM
			  var hh = thisDate.getHours();
			  var m = thisDate.getMinutes();
			  var dd = "AM";
			  var h = hh;

			  if (h >= 12) {
			    h = hh-12;
			    dd = "PM";
			  }
			  if (h == 0) {
			    h = 12;
			  }
			  m = m<10?"0"+m:m;
			  h = h<10?"0"+h:h;
			  jQuery("#" + target).siblings(".digi-time").html(h + ":" + m + " " + dd);
			  if (dd === "PM") {
			    jQuery("#" + target).find('circle').css('fill','#eee');
			  }

			  //This part of the function extracts the date and returns is in the format {Month xx}
			  var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
			  var today = thisDate.getDate();
			  var thisMonth = monthNames[thisDate.getMonth()];
			  var todaysDate = thisMonth + " " + today;
			  jQuery("#" + target).siblings(".date").html(todaysDate);
			  var hours = timeZoneTime;
			  var minutes = thisDate.getMinutes();
			  var seconds = thisDate.getSeconds();
			  this.hour_hand.transform("r" + (30*hours+(minutes/2.5)) + "," + width*.5 + "," + width*.5);
			  this.minute_hand.transform("r" + 6*minutes + "," + width*.5 + "," + width*.5);
			  this.second_hand.transform("r" + 6*seconds + "," + width*.5 + "," + width*.5);
			}

			function dateAdd(ItemType, DateToWorkOn, ValueToBeAdded) {
			   switch (ItemType) {
			               //date portion
			               case 'd': //add days
			                       DateToWorkOn.setDate(DateToWorkOn.getDate() + ValueToBeAdded);
			                       break;
			               case 'm': //add months
			                       DateToWorkOn.setMonth(DateToWorkOn.getMonth() + ValueToBeAdded);
			                       break;
			               case 'y': //add years
			                       DateToWorkOn.setYear(DateToWorkOn.getFullYear() + ValueToBeAdded);
			               break;
			               //time portion
			               case 'h': //add days
			                       DateToWorkOn.setHours(DateToWorkOn.getHours() + ValueToBeAdded);
			                       break;
			               case 'n': //add minutes
			                       DateToWorkOn.setMinutes(DateToWorkOn.getMinutes() + ValueToBeAdded);
			                       break;
			               case 's': //add seconds
			                       DateToWorkOn.setSeconds(DateToWorkOn.getSeconds() + ValueToBeAdded);
			                       break;
			   }
			   return DateToWorkOn;
			}
	</script>
```
Your HTML should look similar to this one:
```html
	<!doctype html>
	<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
	<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
	<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
	<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
	<head>

		<meta charset="utf-8">
		<title>Clocks</title>
		<meta name="description" content="Clocks plugin">
		<meta name="viewport" content="width=device-width">
	</head>
	<body>
		<header>
			<h1>Clocks!</h1>
		</header>
		<!-- The headers aren't required but they help! Apart from that, the mark needs to be as follows  -->
		<div>
			<h3>NY</h3>			
			<div id="ny"></div>			
			<span class="date"></span>
		</div>

		<div>
			<h3>Paris/Dresden</h3>			
			<div id="paris"></div>			
			<span class="date"></span>
		</div>	

		<!-- jQuery is already included in core so you probably dont need to include this -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

		<!-- Raphael is needed for this plugin to work. -->
		<script src="js/raphael-min.js"></script>
		<script src="js/functions.js"></script>

		<!-- This is where we declare the clock objects. An element id and time difference needs to be specified
		The drawClock methd takes the follow paramaters:
			- width
			- fillColor 
			- strokeColor
			- pinColor
			- hourHandColor 
			- minuteHandColor 
			-secondHandColor-->
		<script type="text/javascript">
			var nyClock = new Clock("ny", "-5");
			nyClock.drawClock("75","#fff","#666","#000","#000","#000","#000");
			
			var parisClock = new Clock("paris", "2");
			parisClock.drawClock("75","#fff","#666","#000","#000","#000","#000");
		</script>	  
	</body>
</html>
```
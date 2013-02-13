Time Zone Clocks
================

[![](https://raw.github.com/Claromentis/cla-time-zone-clocks/master/screenshot.png)](https://raw.github.com/Claromentis/time-zone-clocks/master/screenshot.png)

Object Orientated time zone clocks using highcharts.

Note: This needs the included version of the higcharts library and therefore will not work on pages that already include our core version.

Include the required JavaScript from your HTML page:

```html

<!--@head@
	<script src="/interface_surface/js/highcharts.js"></script>
	<script src="/interface_surface/js/highcharts-more.js"></script>
	<script src="/interface_surface/js/clocks.js" type="text/javascript"></script>
-->

```
Your markup should look something like this:

```html

	<h4>Japan/Korea</h4>

	<small class="digi-time"></small>

	<div id="jst"></div>

	<small class="date"></small>

```

Then just instantiate as follows:

```html

	<script type="text/javascript">
	
		var jstClock = new Clock("jst","9");
		jstClock.drawClock();

	</script>

```

Enjoy!
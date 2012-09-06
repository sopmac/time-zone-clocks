/*-- Clock control functions --*/

var Clock = function(id,diff) {
  this.id = id;
  this.diff = diff;
};

// Draw clock method

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

  var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  var today = thisDate.getDate();
  var thisMonth = monthNames[thisDate.getMonth()];

  var todaysDate = thisMonth + " " + today;

  // Injects todays date into target element
  jQuery("#" + target).siblings(".date").html(todaysDate);

  var hours = timeZoneTime;
  var minutes = thisDate.getMinutes();
  var seconds = thisDate.getSeconds();
  this.hour_hand.transform("r" + (30*hours+(minutes/2.5)) + "," + width*.5 + "," + width*.5);
  this.minute_hand.transform("r" + 6*minutes + "," + width*.5 + "," + width*.5);
  this.second_hand.transform("r" + 6*seconds + "," + width*.5 + "," + width*.5);
}

// This function works out the date once the time difference has been added

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
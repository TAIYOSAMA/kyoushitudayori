const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height/5*6;

// -------関数達-------
const DrawLine = function(x,y,x1,y1,thickness=4) {
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x1,y1);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = thickness;
  ctx.lineCap = 'square';
  ctx.stroke();
};

const FillArea = function(x,y,x1,y1,color='#ababab') {
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x,y1);
  ctx.lineTo(x1,y1);
  ctx.lineTo(x1,y);
  ctx.fillStyle = color;
  ctx.lineCap = 'square';
  ctx.fill();
};

const DrawText = function(text,x,y,x1,y1,fontSize=32,color='black') {
  x = (x+x1)/2;
  y = (y+y1)/2+calendar_cell_height*0.257;
  ctx.beginPath();
  ctx.textBaseline = 'center';
	ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.font = String(fontSize)+'px sans-serif';
  ctx.fillText(String(text),x,y);
};

const DrawCircle = function(default_x,default_y,radius,thickness=4,color='black') {
  ctx.beginPath();
  ctx.moveTo(default_x+radius,default_y);
  let x;
  let y;
  for (let angle=0; angle<=360; angle++) {
    x = Math.cos(angle)*radius + default_x;
    y = Math.sin(angle)*radius + default_y;
    ctx.lineTo(x,y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.stroke();
};

const DrawCross = function(x,y,thickness=4,size=100,color='black') {
  ctx.beginPath();
  ctx.moveTo(x+size/2,y+size/2);
  ctx.lineTo(x-size/2,y-size/2);
  ctx.moveTo(x+size/2,y-size/2);
  ctx.lineTo(x-size/2,y+size/2);
  ctx.lineWidth = thickness*2;
  ctx.strokeStyle = color;
  ctx.stroke();
};

// -------日にち関係-------
const GetAllDay = function(year,month) {
  return new Date(year,month,0).getDate();
};

const GetHolidays = function(year,month,days) {
  var holidays = [];
  for (let i=1; i<=days; i++) {
    var weekday = new Date(year,month-1,i).getDay();
    var holiday = amaitortedays.isNationalHoliday(new Date(year,month-1,i),0);
    if (weekday==0 || holiday!=null) {
      holidays.push(i);
    };
  };
  return holidays;
};

const GetHolidaysName = function(year,month,days) {
  var holidays_name = [];
  for (let i=1; i<=days; i++) {
    holiday = amaitortedays.isNationalHoliday(new Date(year,month-1,i),0);
    weekday = new Date(year,month-1,i).getDay();
    if (holiday!=null) {
      holidays_name.push(String(i)+'日 '+holiday);
    };
  };
  return holidays_name;
};

const GetStartDay = function(year,month) {
  return new Date(year,month-1,1).getDay();
}

const GetWeekday = function() {
  let weekdays = [];
  const weekday = new URL(window.location.href).searchParams.get('weekdays');
  for (let i=0; i<weekday.length; i++) {
    if (weekday[i]==',') {
      continue;
    };
    weekdays.push(parseInt(weekday[i]));
  };
  return weekdays;
};

const GetKyoshitu = function(year,month,days) {
  let kyoshitubi = [];
  let weekdays = GetWeekday()
  for (let i=1; i<=days; i++) {
    weekday = new Date(year,month-1,i).getDay();
    for (let j=0; j<weekdays.length; j++) {
      if (weekday==weekdays[j]) {
        kyoshitubi.push(i);
      };

    };
  };
  return kyoshitubi;
};

const GetKyoshituHoliday = function() {
  let kyoshitu_holidays = [];
  let kyoshitu_holiday = new URL(window.location.href).searchParams.get('kyoshitu_holiday');
  let kh='';
  console.log(kyoshitu_holiday);
  for (let i=0; i<=kyoshitu_holiday.length; i++) {
    if (kyoshitu_holiday[i]==',' || i == kyoshitu_holiday.length) {
      kyoshitu_holidays.push(parseInt(kh));
      kh='';
      continue;
    };
    kh+=kyoshitu_holiday[i];
  };
  console.log(kyoshitu_holidays);
  return kyoshitu_holidays;
};

// -------変数-------
const year = new URL(window.location.href).searchParams.get('year');
const month = new URL(window.location.href).searchParams.get('month');;

const days = GetAllDay(year,month);
const holidays = GetHolidays(year,month,days);
const holidays_name = GetHolidaysName(year,month,days);
const day_start = GetStartDay(year,month);
const day_name = ['日','月','火','水','木','金','土'];
const kyoshitu_holiday = GetKyoshituHoliday();
const kyoshitubi = GetKyoshitu(year,month,days);

const white_space = canvas.height/16;
const calendar_height = canvas.height-white_space*2;
const calendar_width = canvas.width-white_space*2;
const calendar_cell_height = calendar_height/9;
const calendar_cell_width = calendar_width/7;
const calendar_cell_height_number = Math.ceil((days+day_start)/7)+1;
const calendar_cell_width_number = 7;
const calendar_start_x = white_space;
const calendar_finish_x = calendar_start_x+calendar_cell_width_number*calendar_cell_width;
const calendar_start_y = white_space+calendar_cell_height;
const calendar_finish_y = calendar_start_y+calendar_cell_height*calendar_cell_height_number;

//---------------

// 休日の背景を塗る
var x = 0;
var y = 1;
for (let day=-day_start+1; day<=days; day++) {
  for (let i=0; i<=holidays.length; i++) {
    if (day==holidays[i]) {
      FillArea(calendar_start_x+calendar_cell_width*x,calendar_start_y+calendar_cell_height*y,calendar_start_x+calendar_cell_width*(x+1),calendar_start_y+calendar_cell_height*(y+1));
    };
  };
  x++;
  if (x>6) {
    x = 0;
    y++;
  };
};

// 日付を入力する
var x = 0;
var y = 1;
for (let day=-day_start+1; day<=days; day++) {
  if (day>0) {
    DrawText(String(day),calendar_start_x+calendar_cell_width*x,calendar_start_y+calendar_cell_height*y,calendar_start_x+calendar_cell_width*(x+1),calendar_start_y+calendar_cell_height*(y+1),calendar_cell_height*0.71);
  };
  x++;
  if (x>6) {
    x = 0;
    y++;
  };
};

// 日から土までを入力する
for (let x=0; x<7; x++) {
  DrawText(day_name[x],calendar_start_x+calendar_cell_width*x,calendar_start_y,calendar_start_x+calendar_cell_width*(x+1),calendar_start_y+calendar_cell_height,calendar_cell_height*0.71);
};

// 枠を作成
for (let y=calendar_start_y; Math.floor(y*10**10)/10**10<=Math.floor(calendar_finish_y*10**10)/10**10; y+=calendar_cell_height) {
  var thickness=canvas.height/16/25;
  if (y==calendar_start_y || Math.floor(y*10**10)/10**10==Math.floor(calendar_finish_y*10**10)/10**10) {
    thickness=canvas.height/16/100*8;
  };
  DrawLine(calendar_start_x,y,calendar_finish_x,y,thickness);
};
for (let x=calendar_start_x; Math.floor(x*10**10)/10**10<=Math.floor(calendar_finish_x*10**10)/10**10; x+=calendar_cell_width) {
  var thickness=canvas.height/16/25;
  if (x==calendar_start_x || Math.floor(x*10**10)/10**10==Math.floor(calendar_finish_x*10**10)/10**10) {
    thickness=canvas.height/16/100*8;
  };
  DrawLine(x,calendar_start_y,x,calendar_finish_y,thickness);
};

// ooの教室日を入力
DrawText(String(month)+'月の教室日',calendar_start_x,20,calendar_finish_x,calendar_start_y,calendar_cell_height*0.836);

// 祝日の詳細を入力
var x = calendar_start_x;
var y = calendar_finish_y;
for (let i=0; i<holidays_name.length; i++) {
  DrawText(holidays_name[i],x,y,x+calendar_width/3,y+calendar_cell_height/2,calendar_cell_height*0.322);
  x+=calendar_width/3;
  if (x==calendar_width) {
    x = 0;
    y+=calendar_cell_height/2;
  };
};

// ○と×を入力
var x = 0;
var y = 1;
thickness = 5;
let draw_x;
let draw_y;
let j;
for (let day=-day_start+1; day<=days; day++) {
  draw_x = calendar_start_x + calendar_cell_width * (x + 1/2) ;
  draw_y = calendar_start_y + calendar_cell_height * (y + 1/2) ;
  for (let i=0; i<kyoshitubi.length; i++) {
    if (kyoshitubi[i]==day) {
      for (j=0; j<kyoshitu_holiday.length; j++) {
        if (kyoshitu_holiday[j]==day) {
          DrawCross(draw_x,draw_y,thickness,52);
          break;
        };
      };
      if (kyoshitu_holiday[j]!=day) {
        console.log(j);
        DrawCircle(draw_x,draw_y,37,thickness);
        break;
      };
    };
  };
  x++;
  if (x>6) {
    x = 0;
    y++;
  };
};

const GoToPage1 = function() {
  window.location = '../page1/index.html'
}

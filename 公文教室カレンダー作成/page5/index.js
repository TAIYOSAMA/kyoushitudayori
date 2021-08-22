const year = new URL(window.location.href).searchParams.get('year');
const month = new URL(window.location.href).searchParams.get('month');
const days = new Date(year,month,0).getDate();
const day_start = new Date(year,month-1,1).getDay();
const max_row = Math.ceil((days+day_start)/7);
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
const weekdays = GetWeekday();

const select_menu = document.getElementById('select_menu');
let day = 1-day_start;
let kyoshitu_holiday = [];
for (let row=1; row<=max_row; row++) {
  var row_element = document.createElement('div');
  row_element.className = 'row';
  row_element.setAttribute('id','row'+String(row));
  select_menu.appendChild(row_element);
  for (let column=1; column<=7; column++) {
    var column_element = document.createElement('span');
    if (day>0 && day<=days) {
      column_element.textContent = String(day)+'日';
      column_element.className = 'dummy_btn';
      for (let i=0; i<weekdays.length; i++) {
        if (new Date(year,month-1,day).getDay() == weekdays[i]) {
          column_element.className = 'yes_btn';
          column_element.setAttribute('id',String(day));
          column_element.onclick = function() {
            if (this.className=='yes_btn') {
              this.className = 'no_btn';
              kyoshitu_holiday.push(this.id);
            } else {
              this.className = 'yes_btn';
              kyoshitu_holiday.splice(kyoshitu_holiday.indexOf(this.id),1);
            };
            console.log(kyoshitu_holiday);
          };
        };
      };
    } else {
      column_element.className = 'not_exist';
    };
    row_element.appendChild(column_element);
    day++;
  };
};

const GoToPage6 = function() {
  if (kyoshitu_holiday.length<1) {
    kyoshitu_holiday=0;
  };
  window.location = '../page6/index.html?year='+String(year)+'&month='+String(month)+'&weekdays='+String(weekdays)+'&kyoshitu_holiday='+String(kyoshitu_holiday);
};

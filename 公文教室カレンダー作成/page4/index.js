const weekdays = ['日','月','火','水','木','金','土'];
let select_weekdays = [];
const select_menu = document.getElementById('select_menu');
for (let column=0; column<7; column++) {
  var weekday = column;
  var weekday_btn = document.createElement('span');
  weekday_btn.className = 'no_select_btn';
  weekday_btn.setAttribute('id', String(weekday));
  weekday_btn.textContent = weekdays[weekday];
  weekday_btn.onclick = function() {
    if (this.className=='no_select_btn') {
      this.className = 'yes_select_btn';
      select_weekdays.push(this.id);
    } else {
      this.className = 'no_select_btn';
      select_weekdays.splice(select_weekdays.indexOf(this.id),1);
    };
    if (select_weekdays.length>0) {
      document.getElementById('next_btn').className = 'yes_next_btn';
      document.getElementById('next_btn').onclick = function() {
        if (select_weekdays.length>0) {
          const year = new URL(window.location.href).searchParams.get('year');
          const month = new URL(window.location.href).searchParams.get('month');
          window.location = '../page5/index.html?year='+String(year)+'&month='+String(month)+'&weekdays='+String(select_weekdays);
        };
      };
    } else {
      document.getElementById('next_btn').className = 'no_next_btn';
      document.getElementById('next_btn').removeAttr("onclick");
    }
    console.log(select_weekdays);
  };
  select_menu.appendChild(weekday_btn);
};

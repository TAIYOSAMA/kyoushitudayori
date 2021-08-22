let month = 1;
for (let row=1; row<=3; row++) {
  var element = document.getElementById('row'+String(row));
  for (let column=1; column<=4; column++) {
    var column_element = document.createElement('span');
    column_element.className = 'btn';
    column_element.setAttribute('id',String(month));
    column_element.textContent = String(month)+'月';
    column_element.onclick = function() {
      window.location = '../page4/index.html?year='+String(year)+'&month='+String(this.id);
    };
    element.appendChild(column_element);
    console.log(month);
    month++;
  };
};


const year = new URL(window.location.href).searchParams.get('year');

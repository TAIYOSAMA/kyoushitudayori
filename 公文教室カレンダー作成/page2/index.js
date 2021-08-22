const element = document.getElementById('btns');
const year = new Date().getFullYear();
for (let i=year-1; i<=year+1; i++) {
  var new_element = document.createElement('span');
  new_element.className = 'btn';
  new_element.setAttribute('id',String(i));
  new_element.textContent = String(i)+'年';
  new_element.onclick = function() {
    window.location = '../page3/index.html?year='+String(this.id);
  }
  element.appendChild(new_element);
}

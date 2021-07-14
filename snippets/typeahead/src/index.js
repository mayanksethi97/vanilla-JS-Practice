// document.getElementById('typeahead').addEventListener('onkeyup', () => {console.log('sva')})
import "./style.css"

/** custom implementation of debouce time */
document.getElementById('typeahead').onkeyup = getData

let timer;
function getData(){
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const res = await fetch('https://reqres.in/api/users');
    const data = await res.json();
    console.log(data);
  }, 500)  
}

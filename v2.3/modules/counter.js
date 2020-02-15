export default function startTime() {
  let today = new Date();
  let hr = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  //Add a zero in front of numbers<10
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById('clockTimer').innerHTML = `${hr} : ${min} : ${sec}`;
  let time = setTimeout(function() {
    startTime();
  }, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

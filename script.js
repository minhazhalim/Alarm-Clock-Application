const h1 = document.querySelector('h1');
const content = document.querySelector('.content');
const button = document.querySelector('button');
const select = document.querySelectorAll('select');
const ringtone = new Audio('./files/ringtone.mp3');
let alarmTime;
let isAlarmSet;
for(let i = 12;i > 0;i--){
     i = i < 10 ? `0${i}` : i;
     let option = `<option value="${i}">${i}</option>`;
     select[0].firstElementChild.insertAdjacentHTML('afterend',option);
}
for(let i = 59;i >= 0;i--){
     i = i < 10 ? `0${i}` : i;
     let option = `<option value="${i}">${i}</option>`;
     select[1].firstElementChild.insertAdjacentHTML('afterend',option);
}
for(let i = 2;i > 0;i--){
     let amPm = i == 1 ? 'AM' : 'PM';
     let option = `<option value="${amPm}">${amPm}</option>`;
     select[2].firstElementChild.insertAdjacentHTML('afterend',option);
}
setInterval(() => {
     let date = new Date();
     let hour = date.getHours();
     let minute = date.getMinutes();
     let second = date.getSeconds();
     let amPm = 'AM';
     if(hour >= 12){
          hour = hour - 12;
          amPm = 'PM';
     }
     hour = hour == 0 ? hour = 12 : hour;
     hour = hour < 10 ? '0' + hour : hour;
     minute = minute < 10 ? '0' + minute : minute;
     second = second < 10 ? '0' + second : second;
     h1.innerText = `${hour}:${minute}:${second} ${amPm}`;
     if(alarmTime === `${hour}:${minute} ${amPm}`){
          ringtone.play();
          ringtone.loop = true;
     }
});
function setAlarm(){
     if(isAlarmSet){
          alarmTime = "";
          ringtone.pause();
          content.classList.remove('disable');
          button.innerText = 'Set Alarm';
          return isAlarmSet = false;
     }
     let time = `${select[0].value}:${select[1].value} ${select[2].value}`;
     if(time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')){
          return alert('Please, Select a Time to Set Alarm !');
     }
     alarmTime = time;
     isAlarmSet = true;
     content.classList.add('disable');
     button.innerText = 'Clear Alarm';
}
button.addEventListener('click',setAlarm);
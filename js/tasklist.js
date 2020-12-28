'use strict';

$(function(){

$('#taskscount').html("Количество задач "+localStorage.length+", добавить можно <a href='./addtask.html'>тут</a>");

function generateTable(key,date,taskname,tasktext,users) {
    let table = $('tbody');
    table.append(`"<tr>><td>${key}</td><td>${date}</td><td>${taskname}</td><td>${tasktext}</td><td>${users}</td></tr>"`);
}

function sortDateAsc(a,b){
    return new Date(JSON.parse(localStorage.getItem(a)).datecorrect) - new Date(JSON.parse(localStorage.getItem(b)).datecorrect);
 }

 function sortDateDes(a,b){
    return new Date(JSON.parse(localStorage.getItem(b)).datecorrect) - new Date(JSON.parse(localStorage.getItem(a)).datecorrect);
 }

function locstoreParse(arr) {
    $('tbody').children().remove();
    arr.map(key => {
        let deserialize = JSON.parse(localStorage.getItem(key));
        let taskname = deserialize.taskname;
        let tasktext = deserialize.tasktext;
        let users = deserialize.users;
        let date = deserialize.date;
        generateTable(key,date,taskname,tasktext,users);
    });
}


$('#down').click(function(){
    let sortarr = arrayFromlocalstor.sort(sortDateAsc);
    locstoreParse(sortarr);
});   

$('#up').click(function(){
    let sortarr = arrayFromlocalstor.sort(sortDateDes);
    locstoreParse(sortarr);
}); 

$('tbody').click(function(e) {
    let selectRow = e.target.parentNode;
    $(selectRow).toggleClass('selected');
});  

$('#remtsk').click(function() {
  let elem = $('.selected').remove();
  for (let i of elem) {
      let id = $(i).children()[0].textContent;
      localStorage.removeItem(id);
  }
  $('#taskscount').html("Количество задач "+localStorage.length+", добавить можно <a href='./addtask.html'>тут</a>");
}); 

let arrayFromlocalstor = [];
for (let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    arrayFromlocalstor.push(key);
    let deserialize = JSON.parse(localStorage.getItem(key));
    let taskname = deserialize.taskname;
    let tasktext = deserialize.tasktext;
    let users = deserialize.users;
    let date = deserialize.date;
    generateTable(key,date,taskname,tasktext,users);
}
});
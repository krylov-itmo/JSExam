'use strict';

$(function(){

function dateRecovery(date) {

        let time = date.split(" ")[0];
        let data = date.split(" ")[1];
        let year = data.split(".")[2];
        let mounth = +data.split(".")[1]-1;
        let day = data.split(".")[0];
        let hours = time.split(":")[0];
        let mins = time.split(":")[1];    
        let d = new Date(year,mounth,day,hours,mins).getTime();
        return d;
}

let arrayFromlocalstor = [];
function showTask() {
    for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let validdate = dateRecovery(key);
        let val = localStorage.getItem(key)
        localStorage.setItem(validdate,val)
        let deserialize = JSON.parse(localStorage.getItem(key));
        let taskname = deserialize.taskname;
        let tasktext = deserialize.tasktext;
        let users = deserialize.users;
        arrayFromlocalstor.push(validdate);
        //generateTable(key,taskname,tasktext,users);
    }   
}

function generateTable(key,taskname,tasktext,users) {
    let table = $('#table');
    table.append(`"<tr><td>${key}</td><td>${taskname}</td><td>${tasktext}</td><td>${users}</td</tr>"`);
}
showTask();
let sorted = arrayFromlocalstor.sort(function(a,b){
    return a-b;
 });


 $('#sortbydate').click(function(){
    let arr = arrayFromlocalstor.sort(function(a,b){
        return a-b;
     });
    //  for (let key in arr){
    //      let data = new 
    //  }
}); 
 console.log(sorted);
});
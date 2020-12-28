'use strict';

$(function(){

let rulesForALL = {
	name: [5,20,"#taskname","Имя задачи должно быть от 5 до 20 символов"],
	text: [10,100,"#tasktext","Описание задачи должно быть от 10 до 100 символов"],
	date: [new Date(),"#deadline","Дата вводится в формате HH:MM DD.MM.YYYY и не может быть раньше текущего времени"], 
	users: [2,5,"#users","В задачу могут быть добавлены от 2х до 5ти пользователей, с именем больше 0"]

};

let validator = {
	
	validate_textfeild(arr){
		let input = arr;
		let [min, max, idfield, error] = input;
		let field = $(idfield);
		let val = field.val();
		val = val.trim();
		if (val.length < min || val.length > max){
			field.addClass('errorfield');
			$('#errormessage').html('<p>'+error+'</p>');
			return false;
		}
		field.removeClass('errorfield');
		$('#errormessage').children().remove()
		return true;
	},

	validate_deadline(arr){
		let input = arr;
		let [min, idfield, error] = input;
		let field = $(idfield);
		let val = field.val();
		val = val.trim();
		try {
			let timeval = val.split(" ")[0].split(':');
			let dateval = val.split(" ")[1].split('.');
			dateval[1] -= 1;
			let date = new Date(dateval[2],dateval[1],dateval[0],timeval[0],timeval[1]);
			if (date.getFullYear() == dateval[2] && date.getMonth() == dateval[1] && date.getDate() == dateval[0] && date.getHours() == timeval[0] && date.getMinutes() == timeval[1] && min < date) {
				field.removeClass('errorfield');
				$('#errormessage').children().remove();
				return true;
			} else {
				field.addClass('errorfield');
				$('#errormessage').html('<p>'+error+'</p>');
				return false;
			}
		}
		catch {
			field.addClass('errorfield');
			$('#errormessage').html('<p>'+error+'</p>');
			return false;
		}

	},
	
	validate_users(arr) {
		let input = arr;
		let [min, max, idfield, error] = input;
		let field = $(idfield);
		let val = field.val();
		val = val.trim();
		let arrusers = val.split(',');
		let clear = arrusers.map(user => user.trim());
		let valfix = clear.join();
		field.val(valfix);
		if (clear.length < min || clear.length > max){
			field.addClass('errorfield');
			$('#errormessage').html('<p>'+error+'</p>');
			return false;
		}
		let userarr = val.split(',');
		for (let u of userarr) {
			if (!u) {
				field.addClass('errorfield');
				$('#errormessage').html('<p>'+error+'</p>');
				return false;
			}
		}
		field.removeClass('errorfield');
		$('#errormessage').children().remove();
		return true;
	}

};

function timeConvert(inputtext) {
	let time= inputtext.split(" ")[0].split(':');
	let date = inputtext.split(" ")[1].split('.');
	date[1] -= 1;
	date = new Date(date[2],date[1],date[0],time[0],time[1]);
	return date;
}

function genId(){
	if (localStorage.length>0) {
		let id = [];
		for (let i=0; i<localStorage.length; i++) {
			let key = localStorage.key(i);
			id.push(key);
		}
		let maxid = id.sort().reverse()[0];
		return +maxid+1;
	}	
	return 1;
}

$('#adduserbtn').click(function(e) {
	if (!taskname.val() || !tasktext.val() || !deadline.val()) {
		$('#errormessage').html('<p>Сначало заполните основные поля</p>');
	}
	if (!(validator.validate_textfeild.call(null,rulesForALL.name) && validator.validate_textfeild.call(null,rulesForALL.text) && validator.validate_deadline.call(null,rulesForALL.date) && validator.validate_users.call(null,rulesForALL.users))) {
		$('#errormessage').html('<p>Проверьте правильность основных полей</p>');
	}
	else {
		e.preventDefault();
		$('fieldset').toggleClass('hidedefault');
	}	
});

let taskname = $('#taskname');
let tasktext = $('#tasktext');
let deadline = $('#deadline');
let users = $('#users');
taskname.on("keyup", validator.validate_textfeild.bind(null,rulesForALL.name));
tasktext.on("keyup", validator.validate_textfeild.bind(null,rulesForALL.text));
deadline.on("keyup", validator.validate_deadline.bind(null,rulesForALL.date));
users.on("keyup", validator.validate_users.bind(null,rulesForALL.users));

$('#form').submit(function(e) {
	e.preventDefault();
		if (validator.validate_textfeild.call(null,rulesForALL.name) && validator.validate_textfeild.call(null,rulesForALL.text) && validator.validate_deadline.call(null,rulesForALL.date) && validator.validate_users.call(null,rulesForALL.users) ) {
			let out = {};
			out.taskname = taskname.val();
			out.tasktext = tasktext.val();
			out.users = users.val();
			out.date = deadline.val();
			out.datecorrect = timeConvert(out.date);
			let localStorageKey =  genId();
			let localStorageVal = JSON.stringify(out);
			localStorage.setItem(localStorageKey,localStorageVal);
			$('#errormessage').html(`<p>Задача с id: ${localStorageKey},<br> именем: ${out.taskname},<br> сроком до: ${out.date},<br> будет добавлена ${out.users.split(',').length} пользователям: ${out.users}</p>`);
		} else {
			$('#errormessage').text('Ошибка входящих данных');
		}
	});

});
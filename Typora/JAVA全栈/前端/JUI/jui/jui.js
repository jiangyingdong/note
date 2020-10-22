function check() {
	console.log("进行表单验证");
	var flag = true;
	var username = document.getElementById("username").value;
	console.log(username);
	if (!/^[a-zA-Z0-9_-]{1,10}/.test(username)) {
		flag = false;
		document.getElementById("username_tip").innerHTML = "用户名只能由字母数字和下划线组成！";
	} else {
		document.getElementById("username_tip").innerHTML = "";
	}
	var password = document.getElementById("password").value;
	if (!/^\w{3,12}$/.test(password)) {
		flag = false;
		document.getElementById("password_tip").innerHTML = "密码只能由包括下划线的任何3-12个单词字符组成！"
	} else {
		document.getElementById("password_tip").innerHTML = "";
	}
	return false;
}

function clear_tip(form) {
	console.log("清理提示信息");
	console.log(jui.from_check(/^[a-zA-Z0-9_-]{1,10}/, 'username'));
	var username_tip = document.getElementById("username_tip");
	var password_tip = document.getElementById("password_tip");
	username_tip.innerHTML = "";
	password_tip.innerHTML = "";
	return true;
}

var jui = {
	check: {
		from_check: function(regex, id) {
			return regex.test(document.getElementById(id).value);
		}
	},
	fileSelect: function(id, me) {
		console.log(me);
		var file = document.getElementById(id);
		file.onchange = function() {
			console.log(me.innerHTML);
			var a = file.value.split('\\');
			me.innerHTML = a[a.length - 1];
		};
		file.click();
	},
	paging: function(id, currentPage, totalPages, url) {
		var p = document.getElementById(id);
		var pre = currentPage - 1;
		var next = currentPage + 1;
		if (pre < 1) pre = 1;
		if (next > totalPages) next = totalPages;
		console.log(p.innerHTML);
		if (currentPage != 1) {
			p.innerHTML += "<a href='" + url + "?currentPage=" + pre +
				"'><button type='button' class='jui-btn btn-dark'><svg width='1em' height='1.5em' viewBox='0 0 16 16' class='bi bi-caret-left' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z' /></svg></button></a>";
			p.innerHTML += "<a href='" + url + "?currentPage=" + 1 + "'><button type='button' class='jui-btn btn-dark'>" + 1 +
				"</button></a>";
			if (currentPage > 2) {
				p.innerHTML += "<font size='6'>...</font>";
			}
		}
		p.innerHTML += "<a><button type='button' class='jui-btn btn-danger'>" + currentPage + "</button></a>";
		if (currentPage + 1 < totalPages) {
			p.innerHTML += "<a href='" + url + "?currentPage=" + (currentPage + 1) +
				"'><button type='button' class='jui-btn btn-dark'>" + (currentPage + 1) + "</button></a>";
		}
		if (currentPage + 2 < totalPages) {
			p.innerHTML += "<a href='" + url + "?currentPage=" + (currentPage + 2) +
				"'><button type='button' class='jui-btn btn-dark'>" + (currentPage + 2) + "</button></a>";
		}
		if (currentPage + 3 < totalPages) {
			p.innerHTML += "<font size='6'>...</font>";
		}
		if (currentPage != totalPages) {
			p.innerHTML += "<a href='" + url + "?currentPage=" + totalPages +
				"'><button type='button' class='jui-btn btn-dark'>" + totalPages + "</button></a>";
		}
		if (currentPage != totalPages) {
			p.innerHTML += "<a href='" + url + "?currentPage=" + next +
				"'><button type='button' class='jui-btn btn-dark'><svg width='1em' height='1.5em' viewBox='0 0 16 16' class='bi bi-caret-right' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z' /></svg></button></a>";
		}
		console.log(p.innerHTML);
	},
	search: function(me, name, url, e) {
		var evt = window.event || e;
		var v = me.value;
		if (evt.keyCode == 13) { //按下回车才执行
			window.location.href = url + "?" + name + "=" + v;
		}
	},
	dateSelect: function(id) {
		var obj = document.getElementById('dateSlect');
		var date = new Date();
		var year = date.getFullYear();
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var day = ('0' + date.getDate()).slice(-2);
		var today = year + '-' + month + '-' + day;
		obj.value=today;
	}
};

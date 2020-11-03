document.write("<script src=\"/" + window.location.pathname.split("/")[1] + "/jui/jquery-3.5.1.min.js\"></script>") //加载其他JS

var jui = {
	rootPath: window.location.pathname.split("/")[1],//当前网站的根目录，不是tomcat根目录
	loadJS: function(url, success) { //加载外部JS
		var domScript = document.createElement('script');
		domScript.src = url;
		success = success || function() {};
		domScript.onload = document.onreadystatechange = function() {
			if (!this.readyState || 'load' === this.readyState || 'complete' === this.readyState) {
				success();
				this.onload = this.onreadystatechange = null;
				this.parentNode.removeChild(this);
			}
		}
		document.getElementsByTagName('head').appendChild(domScript);
	},
	check: {
		ifOK:false,
		onsubmit:function(){
			console.log(jui.check.ifOK);
			if(jui.check.ifOK){
				jui.check.ifOK = false;
				return true;
			}
			return false;
		},
		username: function(me) {
			if (!/^[A-Za-z0-9]{4,18}$/.test(me.value)) {
				jui.createPopup("用户名错误", "用户名需要4到18位的数字或者字母！")
				me.style.border = "1px solid #ff5500";
				jui.check.ifOK = false;
			} else {
				me.style.border = "1px solid #55ff7f";
				jui.check.ifOK = true;
			}
		},
		password: function(me) {
			if (!/^\w{6,18}$/.test(me.value)) {
				jui.createPopup("密码错误！", "密码需要6到18位的数字或者字母！")
				me.style.border = "1px solid #ff5500";
				jui.check.ifOK = false;
			} else {
				me.style.border = "1px solid #55ff7f";
				jui.check.ifOK = true;
			}
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
		obj.value = today;
	},
	createPopup: function(title, content) {
		if ($("#popup").html() == undefined) {
			var html =
				"<div class=\"jui-curtain\"></div><div id=\"popup\" class=\"jui-popup\"><div class=\"jui-row jui-inside-horizontal\"><div class=\"jui-outside-center\" id=\"title\">标题</div></div><div class=\"jui-row jui-inside-horizontal\"><div class=\"jui-outside-center\" id=\"content\">内容</div></div></div>";
			$("body").append(html);
		}
		$("#popup #title").text(title)
		$("#popup #content").text(content);
		$("#popup").show(); //显示弹窗
		$(".jui-curtain").show(); //显示幕布
		setTimeout(function() {
			$("#popup").hide();
			$(".jui-curtain").hide();
		}, 1000); //1秒后隐藏弹窗
	}
};

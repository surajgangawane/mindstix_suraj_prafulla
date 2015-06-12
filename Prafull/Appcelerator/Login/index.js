/*var json = '{' +
	'"Users" : [' +
		'{"Username" : "Prafull", "Password" : "333"},' +
		'{"Username" : "abc", "Password" : "123"}' +
	']' +
'}';


var jsonData = JSON.parse(json);
*/
var jsonData = {
	Users : [
		{
			Username : "Prafull",
			Password : "333"
		},
		{
			Username : "abc",
			Password : "123"
		}
	]
};

$.txtUsername.value = "";
$.txtPassword.value = "";

function login(event){
	var uname = $.txtUsername.value;
	var pass = $.txtPassword.value;
	var flag = false;
	if(uname != "" && pass != "")
	{
		for(var i = 0; i < jsonData.Users.length; i++){
			if(uname == jsonData.Users[i].Username)
			{
				if(pass == jsonData.Users[i].Password)
				{
					//alert("Successfully logged-in.");
					var successview = Alloy.createController("loginSuccess", {}).getView();
				    if (OS_IOS) {
				        $.navGroupWin.openWindow(successview);
				    }
				    if (OS_ANDROID) {
				        successview.open();
				    } 
				    flag = true;
					break;
				}
				else
				{
					alert("Sorry, Invalid Password.");
					$.txtPassword.value = "";
					break;	
				}
			}
		}
		if(!flag)
		{
			alert("Sorry, Invalid User.");
			clear();
		}
	}
	else
	{
		alert("Please, enter all the fields.");
	}
}

function clear(){
	$.txtUsername.value = "";
	$.txtPassword.value = "";
}

if(OS_IOS) { 
   $.navGroupWin.open();
} 
if (OS_ANDROID) { 
   $.index.open(); 
}

$.txtUsername.addEventListener('change', function(e){
	if($.txtUsername.value == 'prafull')
	{
		$.myImage.image = WPATH('myImages/success.png');
	}
	else
	{
		$.myImage.image = WPATH('myImages/fail.png');
	}
});
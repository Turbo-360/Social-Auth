// your custom app logic goes here:

$(function(){
	var url = window.location.href

	if (url.indexOf('?') == -1)
		return

	// check for url query parameters: 
	var parts = url.split('?')
	var query = parts[1]
	var keyValues = query.split('&')

	var params = {}
	keyValues.forEach(function(keyValue, i){
		var param = keyValue.split('=')
		if (param.length > 1)
			params[param[0]] = keyValue.replace(param[0]+'=', '')
	})

	// if payload parameter not found, do not continue because no FB access token available:
	if (params['payload'] == null) 
		return

	// payload is Base64 encoded so decode here:
	var user = $.base64('decode', params['payload'])
	var userJSON = JSON.parse(user)
	console.log('user == ' + JSON.stringify(userJSON))

	// prepare call to FB API
	var init = function(){
		FB.api('/me', {fields: 'last_name', access_token: userJSON.accessToken}, function(response) {
			console.log(response)
		})
	}

	// Initialize Facebook SDK - https://developers.facebook.com/docs/javascript/quickstart
	window.fbAsyncInit = function() {
		FB.init({
			appId            : '1612971992258567',
			autoLogAppEvents : true,
			xfbml            : true,
			version          : 'v2.10'
		})

		FB.AppEvents.logPageView()
		init()
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

})
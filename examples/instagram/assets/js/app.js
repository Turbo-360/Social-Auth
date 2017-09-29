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

	// Make an AJAX call to the Instagram API with the access token returned from Social Auth:
	$.ajax({
		url: 'https://api.instagram.com/v1/users/self/?access_token=' + userJSON.accessToken,
		type: 'GET',
		data: null,
		// contentType: 'text/plain; charset=utf-8',
		dataType: 'jsonp',
		async: true,
		success: function(response) {
			console.log('INSTAGRAM API CALLBACK: ' + JSON.stringify(response))
		},
		error: function(xhr, status, error) {
			console.log('ERROR: ' + error)
		}
	})

})
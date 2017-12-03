/* Define your vectors here. To run the samples, uncomment the functions
   below then from the root directory, run the devserver:
   $ turbo devserver

   then navigate to: 
   http://localhost:3000/vectors/sample

   Deploy the vectors by running from root directory:
   $ turbo vectors */

// import npm packages here:
var turbo = require('turbo360')
var passport = require('passport')
var Promise = require('bluebird')
var utils = require('./utils')
var bcrypt = require('bcryptjs')
var Base64 = require('js-base64').Base64

// const FB_REDIRECT_URI = 'https://api.turbo360.co/vectors/social-auth-bcmu9s/token'
// const INSTAGRAM_REDIRECT_URI = 'https://api.turbo360.co/vectors/social-auth-bcmu9s/token'

const FB_REDIRECT_URI = 		'https://production.turbo360-vector.com/social-auth-bcmu9s/token'
const INSTAGRAM_REDIRECT_URI = 	'https://production.turbo360-vector.com/social-auth-bcmu9s/token'

const validateParams = (req) => {
	const network = req.query.network
	if (network == null)
		return 'network'
	
	const site = req.query.site
	if (site == null)
		return 'site'

	return null	
}


module.exports = {

	authenticate: (req, res) => {
		const missingParam = validateParams(req)
		if (missingParam != null){
			res.json({
				confirmation: 'fail',
				message: 'Missing ' + missingParam + ' parameter'
			})

			return
		}


		const network = req.query.network
		if (network == 'instagram'){
			const turboClient = turbo({site_id: req.query.site})
			turboClient.site() // fetch site details of current app
			.then(data => {
				const instagramOauth = data.oauth.instagram
				if (instagramOauth == null){
					throw new Error('Missing Instagram App Credentials')
					return
				}

				if (instagramOauth.client_id == null){
					throw new Error('Missing Instagram Client ID')
					return
				}

				if (instagramOauth.client_id.length == 0){
					throw new Error('Missing Instagram Client ID')
					return
				}

				if (instagramOauth.client_secret == null){
					throw new Error('Missing Instagram Client Secret')
					return
				}

				if (instagramOauth.client_secret.length == 0){
					throw new Error('Missing Instagram Client Secret')
					return
				}

				if (instagramOauth.redirect_uri == null){
					throw new Error('Missing Instagram Redirect URI')
					return
				}

				if (instagramOauth.redirect_uri.length == 0){
					throw new Error('Missing Instagram Redirect URI')
					return
				}				

				utils.PassportUtils.configureInstagramStrategy(passport, {
					client_id: instagramOauth.client_id,
					client_secret: instagramOauth.client_secret,
					redirect_uri: INSTAGRAM_REDIRECT_URI + '?site=' + req.query.site + '&network=' + req.query.network // callback should come from project/app
				})

				var permissions = ['basic', 'public_content', 'follower_list', 'comments']
				passport.authenticate('instagram', {scope: permissions})(req, res, null)
				return
			})
			.catch(err => {
				res.json({
					confirmation: 'fail',
					message: err.message
				})

				return
			})

			return
		}


		if (network == 'facebook'){
			const turboClient = turbo({site_id: req.query.site})
			turboClient.site() // fetch site details of current app
			.then(data => {
				const facebookOauth = data.oauth.facebook
				if (data.oauth.facebook == null){
					throw new Error('Missing Facebook App Credentials')
					return
				}

				if (facebookOauth.client_id == null){
					throw new Error('Missing Facebook Client ID')
					return
				}

				if (facebookOauth.client_id.length == 0){
					throw new Error('Missing Facebook Client ID')
					return
				}

				if (facebookOauth.client_secret == null){
					throw new Error('Missing Facebook Client Secret')
					return
				}

				if (facebookOauth.client_secret.length == 0){
					throw new Error('Missing Facebook Client Secret')
					return
				}

				if (facebookOauth.redirect_uri == null){
					throw new Error('Missing Facebook Redirect URI')
					return
				}

				if (facebookOauth.redirect_uri.length == 0){
					throw new Error('Missing Facebook Redirect URI')
					return
				}

				utils.PassportUtils.configureFacebookStrategy(passport, {
					client_id: facebookOauth.client_id,
					client_secret: facebookOauth.client_secret,
					redirect_uri: FB_REDIRECT_URI + '?site=' + req.query.site + '&network=' + req.query.network // callback should come from project/app
				})

				passport.authenticate('facebook')(req, res, null)
				return
			})
			.catch(err => {
				res.json({
					confirmation: 'fail',
					message: err.message
				})

				return
			})

			return
		}

		res.json({
			confirmation: 'fail',
			message: 'Invalid Network'
		})
	},

	token: (req, res) => {
		const missingParam = validateParams(req)
		if (missingParam != null){
			res.json({
				confirmation: 'fail',
				message: 'Missing ' + missingParam + ' parameter'
			})

			return
		}

		const network = req.query.network
		if (network == 'instagram'){
			const turboClient = turbo({site_id: req.query.site})
			turboClient.site() // fetch site details of current app
			.then(data => {
				const instagramOauth = data.oauth.instagram
				if (instagramOauth == null){
					throw new Error('Missing Instagram App Credentials')
					return
				}

				if (instagramOauth.client_id == null){
					throw new Error('Missing Instagram Client ID')
					return
				}

				if (instagramOauth.client_id.length == 0){
					throw new Error('Missing Instagram Client ID')
					return
				}

				if (instagramOauth.client_secret == null){
					throw new Error('Missing Instagram Client Secret')
					return
				}

				if (instagramOauth.client_secret.length == 0){
					throw new Error('Missing Instagram Client Secret')
					return
				}

				if (instagramOauth.redirect_uri == null){
					throw new Error('Missing Instagram Redirect URI')
					return
				}

				if (instagramOauth.redirect_uri.length == 0){
					throw new Error('Missing Instagram Redirect URI')
					return
				}

				utils.PassportUtils.configureInstagramStrategy(passport, {
					client_id: instagramOauth.client_id,
					client_secret: instagramOauth.client_secret,
					redirect_uri: INSTAGRAM_REDIRECT_URI + '?site=' + req.query.site + '&network=' + req.query.network // callback should come from project/app
				})

				var permissions = ['basic', 'public_content', 'follower_list', 'comments']
				passport.authenticate('instagram', (err, payload, info) => {
					if (err) {
						res.json({
							confirmation: 'fail',
							message: err.message
						})
						return
					}

					if (payload.user == null) { 
						res.json({
							confirmation: 'fail',
							message: JSON.stringify(info)
						})

						return
					}

					const user = payload.user
					const accessToken = payload.accessToken

					res.redirect(instagramOauth.redirect_uri + '?payload=' + Base64.encode(JSON.stringify(payload)))
				})(req, res, null)

				return
			})
			.catch(err => {
				res.json({
					confirmation: 'fail',
					message: err.message
				})

				return
			})
			return
		}


		if (network == 'facebook'){
			const turboClient = turbo({site_id: req.query.site})
			turboClient.site() // fetch site details of current app
			.then(data => {
				const facebookOauth = data.oauth.facebook
				if (facebookOauth.client_id == null){
					throw new Error('Missing Facebook Client ID')
					return
				}

				if (facebookOauth.client_id.length == 0){
					throw new Error('Missing Facebook Client ID')
					return
				}

				if (facebookOauth.client_secret == null){
					throw new Error('Missing Facebook Client Secret')
					return
				}

				if (facebookOauth.client_secret.length == 0){
					throw new Error('Missing Facebook Client Secret')
					return
				}

				if (facebookOauth.redirect_uri == null){
					throw new Error('Missing Facebook Redirect URI')
					return
				}

				if (facebookOauth.redirect_uri.length == 0){
					throw new Error('Missing Facebook Redirect URI')
					return
				}				

				utils.PassportUtils.configureFacebookStrategy(passport, {
					redirect_uri: FB_REDIRECT_URI + '?site=' + req.query.site + '&network=' + req.query.network, // callback should come from project/app
					client_id: facebookOauth.client_id,
					client_secret: facebookOauth.client_secret
				})

				passport.authenticate('facebook', (err, payload, info) => {
					if (err) {
						res.json({
							confirmation: 'fail',
							message: err.message
						})
						return
					}

					if (payload.user == null) { 
						res.json({
							confirmation: 'fail',
							message: JSON.stringify(info)
						})

						return
					}

					const user = payload.user
					const accessToken = payload.accessToken

					res.redirect(facebookOauth.redirect_uri + '?payload=' + Base64.encode(JSON.stringify(payload)))
				})(req, res, null)
				return
			})
			.catch(err => {
				res.json({
					confirmation: 'fail',
					message: err.message
				})

				return
			})

			return
		}

		res.json({
			confirmation: 'fail',
			message: 'Invalid Network'
		})
	}

}
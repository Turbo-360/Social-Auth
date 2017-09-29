# Social Auth

This project was built with Turbo 360. To learn more, click here: https://www.turbo360.co

## Instructions
After cloning into repo, cd to project root directory and run npm install:

```
$ npm install
```

To run dev server, install Turbo CLI globally:

```
$ sudo npm install turbo-cli -g
```

Then run devserver from project root directory:

```
$ turbo devserver
```

## Documentation
Social Auth provides Oauth authentication services for Facebook and Instagram (more on the way). By adding a hyperlink to a Social Auth endpoint on your site, your app directs users to the corresponding login prompt. After succesfully logging in to the respective social network, Social Auth then retrieves an access token and redirects back to your site with a url query parameter ('payload') appended which contains the access token. This access token can then be used to make authenticated requests to the social network.


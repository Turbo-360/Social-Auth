# Instagram Example

This example queries the Social Auth endpoint for the Instagram Ouath token. To run

## To Run
From the root directory

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

Navigate to http://localhost:3000 then open the developer console (OPTION + COMMAND + i for Chrome). Then click the hamburger icon on the upper right corner then scroll down and click "Log In" - from there, you will be prompted to log in to your Facebook account. After logging in to your account, the app will redirect back to localhost with a "payload" query parameter appended to the URL - this is the OAuth access token encoded as a Base64 string.

To view the code, open /assets/js/app.js in a text editor. There you will see the code to make requests to the Facebook Graph API using the access token.

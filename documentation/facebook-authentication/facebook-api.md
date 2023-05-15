# Facebook API
<br>

> ## App Token (server)
* Request to https://graph.facebook.com/oauth/access_token
* Verb GET
* Params: client_id, client_secret, grant_type (client_credentials)
* Result: { access_token }
<br>
<br>

> ## Debug Token
* Request to https://graph.facebook.com/debug_token
* Verb GET
* Params: access_token (server), input_token (client)
* Result: { data: { user_id } }
<br>
<br>

> ## User Information
* Request to https://graph.facebook.com/USER_ID
* Verb GET
* Params: fields (id, name, email), access_token (client)
* Result: { id, name, email }

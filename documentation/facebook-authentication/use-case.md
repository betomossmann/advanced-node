# Authentication with Facebook

> ## Data:
* Access Token

> # Primary Flow
1. Get data(name, email, and Facebook id) from Facebook API
2. Check if there is a user with the email received above
3. Create an account for the user with the data received from Facebook
4. Create an access token, from the user ID, with a 30-minute expiration
5. Return the generated access token

> ## Alternate flow: User already exists
1. Update the user account with data received from Facebook (Facebook id and name - only update the
name if the user account does not have a name)

> ## Exception Flow: Invalid or Expired Token
1. Return an authentication error

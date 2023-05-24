# Change Profile Photo
<br>

> ## Data
* User ID
* Photo
<br>
<br>

> ## Primary flow
1. ✅ Save the received photo in a FileStorage, keeping the original photo format
2. ✅ Send a unique key to FileStorage to prevent overwriting any image that already exists
3. ✅ Update the user's data with the photo URL returned by FileStorage
4. ✅ Clear the user's initial name field
5. ✅ Return the photo URL and the user's initials
<br>
<br>

> ## Alternative flow 1: User removed their photo
1. ✅ If the system does not receive a photo, ignore steps 1 and 2
2. ✅ Clear the photo URL from the user's data
3. ✅ Update the initials field of the user with the first letter of the first and last name
<br>
<br>

> ## Alternative flow 1.1: User has no last name
1. ✅ Update the initials field of the user with the first two letters of the name
<br>
<br>

> ## Alternative flow 1.2: User has a name with only one letter
1. ✅ Update the initials field of the user with the single letter
<br>
<br>

> ## Alternative flow 1.3: User has no name
1. ✅ Clear the initial name field of the user
<br>
<br>

> ## Exception flow: Error when updating user photo
1. ✅ Delete the photo created in FileStorage
2. ✅ Pass on the same error received

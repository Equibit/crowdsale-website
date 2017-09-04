# PHP-REST-API

PHP Version 5.6.18+ Required

## TODO:

- Finish mail system by making colours variables
- Cron Job for creating invoices and clearing pending and locking accounts
- Email template to send invoice
- DomPDF setup to create invoice PDFs on the fly
- EDC module
- finish getting BeanStream working
- Perhaps add PayPal??


## Security and Process Flows

#### Notes:
- All passwords are hashed SHA512 before transmitting
- 2nd Factor Authentication for Forgot Password, Sign-Up and optional Login
- All stored passwords in the database are stored with a time consuming hash and with a random long salt unique for that password (PBKDF2-SHA512)
- Salt is updated with each change of password
- All hash compares use a crypto compare that doesn't leak information on string length
- All randomized strings/numbers use a crypto safe randomizer

#### Login Flow:
- Ask the server for a Key (only time in this flow where password is sent to server—still hashed SHA512)
- password is hashed with salt and compared-- if good next step
- Server returns salt and challenge and client hashes the password with the salt and signs the challenge and returns it
- Challenge can only be tested once (removed on first test)
- Secret Session Key returned if login challenge is correct
- If 2nd Factor used, the returned key needs to be hashed with the 2nd factor in order for the Key to be accepted by the server (HMAC-SHA512)
- 2nd factor is never sent through this process and is secured by the server and client knowing it from separate sources (Email, SMS, Key Device) and this second factor is not stored anywhere in our system
- Key is used to sign all client requests (HMAC-SHA512) with an included timestamp
- Old requests X min or older are ignored (including challenge)
- Non login Server communications compares signed requests by resigning the same information (Method, Timestamp, Data, Endpoint) and comparing the two signatures

#### Sign-Up Flow:
- Ask for unique username (a-z 0-9 _ -){8+}, unique email, select security question and answer {6+} and strong password (At least one symbol, one capital, one lowercase, and one number){12+} (Passwords are not enforced, user can use a single space, but we notify them of the password strength).
- Send this information to the server, server checks everything but password strength (its already hashed), then sends a 2nd factor email.
- User enters 2nd factor (this one is communicated to the server) and server finishes sign up process and opens the login dialog.

#### Forgot Password Flow:
- Ask for username or email.
- Find account and send 2nd factor email (or SMS if account has that feature)
- Ask security Question
- Reset Password

## Other Security Options

#### Users can turn on/off the following options:
- Allow only login from already successful IP addresses
- Email or SMS (if available) notification on all logins
- Email or SMS (if available) notification on strange IP addresses logins

A system administrator can make the system go to lockdown. Or lockdown can be set automatic if login failures or email/username exists requests exceed the average load by X times for longer than X min.

#### On lockdown, the following occurs: *Not Completed*
- All user accounts get notification of logins with a short message explaining why.

**Note:**
X amount of failed attempts at a login within X amount of time results in a notification being sent to the user recommending they change there username if it wasn't them.

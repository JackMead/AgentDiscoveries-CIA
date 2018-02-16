# "Agent Discoveries" Database Structure

## User - Agent - Admin Roles
A user is somebody who can access the site by logging in. They are uniquely identified by a user id. No other functionality should be present unless they are also:

1) An Agent - A field operative, uniquely identified by their call sign; they should be able to submit reports.
2) An Admin - Somebody who can view reports, create new users, and add users to roles.

Thus User-Agent and User-Admin are both One-to-One/None relationships.
- to do:
    - sql injection prevention
    - format validation


- I chose to have a single button menubar as there is only simple functionality to the site at this point
- I have chose to make it so admin users cannot hide from other admin users
- the 'mod' elevated priviledge role has no functional difference from the admin role, but is highlighted with a softer background color.





# Choices
"A reflection on your design choices and what you learned from undertaking the project."
---
## Format for following sections

## assignment description section
description detail
    - [x] choice to implement
---

## Constructing User Profiles
Generate a JavaScript structure to encapsulate user data (think array of objects). There should be 15 user profiles and they should reflect real-world user attributes.
    - [x] included this generated array as 'baseUsers'
    - I presume this is actually refering to the next section, because random strings arent reflective of anything
Attributes that you need to add: Personal Name, Family Name, Email, Username, Role Indicator (Boolean), and Visual Identifier (a link to an image or avatar). My suggestion would be User1-15 for usernames.
    - [x] added numbered attributes to all users in one looping function 'updateUserAutoValues()'
    - [x] also added 'updateUserName()' (fname, lname, generated email, NOT username) to make it easier to make the user names 'reflect real-world user attributes' 
    - [x] username without update function, and left as 'user#' from the autoUpdate func (per your suggestion)
    - [x] images were created by generative AI (chatGPT specifically) and named the same as target user's username. Cannot be changed.
Ensure diversity in roles: 3 of your profiles should possess elevated privileges(like admin).
    - [x] created makeAdmin() function and assigned admin roles to 3 users; users 0 = admin, 1 & 2 = mod; treated mostly the same, small visual distinction

## Initiating User Interaction






- [~] This project allows one of a set of hardcoded users to log into a site where they can see the information of other users and themselves.
- [] The interface consistes of a menu bar with a "login" or "change User" button, depending on login state. 
- [] A title reports the username of the currently logged in user.
- [x] Which others users are shown is affected by the role of the active user, and if any of the admin users have elected to hide their information from this user. 
- [x] Admin roles are highlighted with a green border and background for their information cards, while regular user cards have white backgrounds. 
- [] All users will see bolded text for their own information card.
- [] By default, regular users will see the information of all admin staff and themselves. Admin users will see everyone's information. 
- [] Admin also have the ability to hide their information from specific users.
- [] The login is protected from SQL injection by: ____________________________________________________


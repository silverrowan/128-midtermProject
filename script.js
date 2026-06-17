"use strict";

const baseUsers = [
    { "uid": "03LHN" }, 
    { "uid": "0JDHD" }, 
    { "uid": "65EO3" }, 
    { "uid": "8D8WN" }, 
    { "uid": "AC1A7" }, 
    { "uid": "DMEFU" }, 
    { "uid": "DOCMG" }, 
    { "uid": "K0Y9P" }, 
    { "uid": "Q2W6F" }, 
    { "uid": "QHH5H" }, 
    { "uid": "QSCSJ" }, 
    { "uid": "RQPSD" }, 
    { "uid": "RYBIX" }, 
    { "uid": "VIF0S" }, 
    { "uid": "YCQPM" }];
Object.freeze(baseUsers);

/* uid
firstName
lastName
email
username
userRole -- 3x roles ok
profileImage */

//Setting up User Object
// class User {
//     constructor(uid, firstName, lastName, email, username, userRole, profileImage) {
//         this._uid = uid;
//         this._firstName = firstName;
//         this._lastName = lastName;
//         this._email = email;
//         this._username = username;
//         this._userRole = userRole;
//         this._profileImage = profileImage;
//     }
// }

//enter information into user objects
//available roles are: admin, mod, and user, with user having the lowest priviledges
for (let i = 0; i < baseUsers.length; i++) {
    let username = `user${i}`;

    baseUsers[i].userRole = "user";
    baseUsers[i].firstName = "fName" + i;
    baseUsers[i].lastName = "lName" + i;
    baseUsers[i].username = username;
    baseUsers[i].email = `${username}@email.com`;
    baseUsers[i].profileImage = `images/${username}`;
    // username = baseUsers[i]; this didn't allow me to use username as objName
}

//Change 1 user's role to "admin"
baseUsers[0].userRole = "admin";
// baseUsers.user0.userRole = "admin";

//Change 2 user's role to "mod" (moderator)
baseUsers[1].userRole = "mod";
baseUsers[2].userRole = "mod";

console.log(baseUsers);
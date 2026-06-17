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
for (let i = 0; i < baseUsers.length; i++) {
    let fName = "fName" + i;
    let lName = "lName" + i;
    let username = `${fName}_${lName}`;

    baseUsers[i].firstName = fName;
    baseUsers[i].lastName = lName;
    baseUsers[i].username = username;
    baseUsers[i].email = `${username}@email.com`;
    // baseUsers[i].userRole = "user" + i;
    baseUsers[i].profileImage = `images/${username}`;
}

console.log(baseUsers);


"use strict";
// #add baseUsers array of objects & freeze
const baseUsers = [
    { "uid": "aaa" }, //03LHN
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
    { "uid": "YCQPM" }
];
Object.freeze(baseUsers);
// #endadd

// #region enter information into user objects
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
// #endregion

// #region change user roles of 3 users
const makeAdmin = (userArray, adminUserIndex, adminType) => {
    userArray[adminUserIndex].userRole = adminType;
    userArray[adminUserIndex].hideFrom = [];
}

//Change 1 user's role to "admin"
makeAdmin(baseUsers, 0, "admin");
// baseUsers.user0.userRole = "admin";

//Change 2 user's role to "mod" (moderator)
makeAdmin(baseUsers, 1, "mod");
makeAdmin(baseUsers, 2, "mod");

console.log(baseUsers);
// #endregion

const showUsers = (userArray, activeUserIndex) => {
    // if user.role matches "admin" or "mod" OR user.name = activeuser
    // then add user
    // if active user highlight in some way
    // else skip

    if (checkIfAdmin(userArray, activeUserIndex)) { // show admin/mods everyone
            showAllUsers(userArray, activeUserIndex);
    } else { 
        for ( let i = 0 ; i < userArray.length ; i++) {
            if ( i == activeUserIndex ) { // show self (not needed when user is admin/mod)
                makeCard(userArray, i, activeUserIndex);
            } else if ( checkIfAdmin(userArray, i) ) { // if user being checked is admin/mod
                //check that mod/admin has not hidden themselves from the active user if not, then display
                if ( !checkHidden(userArray, activeUserIndex, i) ) { 
                makeCard(userArray, i, activeUserIndex); 
                }
            }
        }
    }
}

const userDiv = document.querySelector("#userDiv");

const showAllUsers = (userArray, selfIndex) => {
    console.log(userArray);
    
    for (let i = 0 ; i < userArray.length ; i++) {
        // userDiv.innerHTML = `<p>testing</p>`;
        userDiv.innerHTML += makeCard(userArray, i, selfIndex);
    }
}

const checkIfAdmin = (userArray, userIndex) => {
    let role = userArray[userIndex].userRole;
    if ( role == "admin"  || role == "mod" ) { 
        return true; 
    } else { 
        return false; 
    }    
}

const checkHidden = (userArray, activeUserIndex, adminIndex) => {
    let hideFrom = userArray[adminIndex].hideFrom;
    let hidden = false;
    for (let i = 0 ; i < hideFrom.length ; i++) {
        if (hideFrom[i] == activeUserIndex) { hidden = true; }
    }
    return hidden;
}

const makeCard = (userArray, cardIndex, selfIndex) => {
    let userCard = userArray[cardIndex];
    // <img src="..." class="card-img-top" alt="profile picture of ${userCard.username}"></img>
    let hiddenString ="";
    let showHiddenFrom = cardIndex == selfIndex && checkIfAdmin(userArray, cardIndex);
    // let cardIsAdmin = 
    // let selfIsAdmin = checkIfAdmin(userArray, selfIndex);
    if (showHiddenFrom) {
        for ( let i = 0 ; i < userCard.hideFrom.length ; i++) {
            hiddenFromUserIndex = userCard.hideFrom[i];
            hiddenString += userArray[hiddenFromUserIndex].username;
            if (i != userCard.hideFrom.length - 1) { output += ', '; }
        }
    }
    let output = `<div class ="col col-xs-12 col-sm-6 col-lg-3 col-xl-2 mb-3" >
        <div class="card ${userCard.userRole}">
        <div class="card-body">
        <h5 class="card-title">${userCard.username}</h5>
        <p class="card-text">
        Full Name: ${userCard.firstName} ${userCard.lastName}<br>
        email: ${userCard.email}<br>
        role: ${userCard.userRole}<br>`

    if ( showHiddenFrom ) {
        output += `Hidden from users: ${hiddenString}`;
    }
    output += `</p></div></div></div>`
        // <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    return output;
}

// #endsetup

// #region call actions

// #region hardcode user; bypass login
let activeUserIndex = 0;
showUsers(baseUsers, activeUserIndex);
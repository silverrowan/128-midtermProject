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

// #region enter user object information; includes function: makeAdmin()
//available roles are: admin, mod, and user, with user having the lowest priviledges
for (let i = 0; i < baseUsers.length; i++) {
    let username = `user${i}`;

    baseUsers[i].userRole = "user";
    baseUsers[i].firstName = "fName" + i;
    baseUsers[i].lastName = "lName" + i;
    baseUsers[i].username = username;
    baseUsers[i].email = `${username}@email.com`;
    baseUsers[i].profileImage = `images/${username}`;
}

//function to change a user's role
const makeAdmin = (userArray, adminUserIndex, adminType) => {
    userArray[adminUserIndex].userRole = adminType;
    userArray[adminUserIndex].hideFrom = [];
}

//Change 1 user's role to "admin", 2 to "mod" (moderator)
makeAdmin(baseUsers, 0, "admin");
makeAdmin(baseUsers, 1, "mod");
makeAdmin(baseUsers, 2, "mod");
// #endregion

// get div to contain cards
const userDiv = document.querySelector("#userDiv");

// #region functions: showUsers(), showAllUsers(), showAdmin(), showSelf(), checkIfAdmin(), checkHidden(), makeCard()
// checking functions
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

//Display User Cards
const showUsers = (userArray, activeUserIndex) => {
    if (checkIfAdmin(userArray, activeUserIndex)) { // show admin/mods everyone (if logged in user is admin)
            showAllUsers(userArray, activeUserIndex);
    } else { 
        showAdmin(userArray, activeUserIndex);
        showSelf(userArray, activeUserIndex); //Not needed when active user is admin
    }
}

const showAllUsers = (userArray, selfIndex) => {
    console.log(userArray);
    
    for (let i = 0 ; i < userArray.length ; i++) {
        userDiv.innerHTML += makeCard(userArray, i, selfIndex);
    }
}

const showAdmin = (userArray, activeUserIndex) => {
        for ( let i = 0 ; i < userArray.length ; i++) {
            if ( checkIfAdmin(userArray, i) && !checkHidden(userArray, activeUserIndex, i) ) { 
                // check if the card is of an admin account and NOT hidden from the active user.
                // if both true, then display. Will only activate one 'user' level accounts.
                makeCard(userArray, i, activeUserIndex); 
                }
        }
}

const showSelf = (userArray, activeUserIndex) => { makeCard(userArray, activeUserIndex, activeUserIndex); }

// build card HTML
const makeCard = (userArray, cardIndex, selfIndex) => {
    let userCard = userArray[cardIndex];
    // <img src="..." class="card-img-top" alt="profile picture of ${userCard.username}"></img>

    let selfIsAdmin = checkIfAdmin(userArray, selfIndex);
    let cardIsAdmin = checkIfAdmin(userArray, cardIndex);

    // let cardIsAdmin = 
    // let selfIsAdmin = checkIfAdmin(userArray, selfIndex);
    // if (showHiddenFrom) {

    // }
    //if the this card is for the active user, apply the 'self' style class
    let selfClass = '';
    cardIndex == selfIndex ? selfClass = 'self' : selfClass = '';
    //card HTML
    let output = `<div class ="col col-s-12 col-md-6 col-lg-4 col-xl-2 mb-3" >
        <div class="card ${userCard.userRole} ${selfClass}">
        <div class="card-body">
        <h5 class="card-title">${userCard.username}</h5>
        <p class="card-text">
        Full Name: ${userCard.firstName} ${userCard.lastName}<br>
        email: ${userCard.email}<br>
        role: ${userCard.userRole}<br>`
    if (selfIsAdmin && !cardIsAdmin) {
        // checkIfHidden();
        output += `Set visiblity to ${userCard.username} to: <a href="#" class="btn btn-primary">hidden</a>` }

    output += `</p></div></div></div>`
        // <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    return output;
}



// button to hide/unhide from user

// #endsetup

// #region call actions

// #region hardcode user; bypass login
let activeUserIndex = 0;
showUsers(baseUsers, activeUserIndex);
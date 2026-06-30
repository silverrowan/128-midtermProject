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

let userList = baseUsers; //'rename' baseUsers to userList;

// #region enter information into user objects
//available roles are: admin, mod, and user, with user having the lowest priviledges
for (let i = 0; i < userList.length; i++) {
    let username = `user${i}`;

    userList[i].userRole = "user";
    userList[i].firstName = "fName" + i;
    userList[i].lastName = "lName" + i;
    userList[i].username = username;
    userList[i].email = `${username}@email.com`;
    userList[i].profileImage = `images/${username}`;
}
// #endregion

// #region change user roles of 3 users; function: makeAdmin()
//function to change a user's role
const makeAdmin = (userArray, adminUserIndex, adminType) => {
    userArray[adminUserIndex].userRole = adminType;
    userArray[adminUserIndex].hideFrom = [];
}

//Change 1 user's role to "admin", 2 to "mod" (moderator)
makeAdmin(userList, 0, "admin");
makeAdmin(userList, 1, "mod");
makeAdmin(userList, 2, "mod");
// #endregion

// get div to contain cards
const userDiv = document.querySelector("#userDiv");

// #region function definitions: showUsers(), showAllUsers(), checkIfAdmin(), checkHidden(), makeCard()
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

const showAllUsers = (userArray, selfIndex) => {
    console.log(userArray);
    
    for (let i = 0 ; i < userArray.length ; i++) {
        // userDiv.innerHTML = `<p>testing</p>`;
        userDiv.innerHTML += makeCard(userArray, i, selfIndex);
    }
}

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
showUsers(userList, activeUserIndex);
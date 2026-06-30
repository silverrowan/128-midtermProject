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
    baseUsers[i].profileImage = `images/${username}.png`;
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


// #region functions: showUsers(), showAllUsers(), showAdmin(), showSelf(), checkIfAdmin(), checkHidden()
// checking functions
const checkIfAdmin = (userArray, userIndex) => {
    let role = userArray[userIndex].userRole;
    if ( role == "admin"  || role == "mod" ) { 
        return true; 
    } else { 
        return false; 
    }    
}

const checkHidden = (userArray, targetUserIndex, adminIndex) => {
    let hideAdminFrom = userArray[adminIndex].hideFrom;
    let hidden = false;
    for (let i = 0 ; i < hideAdminFrom.length ; i++) {
        if (hideAdminFrom[i] == targetUserIndex) { hidden = true; }
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


//build card & visibility button functions: makeCard(), toggleAdminVisibility(), removeFromHidden(), addToHidden()
// build card HTML
const makeCard = (userArray, cardIndex, selfIndex) => {
    let userCard = userArray[cardIndex];
    // <img src="..." class="card-img-top" alt="profile picture of ${userCard.username}"></img>

    let selfIsAdmin = checkIfAdmin(userArray, selfIndex);
    let cardIsAdmin = checkIfAdmin(userArray, cardIndex);

    //create & alter value of 'selfClass' based on if this card is for the active user
    let selfClass = '';
    cardIndex == selfIndex ? selfClass = 'self' : selfClass = '';

    //build card HTML
    //below portion is the same for all users
    let output = `<div class ="col col-s-12 col-md-6 col-lg-3 col-xl-2 mb-3" >
        <div class="card ${userCard.userRole} ${selfClass}">
        <img src="${userCard.profileImage}" alt="profile picture of ${userCard.username}" class="card-img-top"></img>
        <div class="card-body">
        <h5 class="card-title ${selfClass}">${userCard.username}</h5>
        <p class="card-text">
        Full Name: ${userCard.firstName} ${userCard.lastName}<br>
        email: ${userCard.email}<br>
        role: ${userCard.userRole}<br>`

    //below portion is only visible by Admin users on NON admin user cards
    if (selfIsAdmin && !cardIsAdmin) {
        let isHidden = checkHidden(userArray, cardIndex, selfIndex);
        let buttonText, buttonClass; 
        isHidden ? buttonText = 'visible' : buttonText = 'hidden';
        isHidden ? buttonClass = 'hideAdmin btn-warning' : buttonClass = 'showAdmin btn-primary';

        output += `<hr>Set my visiblity to ${userCard.username} to: <a href="#" 
            class="btn ${buttonClass}" id="btn-${userCard.username}" userRef="${cardIndex}">${buttonText}</a>`; }

        // below portion is the same for all users
    output += `</p></div></div></div>`
        // <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    return output;
}

const removeFromHidden = (userArray, adminIndex, targetUserIndex) => {
    let removeTarget;
    let hideAdminFrom = userArray[adminIndex].hideFrom;
    for (let i = 0 ; i < hideAdminFrom.length ; i++) {
        if (hideAdminFrom[i] == targetUserIndex) { 
            removeTarget = i; }
    }
    return hideAdminFrom.pop(removeTarget);
}

const addToHidden = () => {
    userArray[activeUserIndex].hideFrom.push(targetIndex);
}

const toggleAdminVisibility = (e) => {
    let target = e.target;
    console.log(e);
    console.log(target);
    console.log(target.userRef);
    console.log(baseUsers[activeUserIndex].hideFrom);
    
    target.classList.toggle('hideAdmin');
    target.classList.toggle('btn-warning');
    target.classList.toggle('showAdmin');
    target.classList.toggle('btn-primary');
    if (target.outerText == 'hidden') { 
        target.outerText == 'visible';
        removeFromHidden(baseUsers, activeUserIndex, target.userRef);
     }
    else if (target.outerText == 'visble') { 
        target.outerText == 'hidden'; 
        addToHidden();
    }   
}



// button to hide/unhide from user

// #endsetup

// #region call actions

// #region hardcode user; bypass login
let activeUserIndex = 0;
showUsers(baseUsers, activeUserIndex);

//apply listener to container DIV; bubbling will allow individual button differentiation
userDiv.addEventListener('click', (e) => toggleAdminVisibility(e) );
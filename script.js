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

// #region setup login on load, set up references
//reference & create modal itself
const loginModal = document.querySelector('#loginModal');
const loginModalBS = bootstrap.Modal.getOrCreateInstance(loginModal);
//get login form input boxes & values
const usernameIn = document.querySelector("#userNameIn");
const userPassIn = document.querySelector("#userPasswordIn");
const loginErrorMsg = document.querySelector("#incorrect");

loginModalBS.show();
//modal methods
const closeModal = () => { loginModalBS.hide(); }
// const focusModal = () => { usernameIn.focus(); }
// focusModal(); // not working currently
// #endregion

// #region setup login form validation

const showErrorMsg = () => {
    loginErrorMsg.classList.remove('hidden');
    loginErrorMsg.ariaHidden=false;
}
const hideErrorMsg = () => {
    loginErrorMsg.classList.add('hidden');
    loginErrorMsg.ariaHidden=true;
}

// login function and listener; activeUserIndex

const checkUserPass = () => {
    let userNameInput = usernameIn.value;
    let userPassInput = userPassIn.value;

    for (let i = 0; i < baseUsers.length ; i++) {
        if (baseUsers[i].username == userNameInput) {
            if (baseUsers[i].uid == userPassInput) {
                // let activeUser = userNameInput;
                let activeUserIndex = i;
                hideErrorMsg();
                closeModal();
                showUsers(baseUsers, activeUserIndex);
            } else { showErrorMsg(); }
            break;
        } else { showErrorMsg(); }
    }
}
// #endregion

// #region Get login form buttons & add listenters
const enterLogin = document.querySelector("#loginModalButton");
const cancelLogin = document.querySelector("#loginCancelButton")
enterLogin.addEventListener("click", checkUserPass);
// cancelLogin.addEventListener("click", userLogin);
// not working, for now just load empty page



const showUsers = (userArray, activeUserIndex) => {
    // if user.role matches "admin" or "mod" OR user.name = activeuser
    // then add user
    // if active user highlight in some way
    // else skip

    if (checkIfAdmin(userArray, activeUserIndex)) { // show admin/mods everyone
            showAllUsers(userArray);
    } else { 
        for ( let i = 0 ; i < userArray.length ; i++) {
            if ( i == activeUserIndex ) { // show self (not needed when user is admin/mod)
                makeCard(userArray, i);
            } else if ( checkIfAdmin(userArray, i) ) { // if user being checked is admin/mod
                //check that mod/admin has not hidden themselves from the active user if not, then display
                if ( !checkHidden(userArray, activeUserIndex, i) ) { 
                makeCard(userArray, i); 
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
    let cardUser = userArray[cardIndex];
    // <img src="..." class="card-img-top" alt="profile picture of ${cardUser.username}"></img>
    let output = `<div class="card">
    <div class="card-body">
        <h5 class="card-title">${cardUser.username}</h5>
        <p class="card-text">
        Full Name: ${cardUser.firstName} ${cardUser.lastName}<br>
        email: ${cardUser.email}<br>
        role: ${cardUser.userRole}
        </p>
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
    </div>`
    if (checkIfAdmin(userArray, cardIndex) && userIndex == selfIndex) {
        output += `<br>Hidden from users:`;
        for ( let i = 0 ; i < cardUser.hideFrom.length ; i++) {
            hiddenFromUserIndex = cardUser.hideFrom[i];
            output += userArray[hiddenFromUserIndex].username;
            if (i != cardUser.hideFrom.length - 1) { output += ', '; }
        }
    }
    return output;
};

// #endsetup
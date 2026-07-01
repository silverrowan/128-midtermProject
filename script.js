//---------------------------------
// how to use this page & what for:
//---------------------------------
// This is a modal-based login page that will display the user information of members to logged in members.

// The Login modal loads on page refresh, and when the 'Login' or 'Change User' buttons are clicked. Note these buttons do not trigger a page refresh.

// If the login modal is closed without anyone logging in only the navbar and footer are visible.
// User information cards are only visible when a user is logged in.

// If the logged in user has elevated priviledges they will see the information for all users.
// They will also have a button on their profile card to hide their information from users (without elevated privileges). If clicked, this will hide their profile from members with the 'User' role, and change the button to 'show my profile' (undoing the hide if clicked). IMPORTANT NOTE: currently login state, hide state do not persist across page reload or refresh.

// Users with the 'User' role can see all non-hidden users with elevated priviledges, and their own information.

// All users will see thier profile highlighted with a thicker border of different style and color, and a subtle glow effect.
// User roles are also visually differentiated; Admin role users have a medium blue card background, Mod role cards have a light blue background, and User role cards have a white background



"use strict";
// #add baseUsers array of objects & freeze
const baseUsers = [
    { "uid": "aaa" }, //03LHN
    { "uid": "aaa" }, //0JDHD
    { "uid": "aaa" }, //65EO3
    { "uid": "aaa" }, //8D8WN
    { "uid": "aaa" }, //AC1A7
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
Object.freeze(baseUsers); //note this blocks makeNewUserObj
// #endadd

// #region enter user object information; includes functions: updateAllUsersAutoVaules(), ( inactive: makeRandomAlphanumeric(), makeNewUserObj(), ) updateUserAutoValues(), updateUserName(), makeAdmin()
//available roles are: admin, mod, and user, with user having the lowest priviledges

const updateAllUsersAutoValues = () => {
    for (let i = 0; i < baseUsers.length; i++) {
        updateUserAutoValues(i)
    }
}

const makeNewUserObj = ( uid ) => {
    let i = baseUsers.length;
    baseUsers[i] = { "uid": uid }
}

const updateUserAutoValues = (userNumber) => {
        let username = `user${userNumber}`;

        baseUsers[userNumber].userRole = "User";
        baseUsers[userNumber].firstName = "fName" + userNumber;
        baseUsers[userNumber].lastName = "lName" + userNumber;
        baseUsers[userNumber].username = username;
        baseUsers[userNumber].email = `${username}@email.com`;
        baseUsers[userNumber].profileImage = `images/${username}.png`;
}
const updateUserName = (i, firstName, lastName) => { // builds email out of name; leaves username and profileImage and role alone
    baseUsers[i].firstName = firstName;
    baseUsers[i].lastName = lastName;
    baseUsers[i].email = `${firstName}_${lastName}@email.com`;
}

const findUserByName = (firstName, lastName) => {
    for (let i = 0; i < baseUsers.length ; i++) {
        if (baseUsers[i].firstName.toLowerCase() == firstName.toLowerCase() && 
            baseUsers[i].lastName.toLowerCase() == lastName.toLowerCase()) {
            return i;
        } 
    }
    return -1;
}

//function to change a user's role
const makeAdmin = (adminUserIndex, adminType) => {
    baseUsers[adminUserIndex].userRole = adminType;
    baseUsers[adminUserIndex].isHidden = false;
}

// Create Default Users (to match objects in baseUsers array)
updateAllUsersAutoValues();
// #endregion

// -----------------------------------------------
// ANY UPDATES TO USER DATA SHOULD BE CALLED HERE
// -----------------------------------------------
// eg

//Change 1 user's role to "admin", 2 to "mod" (moderator)
makeAdmin(0, "Admin");
makeAdmin(1, "Mod");
makeAdmin(2, "Mod");


updateUserName(0, 'Kai', 'Vance');
updateUserName(1, 'Tess', 'Brooks');
updateUserName(2, 'Jude', 'Holt');
updateUserName(4, 'Maeve', 'Finch');
updateUserName(3, 'Dax', 'Miller');
updateUserName(5, 'Cole', 'Mercer');
updateUserName(6, 'Fae', 'Bowen');
updateUserName(7, 'Opal', 'Hayes');
updateUserName(9, 'Finn', 'Boyle');
updateUserName(8, 'Cleo', 'Nash');
updateUserName(11, 'Zane', 'Rossi');
updateUserName(10, 'Bree', 'Vance');
updateUserName(12, 'Elle', 'Kent');
updateUserName(13, 'June', 'Rossi');
updateUserName(14, 'Reed', 'Keller');

// #region setup login modal, trigger modal on load; functions showLoginModal(), closeModal();
// reference & create modal itself
// const loginModal = document.querySelector('#loginModal');
const loginModalBS = bootstrap.Modal.getOrCreateInstance( document.querySelector('#loginModal') );
//get login form input boxes & values
const usernameIn = document.querySelector("#userNameIn");
const userPassIn = document.querySelector("#userPasswordIn");
const loginErrorMsg = document.querySelector("#incorrect");
//Get login form buttons & add listenters
const enterLogin = document.querySelector("#loginModalButton");
const cancelLogin = document.querySelector("#loginCancelButton");
const cancelLoginX = document.querySelector("#modalX");


//modal methods, initial modal trigger
const showLoginModal = () => loginModalBS.show();
showLoginModal();

const closeModal = () => { loginModalBS.hide(); }
// #endregion

// #region login modal functions: showErrorMsg(), hideErrorMsg(), checkUserPass(); includes listener attachment for Modal login and cancel buttons
const showErrorMsg = () => {
    loginErrorMsg.classList.remove('hidden');
    loginErrorMsg.ariaHidden=false;
}
const hideErrorMsg = () => {
    loginErrorMsg.classList.add('hidden');
    loginErrorMsg.ariaHidden=true;
}

// login function: checkUserPass(); triggers appropriate load actions
const checkUserPass = () => {
    for (let i = 0; i < baseUsers.length ; i++) {
        if (baseUsers[i].username == usernameIn.value) {
            if (baseUsers[i].uid == userPassIn.value) {  
                hideErrorMsg();
                usernameIn.value = '';
                userPassIn.value = '';
                closeModal();
                changeNavBtnToChgUser();
                showUsers(baseUsers, i); //note i = activeUser now, b/c both ifs were true
            } else { showErrorMsg(); }
            break;
        } else { showErrorMsg(); }
    }
}

//attach login modal login button listener
enterLogin.addEventListener("click", () => checkUserPass() );
cancelLogin.addEventListener("click", closeModal);
cancelLoginX.addEventListener("click", closeModal);
// #endregion

// #region setup navbar

const navLoginButton = document.querySelector("#navLoginButton");
const navChangeUserButton = document.querySelector("#navChangeUserButton");

// hide (or not) login/change user menu button visibility
// note not using aria-hidden = "true" as apparently shouldn't be used 
// with diaplay:none, which is how the hiding elements is implemented here
const changeNavBtnToLogin = () => {
    navLoginButton.className = "btn btn-primary";
    navChangeUserButton.className = "btn btn-primary hidden";
}

const changeNavBtnToChgUser = () => {
    navLoginButton.className = "btn btn-primary hidden";
    navChangeUserButton.className = "btn btn-primary";
}

const loginViaNavBtn = () => {
    clearUsers();
    changeNavBtnToLogin();
    showLoginModal();
}

navLoginButton.addEventListener('click', showLoginModal );
// navLoginButton.addEventListener('click', changeNavBtnToChgUser );
navChangeUserButton.addEventListener('click', loginViaNavBtn );
// #endregion

const userDiv = document.querySelector("#userDiv");

// #region check if functions: checkIfAdmin(), checkIfSelf(), checkHidden()
// checking if passed in index is of an admin user
const checkIfAdmin = (userArray, userIndex) => {
    let role = userArray[userIndex].userRole;
    if ( role == "Admin"  || role == "Mod" ) { 
        return true; 
    } else { 
        return false; 
    }
}

// check if passed in indexes match; used to check if a card is of the active user
const checkIfSelf = (cardIndex, userIndex) => cardIndex == userIndex;

// check if passed in userindex has .isHidden = true
const checkHidden = (userArray, userIndex) => userArray[userIndex].isHidden;
// #endregion

// #region who to display functions: showUsers(), showAllUsers(), showAdmin(), showSelf(); incl hideAdminBtn event listener
//Display User Cards
const showUsers = (userArray, activeUserIndex) => {
    if (checkIfAdmin(userArray, activeUserIndex)) { // show admin/mods everyone (if logged in user is admin)
        showAllUsers(userArray, activeUserIndex);
    } else { 
        showAdmin(userArray, activeUserIndex);
        showSelf(userArray, activeUserIndex); //Not needed when active user is admin
    }
}

const clearUsers = () => userDiv.innerHTML = ``

const addListenerToHideAdminBtn = (selfIndex) => {
    let hideAdminBtn = document.querySelector("#btn-hide");
    hideAdminBtn.addEventListener('click', (e) => toggleAdminVisibility(e, selfIndex) )
}

const showAllUsers = (userArray, selfIndex) => { 
    for (let i = 0 ; i < userArray.length ; i++) {
        userDiv.innerHTML += makeCard(userArray, i, selfIndex);
    }
    addListenerToHideAdminBtn(selfIndex);
}

const showAdmin = (userArray, activeUserIndex) => {
    for ( let i = 0 ; i < userArray.length ; i++) {
        if ( checkIfAdmin(userArray, i) && !checkHidden(userArray, i) ) { 
            // check if the card is of an admin account and NOT hidden from users.
            // if both true, then display. Will only activate on 'user' level accounts.
            userDiv.innerHTML += makeCard(userArray, i, activeUserIndex); 
        }
    }
}

const showSelf = (userArray, activeUserIndex) => { userDiv.innerHTML += makeCard(userArray, activeUserIndex, activeUserIndex); }

// #endregion

// #region build card & visibility button functions: makeCard(), toggleAdminVisibility()
// build card HTML
const makeCard = (userArray, cardIndex, selfIndex) => {
    let userCard = userArray[cardIndex];
    // <img src="..." class="card-img-top" alt="profile picture of ${userCard.username}"></img>

    let selfIsAdmin = checkIfAdmin(userArray, selfIndex);
    let cardIsSelf = checkIfSelf(cardIndex, selfIndex);
    let selfIsHidden = userArray[selfIndex].isHidden;

    //create & alter value of 'selfClass' based on if this card is for the active user
    let selfClass = '';
    cardIndex == selfIndex ? selfClass = 'self' : selfClass = '';

    //build card HTML
    //below portion is the same for all users
    let output = `<div class ="col col-lg-6 col-xl-3 mb-3" >
        <div class="card ${userCard.userRole} ${selfClass}">
        <img src="${userCard.profileImage}" alt="profile picture of ${userCard.username}" class="card-img-top"></img>
        <div class="card-body">
        <h5 class="card-title">${userCard.username}</h5>
        <p class="card-text">
        <b>Full Name:</b> ${userCard.firstName} ${userCard.lastName}<br>
        <b>Email:</b> ${userCard.email}<br>
        <b>Role:</b> ${userCard.userRole}<br>`

    //portion visible TO Admin on OWN user card
    if (selfIsAdmin && cardIsSelf) {
        let buttonText, buttonClass; 
        selfIsHidden ? buttonText = 'Show' : buttonText = 'Hide';
        selfIsHidden ? buttonClass = 'hideAdmin btn-warning' : buttonClass = 'showAdmin btn-primary';
        output += `<hr>
            <a href="#" 
            class="btn ${buttonClass}" id="btn-hide" userRef="${cardIndex}">${buttonText} My Profile</a>`; 
        }

    // below portion is the same for all users
    output += `</p></div></div></div>`
        // <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    return output;
}

//button function to change appearance of button and value of admin user .isHidden
const toggleAdminVisibility = (e, activeUserIndex) => {
    let target = e.target
    let adminIsHidden = baseUsers[activeUserIndex].isHidden;
    
    if (adminIsHidden == false) { //if self.isHidden initially false
        baseUsers[activeUserIndex].isHidden = true; //change value of self.isHidden to true; spotty functioning if use variable adminIsHidden
        target.innerText = 'Show My Profile'; //change button text
        target.classList.add('btn-warning'); //add button class & therefore styling
        target.classList.remove('btn-primary'); //remove button class & therefore styling
    } else { //if self.isHidden initially true
        baseUsers[activeUserIndex].isHidden = false; //change value of self.isHidden to false; 
        target.innerText = 'Hide My Profile'; //change button text
        target.classList.remove('btn-warning'); //remove button class & therefore styling
        target.classList.add('btn-primary'); //add button class & therefore styling
    }
}
// #endregion


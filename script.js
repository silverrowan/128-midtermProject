"use strict";
// #add baseUsers array of objects & freeze
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
//Change 1 user's role to "admin"
baseUsers[0].userRole = "admin";
// baseUsers.user0.userRole = "admin";

//Change 2 user's role to "mod" (moderator)
baseUsers[1].userRole = "mod";
baseUsers[2].userRole = "mod";

console.log(baseUsers);
// #endregion

// #region setup login on load, set up references
const loadLoginBtn = document.querySelector("#loginBtn");
const userLogin = () => loadLoginBtn.click();
userLogin();
//get login form input boxes & values
const usernameIn = document.querySelector("#userNameIn");
const userPassIn = document.querySelector("#userPasswordIn");
const loginErrorMsg = document.querySelector("#incorrect");
//reference modal itself
const loginModal = document.querySelector('#loginModal');
const loginModalBS = bootstrap.Modal.getInstance(loginModal);
//modal methods
// const focusModal = () => { usernameIn.focus(); }
const closeModal = () => { loginModalBS.hide(); }
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


// login function and listener
const checkUserPass = () => {
    let userNameInput = usernameIn.value;
    let userPassInput = userPassIn.value;

    for (let i = 0; i < baseUsers.length ; i++)
        if (baseUsers[i].username == userNameInput) {
            if (baseUsers[i].uid == userPassInput) {
                hideErrorMsg();
                closeModal();
                seeUsers(baseUsers, userNameInput);
            } else { showErrorMsg(); }
            break;
        } else { showErrorMsg(); }
}
// #endregion

// #region Get login form buttons & add listenters
const enterLogin = document.querySelector("#loginModalButton");
const cancelLogin = document.querySelector("#loginCancelButton")
enterLogin.addEventListener("click", checkUserPass);
// cancelLogin.addEventListener("click", userLogin);
// not working, for now just load empty page



const seeUsers = (userArray, activeuser) => {
    // if user.role matches "admin" or "mod" OR user.name = activeuser
    // then add user
    // if active user highlight in some way
    // else skip
}

const makeUserCard = (username) => {
    
    return ;
};

// #endsetup
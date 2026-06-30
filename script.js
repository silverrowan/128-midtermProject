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
Object.freeze(baseUsers); //note this blocks makeNewUserObj
// #endadd

// #region enter user object information; includes functions: updateAllUsersAutoVaules(), ( inactive: makeRandomAlphanumeric(), makeNewUserObj(), ) updateUserAutoValues(), updateUserName(), makeAdmin()
//available roles are: admin, mod, and user, with user having the lowest priviledges

const updateAllUsersAutoValues = (userObjArray) => {
    for (let i = 0; i < userObjArray.length; i++) {
        updateUserAutoValues(userObjArray, i)
    }
}

// const makeRandomAlphanumeric = (length) => {
//     const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let output = '';
//     for (let i = 0; i < charSet.length() ; i++) {
//         let j = Math.floor( Math.random() * charSet.length() )
//         output += charSet[j]
//     }
//     return output;
// }

// const makeNewUserObj = ( userObjArray ) => {
//     let i = userObjArray.length;
//     userObjArray[i] = { "uid": makeRandomAlphanumeric(5) }
// }

const updateUserAutoValues = (userObjArray, userNumber) => {
        let username = `user${userNumber}`;

        userObjArray[userNumber].userRole = "user";
        userObjArray[userNumber].firstName = "fName" + userNumber;
        userObjArray[userNumber].lastName = "lName" + userNumber;
        userObjArray[userNumber].username = username;
        userObjArray[userNumber].email = `${username}@email.com`;
        userObjArray[userNumber].profileImage = `images/${username}.png`;
}
const updateUserName = (userObjArray, i, firstName, lastName) => { // builds email out of name; leaves username and profileImage and role alone
    if (firstName) { userObjArray[i].firstName = firstName };
    if (lastName) { userObjArray[i].lastName = lastName };
    userObjArray[i].email = `${firstName}_${lastName}@email.com`;
}

//function to change a user's role
const makeAdmin = (userArray, adminUserIndex, adminType) => {
    userArray[adminUserIndex].userRole = adminType;
    userArray[adminUserIndex].isHidden = false;
}

// Create Default Users (to match objects in baseUsers array)
updateAllUsersAutoValues(baseUsers);

// give users real names etc
// updateUserName(baseUsers, i, firstName, lastName );


//Change 1 user's role to "admin", 2 to "mod" (moderator)
makeAdmin(baseUsers, 0, "admin");
makeAdmin(baseUsers, 1, "mod");
makeAdmin(baseUsers, 2, "mod");
// #endregion

// #region login modal functions: showErrorMsg(), hideErrorMsg(), checkUserPass()

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
                closeModal();
                // changeNavBtnToChgUser();
                showUsers(baseUsers, i); //note i = activeUser now, b/c both ifs were true
            } else { showErrorMsg(); }
            break;
        } else { showErrorMsg(); }
    }
}
// #endregion

// #region setup login modal, trigger modal on load
// reference & create modal itself
// const loginModal = document.querySelector('#loginModal');
const loginModalBS = bootstrap.Modal.getOrCreateInstance( document.querySelector('#loginModal') );
//get login form input boxes & values
const usernameIn = document.querySelector("#userNameIn");
const userPassIn = document.querySelector("#userPasswordIn");
const loginErrorMsg = document.querySelector("#incorrect");
//Get login form buttons & add listenters
const enterLogin = document.querySelector("#loginModalButton");
const cancelLogin = document.querySelector("#loginCancelButton")

//modal methods, initial modal trigger
const showLoginModal = () => loginModalBS.show();
showLoginModal();

const closeModal = () => { loginModalBS.hide(); }

//attach login modal login button listener
enterLogin.addEventListener("click", () => checkUserPass() );
cancelLogin.addEventListener("click", () => console.log("write function: clear user imput values, deny refresh") );
// console.log(activeUserIndex);

// cancelLogin.addEventListener("click", userLogin);
// not working, for now just load empty page

// #endregion

// #region setup navbar

// const navLoginButton = document.querySelector("#navLoginButton");
// const navChangeUserButton = document.querySelector("#navChangeUserButton");

// // hide (or not) login/change user menu button visibility
// // note not using aria-hidden = "true" as apparently shouldn't be used 
// // with diaplay:none, which is how the hiding elements is implemented here
// const changeNavBtnToChgUser = () => {
//     navLoginButton.className = "btn btn-primary";
//     navChangeUserButton.className = "btn btn-primary hidden";
//     navLoginButton.innerText = "Change User"
// }

// const changeNavBtnToLogin = () => {
//     navLoginButton.className = "btn btn-primary hidden";
//     navChangeUserButton.className = "btn btn-primary";
//     navLoginButton.innerText = "Login"
// }

// navLoginButton.addEventListener('click', () => changeNavBtnToChgUser );
// navChangeUserButton.addEventListener('click', () => changeNavBtnToLogin );
// #endregion

// let activeUserIndex = '';

const userDiv = document.querySelector("#userDiv");

// #region check if functions: checkIfAdmin(), checkIfSelf(), checkHidden()
// checking if passed in index is of an admin user
const checkIfAdmin = (userArray, userIndex) => {
    let role = userArray[userIndex].userRole;
    if ( role == "admin"  || role == "mod" ) { 
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

// #region who to display functions: showUsers(), showAllUsers(), showAdmin(), showSelf()
//Display User Cards
const showUsers = (userArray, activeUserIndex) => {
    if (checkIfAdmin(userArray, activeUserIndex)) { // show admin/mods everyone (if logged in user is admin)
        showAllUsers(userArray, activeUserIndex);
        let hideAdminBtn = document.querySelector("#btn-hide");
        
        
        console.log(activeUserIndex);
        console.log(baseUsers[activeUserIndex].isHidden);
        
        
        hideAdminBtn.addEventListener('click', (e) => toggleAdminVisibility(e, activeUserIndex) )
    } else { 
        showAdmin(userArray, activeUserIndex);
        showSelf(userArray, activeUserIndex); //Not needed when active user is admin
    }
}

const showAllUsers = (userArray, selfIndex) => { 
    for (let i = 0 ; i < userArray.length ; i++) {
        userDiv.innerHTML += makeCard(userArray, i, selfIndex);
    }
}

const showAdmin = (userArray, activeUserIndex) => {
    for ( let i = 0 ; i < userArray.length ; i++) {
        if ( checkIfAdmin(userArray, i) && !checkHidden(userArray, i) ) { 
            // check if the card is of an admin account and NOT hidden from users.
            // if both true, then display. Will only activate on 'user' level accounts.
            makeCard(userArray, i, activeUserIndex); 
        }
    }
}

const showSelf = (userArray, activeUserIndex) => { makeCard(userArray, activeUserIndex, activeUserIndex); }

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
    let output = `<div class ="col col-s-12 col-md-6 col-lg-3 col-xl-2 mb-3" >
        <div class="card ${userCard.userRole} ${selfClass}">
        <img src="${userCard.profileImage}" alt="profile picture of ${userCard.username}" class="card-img-top"></img>
        <div class="card-body">
        <h5 class="card-title ${selfClass}">${userCard.username}</h5>
        <p class="card-text">
        Full Name: ${userCard.firstName} ${userCard.lastName}<br>
        email: ${userCard.email}<br>
        role: ${userCard.userRole}<br>`

    //portion visible TO Admin on OWN user card
    if (selfIsAdmin && cardIsSelf) {
        let buttonText, buttonClass; 
        selfIsHidden ? buttonText = 'show' : buttonText = 'hide';
        selfIsHidden ? buttonClass = 'hideAdmin btn-warning' : buttonClass = 'showAdmin btn-primary';
        output += `<hr>
            <a href="#" 
            class="btn ${buttonClass}" id="btn-hide" userRef="${cardIndex}">${buttonText} my profile</a>`; 
        }

    // below portion is the same for all users
    output += `</p></div></div></div>`
        // <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    return output;
}

//button function to change appearance of button and value of admin user .isHidden
const toggleAdminVisibility = (e, activeUserIndex) => {
    let target = e.target
    
    console.log(activeUserIndex);
    console.log(baseUsers[activeUserIndex]);
    console.log(baseUsers[activeUserIndex].userRole);
    console.log(baseUsers[activeUserIndex].isHidden);
    

    let adminIsHidden = baseUsers[activeUserIndex].isHidden;
    
    if (adminIsHidden == false) { //if self.isHidden initially false
        baseUsers[activeUserIndex].isHidden = true; //change value of self.isHidden to true; spotty functioning if use variable adminIsHidden
        target.innerText = 'show my profile'; //change button text
        target.classList.add('hideAdmin', 'btn-warning'); //add button classes & therefore styling
        target.classList.remove('showAdmin', 'btn-primary'); //remove button classes & therefore styling
    } else { //if self.isHidden initially true
        baseUsers[activeUserIndex].isHidden = false; //change value of self.isHidden to false; 
        target.innerText = 'hide my profile'; //change button text
        target.classList.remove('hideAdmin', 'btn-warning'); //add button classes & therefore styling
        target.classList.add('showAdmin', 'btn-primary'); //remove button classes & therefore styling
    }
}
// #endregion


// //apply listener to container DIV; bubbling will allow individual button differentiation
// //will error if anywhere else on div clicked
// userDiv.addEventListener('click', );


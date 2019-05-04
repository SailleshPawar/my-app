 import Axios from "axios";

export const userService = {
    login,
    logout,
    getAll,
    disableUser,
    enableUser
};
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${""}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}


function disableUser(user,callback){
    debugger;
    Axios.put(`http://localhost:3001/users/${user.id}`,{
        "username":user.username,
        "password": user.password,
        "RoleId":user.RoleId,
        "IsDisable":true
    }).then((response) => {
        console.log(response);
        callback();
    }).catch(err => {
        
       // this.showErrorToaster();
        console.log(err);

    })
}

  function enableUser(user,callback){
      debugger;
      Axios.put(`http://localhost:3001/users/${user.id}`,{
        "username": user.username,
        "password": user.password,
        "RoleId":user.RoleId,
        "IsDisable":false
    }).then((response) => {
        callback();
        console.log(response);
    }).catch(err => {
        
       // this.showErrorToaster();
        console.log(err);

    })
  }



function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${""}/users`, requestOptions).then(handleResponse);
}

function authHeader(){

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
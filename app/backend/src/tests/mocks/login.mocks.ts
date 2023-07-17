
const user = { 
    id: 1,
    username: 'Admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
    role: 'admin'
};

const successfulLogin = { 
    email: 'admin@admin.com', 
    password: 'secret_admin' 
};

const withoutEmailLogin = { 
    password: 'secret_admin' 
};

const withouPasswordlogin = { 
    email: 'admin@admin.com' 
}

    
const invalidEmail = { 
    email: 'invalid@admin', 
    password: 'secret_admin'
};


const invalidPassword = { 
    email: 'admin@admin.com', 
    password: 'xx' 
};

const userRegistered = { 
    ...user, 
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
 user,
 successfulLogin,
 withoutEmailLogin,
 withouPasswordlogin,
 invalidEmail,
 invalidPassword,   
 userRegistered,
}
interface LoginCase {
    title: string;
    email: string;
    password: string;
    expectedMessage?: string; // optional property
}

const loginCaseValid:LoginCase = {
    title: "Valid Login",
    email: "valid@example.com",
    password: "validpassword"
};

const loginCaseInvalid:LoginCase = {
    title: "Invalid Login",
    email: "valid1@example.com",
    password: "invalidpassword", //if omitted, it will give an error because password is not optional property in the interface
    expectedMessage: "Invalid email or password"
};

const loginCaseInvalid2:LoginCase = {
    title: "Invalid Login",
    email: "valid2@example.com",
    password: "validpassword",
    //password2: "validpassword2", // This property is not defined in the interface. If omitted, it will give an error because password2 is not a property in the interface

}

const loginCaseInvalid3 = {
    title: "Invalid Login",
    email: "valid3@example.com",
    password: "validpassword",
    password2: "validpassword2", 
}

const invalidCase: LoginCase = loginCaseInvalid3; // no error: assigned from a variable, so the extra property password2 is not checked
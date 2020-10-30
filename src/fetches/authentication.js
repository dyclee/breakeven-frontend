const { baseUrl } = require('../config');

export const getToken = async(email, password) => {
    const res = await fetch(`${baseUrl}/session`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password}),
    });

    if (res.ok) {
        const { token } = await res.json();
        window.localStorage.setItem("token", token);
        return token;
    }
    const response = await res.json();
    console.log(response);
}

export const createAccount = async ( data ) => {
        const { fullName, email, password, confirmPassword } = data;
        const res = await fetch(`${baseUrl}/session/signup`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password, confirmPassword}),

        });

        if (res.ok) {
            const { user, tokenObj: { token }} = await res.json();
            window.localStorage.setItem("token", token);
            return token;
        }
        const errorRes = await res.json();
        console.log(errorRes);
}

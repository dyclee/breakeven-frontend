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

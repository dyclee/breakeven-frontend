const { baseUrl } = require('../config');

const getToken = async(email, password) => {
    const res = await fetch(`${baseUrl}/session`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password}),
    });

    if (res.ok) {
        const { token } = await response.json();
        window.localStorage.setItem("token", token);
        return token;
    }
}

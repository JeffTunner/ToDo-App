const BASE_URL = "http://localhost:8080";

export const loginUser = async (username, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    });

    return res.json();
};

export const registerUser = async (username, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    });

    return res.json();
}

const getToken = () => localStorage.getItem("token");

export const getTodos = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/todo/all`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return res.json();
};

export const createTodo = async (description) => {
    const res = await fetch(`${BASE_URL}/api/v1/todo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({description}) 
    });

    return res.json();
}

export const completeTodo = async (id) => {
    const res = await fetch(`${BASE_URL}/api/v1/todo/completed/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return res.json();
}

export const deleteTodo = async (id) => {
    await fetch(`${BASE_URL}/api/v1/todo/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}
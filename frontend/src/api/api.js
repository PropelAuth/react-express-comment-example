export const fetcher = (url) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
}

export const createComment = async (username, text) => {
    const response = await fetch("/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            text: text,
        }),
    });
    if (!response.ok) {
        const errorMessage = await response.text()
        throw Error(errorMessage)
    }
}

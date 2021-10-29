export const fetcher = (url) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
}

export const createComment = async (accessToken, text) => {
    const response = await fetch("/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            text: text,
        }),
    });
    if (!response.ok) {
        const errorMessage = await response.text()
        throw Error(errorMessage)
    }
}

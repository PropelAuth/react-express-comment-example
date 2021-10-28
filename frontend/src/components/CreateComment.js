import { useState } from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { createComment } from "../api/api"
import { useSWRConfig } from "swr"

function CreateComment() {
    const [username, setUsername] = useState("")
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const { mutate } = useSWRConfig()

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await createComment(username, text)
            setText("")
            setError(null)

            // Force a refresh of the comments list
            await mutate("/comments")
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <>
            <h3>Leave a comment</h3>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={4} pt={2}>
                        <TextField
                            label="Username"
                            variant="filled"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} pt={2}>
                        <TextField
                            label="Comment"
                            variant="filled"
                            fullWidth
                            multiline
                            minRows={2}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            error={!!error}
                            helperText={error}
                        />
                    </Grid>
                    <Grid item xs={2} pt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default CreateComment

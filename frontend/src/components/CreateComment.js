import { useState } from "react"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { createComment } from "../api/api"
import { useSWRConfig } from "swr"
import {withAuthInfo} from "@propelauth/react";

function CreateComment(props) {
    if (props.isLoggedIn) {
        return <CreateCommentLoggedIn accessToken={props.accessToken} />
    } else {
        return <div><br/>Please login or signup to post</div>
    }
}

function CreateCommentLoggedIn({accessToken}) {
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const { mutate } = useSWRConfig()

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await createComment(accessToken, text)
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

export default withAuthInfo(CreateComment, {
    displayWhileLoading: <CircularProgress />
})

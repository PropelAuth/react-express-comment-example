import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Comment from "./Comment";
import useSWR from "swr";
import {fetcher} from "../api/api";

function Comments() {
    const {data: comments, error} = useSWR("/comments", fetcher)

    // Handle errors and loading cases
    if (error) {
        return <div>Error loading comments</div>
    } else if (!comments) {
        return <CircularProgress/>
    } else if (comments.length === 0) {
        return <div>No comments yet</div>
    }

    // Display as a list of Comments with dividers
    const commentItems = comments.map((comment, index) => {
        return <>
            <Comment comment={comment} key={index}/>
            {index < comments.length - 1 && <Divider component="li"/>}
        </>
    })

    return <List sx={{width: '100%', bgcolor: 'background.paper'}}>
        {commentItems}
    </List>
}

export default Comments
import * as React from "react"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"

export default function Comment({ comment }) {
    const relativeTime = getRelativeTime(comment.created_at)
    return (
        <ListItem alignItems="flex-start">
            <ListItemText
                primary={
                    <>
                        <Typography
                            component="span"
                            variant="subtitle2"
                            style={{ color: "#2f2f2f", fontWeight: "500" }}
                        >
                            {comment.username}
                        </Typography>
                        <Typography
                            component="span"
                            variant="subtitle2"
                            style={{ color: "#2f2f2f", fontWeight: "200" }}
                        >
                            {" "}
                            posted {relativeTime}
                        </Typography>
                    </>
                }
                secondary={<Typography variant="body">{comment.text}</Typography>}
            />
        </ListItem>
    )
}

function getRelativeTime(createdAt) {
    return timeDifference(Date.now(), createdAt * 1000)
}

// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
function timeDifference(current, previous) {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365

    const elapsed = current - previous

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " seconds ago"
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago"
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago"
    } else if (elapsed < msPerMonth) {
        return "~" + Math.round(elapsed / msPerDay) + " days ago"
    } else if (elapsed < msPerYear) {
        return "~" + Math.round(elapsed / msPerMonth) + " months ago"
    } else {
        return "~" + Math.round(elapsed / msPerYear) + " years ago"
    }
}

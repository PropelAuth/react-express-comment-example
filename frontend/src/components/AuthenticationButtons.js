import Button from "@mui/material/Button"
import { withAuthInfo, useLogoutFunction, useRedirectFunctions } from "@propelauth/react"

function AuthenticationButtons({isLoggedIn}) {
    const logoutFn = useLogoutFunction()
    const { redirectToSignupPage, redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions()

    if (isLoggedIn) {
        return <div>
            <Button color="inherit" onClick={redirectToAccountPage}>Account</Button>
            <Button color="inherit" onClick={logoutFn}>Logout</Button>
        </div>
    } else {
        return <div>
            <Button color="inherit" onClick={redirectToSignupPage}>Signup</Button>
            <Button color="inherit" onClick={redirectToLoginPage}>Login</Button>
        </div>
    }
}

export default withAuthInfo(AuthenticationButtons)

import { useAuth } from "../models/useAuth"
import { AuthPageView } from "../views/AuthPageView"

const AuthPagePresenter = () => {
    const authProps = useAuth()

    return <AuthPageView {...authProps} />
}

export default AuthPagePresenter
import Notification from "./Notification"
import loginService from "../services/login"
import blogService from "../services/blogs"
import PropTypes from 'prop-types'

const LoginForm = ({
                       setUsername,
                       setPassword,
                       username,
                       password,
                       errorMessage,
                       setErrorMessage,
                       setUser
                   }) => {

    LoginForm.propTypes = {
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <Notification message={errorMessage} />
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id={'username'}
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id={'password'}
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id={'login-button'} type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
import { useAuth0 } from '@auth0/auth0-react';
import { Button} from "react-bootstrap";


function Login() {

  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  function handleLogin() {
    loginWithRedirect();
  }

  return ! isAuthenticated &&
    <Button variant="success" onClick={handleLogin}>Log in</Button>
  ;
}
export default Login;
import {Alert, Form, Button, Row, Col, Stack} from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Login = () => {
    const {loginInfo, updateLoginInfo, loginUser, registerError, isRegisterLoading} = useContext(AuthContext)
    return (<>
    <Form onSubmit={loginUser}>
        <Row style={{
            height: '100vh',
            justifyContent: 'Center',
            paddingTop: '10%'

        }}>
            <Col xs={6}>
               <Stack gap={3}>
                <h2>Login</h2>
                <Form.Control type='email' placeholder='Email' onChange={(e)=> 
                    updateLoginInfo({...loginInfo, email: e.target.value})
                } />
                <Form.Control type='password' placeholder='Password' onChange={(e)=> 
                    updateLoginInfo({...loginInfo, password: e.target.value})
                } />
                <Button type='submit' variant='primary'>
                    {isRegisterLoading ? 'Logging in your Account' : 'Login'}
                </Button>
                {registerError?.error && (<Alert variant='danger'><p>{registerError?.message}</p></Alert>)}
                

               </Stack>
            </Col>
        </Row>
    </Form>
    </>  );
}
 
export default Login;
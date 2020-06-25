import React, { useState, useEffect } from 'react'
import { Button , Form } from 'react-bootstrap';

const LoginForm = props => {
    const [ user, setUser ] = useState(props.loginForm)
    useEffect(
      () => {
        setUser(props.loginForm)
      },
      [ props ]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]
  
    const handleInputChange = event => {
      const { name, value } = event.target
      setUser({ ...user, [name]: value })
    }
  return (
    <form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="Username"
          value={user.Username}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="Password"
          value={user.Password}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={() => props.login(user)}>
        Đăng nhập
      </Button>
    </form>
  );
}

export default LoginForm

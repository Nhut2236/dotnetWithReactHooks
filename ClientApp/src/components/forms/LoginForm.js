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
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
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

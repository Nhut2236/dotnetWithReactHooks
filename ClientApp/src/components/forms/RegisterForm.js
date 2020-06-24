import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';

const RegisterForm = props => {
    const [ user, setUser ] = useState(props.registerForm)
    useEffect(
      () => {
        setUser(props.registerForm)
      },
      [ props ]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]
  
    const handleInputChange = event => {
      const { name, value } = event.target
      setUser({ ...user, [name]: value })
    }

    const titlePage = {
      fontWeight: 'bolder',
      fontSize: '20px',
      textAlign: 'center'
    };

  return (
    <div>
      <div style={titlePage}>ĐĂNG KÝ</div>
      <div>
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
        <Button variant="danger" onClick={()=> props.register(user) }>Đăng ký</Button>
      </form>
      </div>
    </div>
  )
}

export default RegisterForm

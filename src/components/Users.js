import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
  })

  const fetchUsers = () => {
    axios.get('http://localhost:4000/users')
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/users', newUser)
      .then((res) => {
        alert('User created successfully')
        fetchUsers()
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          avatar: '',
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      {users.map((user) => (
        <Card className="text-center" style={{ width: '500px', margin: '10px auto' }} key={user._id}>
          <Card.Body>
            <img src={user.avatar} style={{ borderRadius: '100%' }} />
            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
            <Card.Text>
              {user.email}
            </Card.Text>
            <Button variant="dark" size="sm">View profile</Button>
          </Card.Body>
        </Card>
      ))}
      <hr />
      <h3>Add a new user</h3>
      <Form style={{ width: '500px', margin: '10px auto' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" value={newUser.firstName} onInput={(e) => setNewUser({
          ...newUser,
          firstName: e.target.value
        })}>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" value={newUser.lastName} onInput={(e) => setNewUser({
          ...newUser,
          lastName: e.target.value
        })}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" value={newUser.email} onInput={(e) => setNewUser({
          ...newUser,
          email: e.target.value
        })}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group className="mb-3" value={newUser.avatar} onInput={(e) => setNewUser({
          ...newUser,
          avatar: e.target.value
        })}>
          <Form.Label>Avatar URL</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Button variant="dark" type="submit">
          Add user
        </Button>
      </Form>
    </>
  );
}

export default Users;
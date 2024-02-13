import { useState } from "react";
import {
  Navbar,
  Container,
  Breadcrumb,
  Button,
  Table,
  Pagination,
  Modal,
  Form,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function generateCompanies(n: number) {
  const companies = [];

  for (let i = 1; i <= n; i++) {
    companies.push({
      id: i,
      name: `Company ${String.fromCharCode(64 + i)}`,
      billingAddress: `${1234 + i} Street, City`,
      phoneNumber: `123-456-${7890 + i}`,
      email: `info@company${String.fromCharCode(64 + i).toLowerCase()}.com`,
    });
  }

  return companies;
}

function App() {
  const companies = generateCompanies(10);
  const [showModal, setShowModal] = useState(false);
  const items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(<Pagination.Item key={number}>{number}</Pagination.Item>);
  }
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#020e33" }}>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Navbar.Brand href="#">REACT BOOTSTRAP</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Breadcrumb>
          <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item active>Companies</Breadcrumb.Item>
        </Breadcrumb>

        <h2>Companies</h2>
        <div className="d-flex justify-content-end my-2">
          <Button variant="primary" className="me-2" onClick={handleShowModal}>
            Add Company
          </Button>
          <Button variant="secondary">Filters</Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Billing Address</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.billingAddress}</td>
                <td>{company.phoneNumber}</td>
                <td>{company.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Pagination>{items}</Pagination>
        </div>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="billingAddress">
              <Form.Label>Billing Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter billing address"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;

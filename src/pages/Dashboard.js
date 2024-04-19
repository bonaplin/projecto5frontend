import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Table } from "react-bootstrap";

function Dashboard() {
  const data = [1, 2, 3];

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="Home users">
              <div className="page-wrap">
                <h2>Dashboard</h2>
                <p>Welcome to the Dashboard</p>
                <Table className="table" type="category" data={data} />
                <div className="main-container"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;

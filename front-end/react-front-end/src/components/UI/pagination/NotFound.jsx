
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="mt-5 text-white">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <h1>404 Not Found</h1>
          <p>
            We&apos;re sorry, but the page you requested could not be found.
          </p>
          <p>Maybe you mistyped the URL, or the page has been removed.</p>
          <Link to="/admin/dashboard">
            <Button variant="primary">Go to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

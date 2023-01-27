import './App.css';
import Header from './Components/Header';
import Container from './../node_modules/react-bootstrap/esm/Container'
import Row from './../node_modules/react-bootstrap/esm/Row'
import Col from './../node_modules/react-bootstrap/esm/Col'

import FormTask from './Components/FormTask';
import TaskTable from './Components/TaskTable';
function App() {
  return (

    <Container>
            <Header/>
      <Row className="justify-content-md-center">
        <Col lg="6">
        <FormTask/>
        <TaskTable/>
        </Col>
        </Row>
    </Container>

  );
}

export default App;

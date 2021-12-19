import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from '../src/components/Form/Form';
import List from '../src/components/List/List'

function App() {
  return (
      <div>
    <Router>
        <Routes>
          <Route path="/" exact element={ <Form />} ></Route>
          <Route path="/list" exact element={ <List />} ></Route>
        </Routes>
      </Router>
      </div>
  );
}

export default App;

import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <div className="pages">
              <Routes>
                <Route
                path='/'
                element={<Home />}
                >
                </Route>
                <Route
                path="/notfound"
                element={<NotFound />}></Route>
                <Route
                path="/:id"
                element={<Redirect />}>
                </Route>
                <Route
                path="*"
                element={<NotFound />}>
                </Route>
              </Routes>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;

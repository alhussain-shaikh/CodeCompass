import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import Header from "./components/header/header.js"
import Body from "./components/body/body.js"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <hr />
      <Body />
      <Projects />
      <Contact />
      <Footer />

    </div>
  );
}

export default App;

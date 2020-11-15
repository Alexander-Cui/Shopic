
import './App.css';
import { useState } from 'react'
import Index from './Components/Index'
import Section2 from './Components/Section2'
import GalleryPage from './Components/GalleryPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import { Link, animateScroll as scroll } from "react-scroll"
// import AnchorLink from 'react-anchor-link-smooth-scroll'

function App() {

  const [dropDownItems, setDropDownItems] = useState({})
  const [galleryImages, setGalleryImages] = useState([])

  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/choose">Choose</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/shop">
            <GalleryPage
              galleryImages={galleryImages}
              setGalleryImages={setGalleryImages} />
          </Route>
          <Route path="/choose">
            <Section2 dropDownItems={dropDownItems}
              setGalleryImages={setGalleryImages} />
          </Route>
          <Route path="/">
            <Index setDropDownItems={setDropDownItems} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

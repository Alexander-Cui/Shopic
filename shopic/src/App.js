
import './App.css';
import { useState } from 'react'
import Index from './Components/Index'
import Section2 from './Components/Section2'
import GalleryPage from './Components/GalleryPage'
import {
  BrowserRouter as Router,
  useLocation,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'antd/dist/antd.css'
import { AnimatePresence, motion} from "framer-motion"
// import { Link, animateScroll as scroll } from "react-scroll"
// import AnchorLink from 'react-anchor-link-smooth-scroll'

function App() {

  const [dropDownItems, setDropDownItems] = useState({ 'dropDown': [], 'fileName': '' })
  const [galleryImages, setGalleryImages] = useState(['one two'])
  const location1 = useLocation();
  const pageTransition = { duration: 3, type:"tween", ease: "easeIn" };

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
      <AnimatePresence exitBeforeEnter>
        <Switch location={ location1} key={location1.pathname}>
          <Route path="/shop">
            <GalleryPage
              galleryImages={galleryImages} transition={pageTransition}
            />
          </Route>
          <Route path="/choose">
            <Section2
              dropDownItems={dropDownItems}
              setGalleryImages={setGalleryImages} transition={pageTransition} />
          </Route>
          <Route path="/">
            <Index setDropDownItems={setDropDownItems}  transition={pageTransition}/>
          </Route>
        </Switch>
     </AnimatePresence>        
      </div>
    </Router>
  );
}

export default App;

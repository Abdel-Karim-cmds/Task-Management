import { Link } from "react-router-dom";

function Navigation(){

    return(
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </div>
    )
}

export default Navigation;

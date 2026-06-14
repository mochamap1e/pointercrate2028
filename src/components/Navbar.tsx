import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

function NavLink({ to, text }: { to: string, text: string }) {
    return (
        <Link to={to}><p>{text}</p></Link>
    )
}

export function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link to="/"><img className={styles.logo} src="/img/logo.png"/></Link>
            <div className={styles.links}>
                <NavLink to="/" text="Demonlist"/>
                <NavLink to="/statsviewer" text="Stats Viewer"/>
            </div>
        </div>
    );
}

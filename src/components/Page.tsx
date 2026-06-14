import { Navbar } from "./Navbar";

import styles from "./Page.module.css";

export function Page({ children }: { children: any }) {
    return (
        <div>
            <Navbar/>
            <div className={styles.page}>
                {children}
            </div>
        </div>
    );
}
import clsx from "clsx";

import { Navbar } from "./Navbar";

import styles from "./Page.module.css";

export function Page({ children, className = "" }: { children: any, className?: string }) {
    return (
        <div>
            <Navbar/>
            <div className={clsx(styles.page, className)}>
                {children}
            </div>
        </div>
    );
}
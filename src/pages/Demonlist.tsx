import { Page } from "../components/Page";

import { list } from "../data/list";
import { Level } from "../components/Level";

import styles from "./Demonlist.module.css";

export function Demonlist() {
    return (
        <Page>
            <div className={styles.list}>
                {list.map((listLevel, index) => (<Level level={listLevel} key={index} placement={index}/>))}
            </div>
        </Page>
    );
}
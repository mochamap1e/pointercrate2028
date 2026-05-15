import { list } from "../data/list";

import Level from "../components/Level";

export default function List() {
    return (
        <div>
            <h1>List</h1>
            <Level level={list[0]}/>
        </div>
    );
}
import { listData } from "../lib/dummydata";
import Card from "./Card"

function List() {
    return (
        <div className="flex flex-col gap-y-[40px]">
            {listData.map(item => (
                <Card key={item.id} item={item}/>
            ))}
        </div>
    )
}

export default List;
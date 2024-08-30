import { listData } from "../lib/dummydata";

import Filter from "../components/Filter";
import Card from "../components/Card";

function ListPage() {
    const data = listData
    
    return (
        <div className="flex h-[100%] mt-6">
            <div className="flex-[3] h-[100%]">
                <div className="pr-[50px] pb-[50px] flex flex-col gap-[50px] h-[100%] overflow-y-scroll">
                    <Filter />
                    {data.map(item => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="flex-[2]">
                Mapa
            </div>
        </div>
    )
}

export default ListPage;
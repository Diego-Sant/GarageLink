import { listData } from "../lib/dummydata";

import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";

function ListPage() {
    const data = listData
    
    return (
        <div className="flex h-[100%] mt-6">
            <div className="flex-[3] h-[100%]">
                <div className="pr-[50px] pb-[50px] flex flex-col gap-[50px] h-[100%]">
                    <Filter />
                    {data.map(item => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="hidden md:block md:flex-[2] h-[800px]">
                <Map items={data} />
            </div>
        </div>
    )
}

export default ListPage;
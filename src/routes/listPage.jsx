import { listData } from "../lib/dummydata";

import Filter from "../components/Filter";
import Card from "../components/Card";

function ListPage() {
    const data = listData
    
    return (
        <div className="flex h-[100vh] mt-6">
            <div className="flex-[3]">
                <div className="pr-[50px]">
                    <Filter />
                    {data.map(item => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="flex-[2] z-10 bg-black">
                Mapa
            </div>
        </div>
    )
}

export default ListPage;
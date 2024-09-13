import Card from "./Card"

function List({ posts }) {

    return (
        <div className="flex flex-col gap-y-[40px]">
            {posts.map((item, index) => (
                <Card key={index} item={item} />
            ))}
        </div>
    )
}

export default List;
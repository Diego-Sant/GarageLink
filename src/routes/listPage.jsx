import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
    const data = useLoaderData();
    
    return (
        <div className="flex mt-6">
            <div className="flex-[3] h-[100%]">
                <div className="pr-[50px] pb-[50px] flex flex-col gap-[50px] h-[100%]">
                    <Filter />
                    <Suspense fallback={
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="loader dark:loaderDark"></div>
                        </div>}>
                        <Await resolve={data.postResponse} errorElement={<p className="text-center text-black dark:text-white text-lg mt-6">Erro ao carregar carros!</p>}>
                            {(postResponse) => 
                                postResponse.data.length > 0 ? (
                                    postResponse.data.map(post => (
                                        <Card key={post.id} item={post}/>
                                    ))
                                ) : (
                                    <p className="text-center text-black dark:text-white text-lg mt-6">Não existe esse carro no nosso banco de dados com essas informações.</p>
                                )
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="hidden md:block md:flex-[2] h-[800px]">
                <Suspense fallback={
                    <div className="flex justify-center items-center">
                        <div className="loader dark:loaderDark"></div>
                    </div>}>
                    <Await resolve={data.postResponse} errorElement={<p className="text-center text-black dark:text-white text-lg mt-6">Erro ao carregar mapa!</p>}>
                        {(postResponse) => <Map items={postResponse.data} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default ListPage;
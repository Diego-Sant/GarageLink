import Navbar from "./components/Navbar"
import HomePage from "./routes/homePage"

function App() {
  return (
    
    <div className="h-[100vh] max-w-full  
      sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1080px] xl:max-w-[1366px] 
      ml-auto mr-auto pl-[20px] pr-[20px]"
    >

      <nav>
        <Navbar />
      </nav>

      <div className="h-[calc(100vh-100px">
        <HomePage />
      </div>
      
    </div>
  )
}

export default App
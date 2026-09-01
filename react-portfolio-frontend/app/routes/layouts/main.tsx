import { Outlet } from "react-router";
import Footer from "~/components/Footer";
const MainLayout = () => {
    return(
        <>
        <section  className="max-w-6xl mx-auto px-6 my-8">
        <Outlet />
        </section>
        <Footer />
        
         </>
    )
}
export default MainLayout;
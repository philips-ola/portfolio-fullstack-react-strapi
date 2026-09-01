import { Outlet } from "react-router";
import Hero from "~/components/Hero";
import Footer from "~/components/Footer";
const HomeLayout = () => {
    return(
        <>
        <Hero />
        <section  className="max-w-6xl mx-auto px-6 my-8">
        <Outlet />
        </section>
        <Footer />
         </>
    )
}
export default HomeLayout;
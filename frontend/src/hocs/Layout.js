import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Layout = (props) => (
    <div>
    <div class="flex flex-col h-screen ">
        <div class="flex bg-red-100 ">
            <Navbar />
        </div>
        <div class="flex flex-1 bg-gray-100">
            {props.children}
        </div>
        <div class="flex bg-blue-100">
            <Footer />
        </div>
    </div>
    </div>
);
export default Layout;

import "../styles/global.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import axios from 'axios'

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AuthProvider } from "../store/authcontext";
import { CardProvider } from "../store/cardcontext";


axios.defaults.baseURL = "http://localhost:3000"

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <CardProvider>
      <>
        <Component {...pageProps} />
        <ToastContainer rtl />
      </>
      </CardProvider>
    </AuthProvider>

  );
}

export default MyApp;

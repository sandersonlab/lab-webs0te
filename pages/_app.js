import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  console.log(pageProps,"pp");
  return (
  
      <Component {...pageProps} />

  );
}

export default MyApp;

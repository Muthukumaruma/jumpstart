import React, { Component } from 'react'
import App from "next/app";
import Head from "next/head";
import Nabar from '../components/navbar/nav';
import Footer from '../components/footer/footer';
import styles from '../sass/styles.scss';
class SpecimanApp extends App {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

//Server side rendering 
  static async getInitialProps({ Component, ctx, router }) {
    const env = process.browser ? "client" : "server";

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    
  }

  render() {
    const { Component, pageProps, router } = this.props;
    const queryParams = router.query;

    return (
      <>
        <Nabar />
        <div className="container">
          <Component {...pageProps} />
        </div>
        <Footer/>
      </>
    );
  }
}
export default SpecimanApp;

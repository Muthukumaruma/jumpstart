import Head from 'next/head';
import React from 'react';
import Country from '../components/banking/country';
import NETWORK from '../components/utls/network';
import SelectBtn from '../components/button/select-btn';
import Swift from '../components/banking/swift';
import Iban from '../components/banking/iban'
import '../sass/components/_banking.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        countrys:[],
        currency:[],
        selectedCountry:[],
        selectedCurrency:[],
        entryOption:"sweft",
        sweftResponse:[]
    }
  }

  componentDidMount(){
    this.getCountry();
  }

  getCountry(){
    let self = this;
    let country = [];
    let currency =[]
    NETWORK.get(`https://restcountries.eu/rest/v2/all?fields=name;flag;currencies;alpha3Code`)
    .then(function(res) {
      res.data.map((data)=>{
        country.push({value:data.alpha3Code, label:<div className='flag'><img src={data.flag} />{data.name}</div>, country:data.name});
        currency.push({value:data.alpha3Code, label:<div className='flag'><img src={data.flag} />{data.currencies[0].code}</div> , currency:data.currencies[0].code})
        
      })
      self.setState({
        countrys:country,
        currency:currency
      })
    })
  }

  setSelectedCountry = (data)=>{
    this.setState({selectedCountry:data})
    this.state.countrys.map((country)=>{
      country.value === data && this.setState({selectedCountry:country})
    })
  }

  setSelectedCurrency = data =>{
    this.state.currency.map((currency)=>{
      currency.value === data && this.setState({selectedCurrency:currency})
    })
    
  }

  setEntryOption = (data)=>{
    this.setState({entryOption:data})
  }

  setSweftResponse = data=>{
    this.setState({sweftResponse:data})
  }

  render(){

    return(
      <>
        <Head>
          <title>SPECIMAN </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Welcome to Speciman</h1>
        <div className="card">
          <div className="banking">
            <div className="banking__info">
              <h3>Banking Information</h3>
              <p>We need to collect this information to send payments to your employer’s behalf.</p>
              <p>Once you submit your informalities, we’ll verify your information before we start sending any payouts there.</p>
            </div>
            <div className="banking__form">
            {this.state.entryOption ==='sweft' ? (
              <>
                <Country  
                  countrys={this.state.countrys} 
                  currency ={this.state.currency}
                  selectedCountry={this.state.selectedCountry}
                  setSelectedCountry={this.setSelectedCountry}
                  selectedCurrency ={this.state.selectedCurrency}
                  setSelectedCurrency={this.setSelectedCurrency}
                />
              </>
            ):(<></>)}
              
              <SelectBtn entryOption ={this.state.entryOption} setEntryOption ={this.setEntryOption}/>
              {this.state.entryOption ==='sweft' ? (
                <>
                  <Swift setSweftResponse={this.setSweftResponse} />
                </> 
              ):(
                <>
                  <Iban selectedCurrency={this.state.selectedCurrency} currency ={this.state.currency} setSelectedCurrency={this.setSelectedCurrency} />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default Home

import React,{useState} from 'react';
import NETWORK from '../utls/network';

const Swift =(props)=>{
    const [swiftId, setSwiftId] = useState("");
    const [time, setTime] = useState(0)
    const [bankData, setBankData] = useState({})
    const [accountNo, setaccountNo] = useState("")
    const [confAccountNo, setconfAccountNo] = useState("")
    const [type, settype] = useState("password");
    const [error, setError] = useState("");
    const [accValid, setaccValid] = useState(false);
    
    const doSearch = (evt) => {
        let searchText = evt.target.value; 
        setSwiftId(evt.target.value.toUpperCase())
        if(evt.target.value.length == 8 || evt.target.value.length == 11){
            if (time ) clearTimeout(time);
            setTime(()=>{
                setTimeout(() => {
                    checkSwift();
                }, 300);
            })
        }
        
      }

      const checkSwift =()=>{
        NETWORK.post(`v1/banks/find`, JSON.stringify({'swift_bic':swiftId}))
        .then(function(res) {
            res !== undefined ? setBankData(res.data) : setBankData([]);
        })
      }

      const validate =()=>{
        setError("")
        accountNo.length>8 ? setError(""): setError("Enter valid account number")
      }

      const validateAcc =(val)=>{
        setconfAccountNo(val)
       
        if( accountNo.length!==0 && val.length === accountNo.length){
            if(val === accountNo){
                setaccValid(true);
                settype("text");
                setError("")
                
            }else{
                setaccValid(false); 
                setError("Account number not same")
            }
        }
      }

    return(
        <>
            <div className="banking__form-set">
                <div className="form-control">
                    <label>SWIFT</label>
                    <input type="text" className="caps" value={swiftId} onChange={(e)=>{doSearch(e)}} />
                    {Object.keys(bankData).length !== 0 ? (<>
                        <div className="bank-detail">
                            <p>
                                {bankData.bank_name} <br />
                                {bankData.bank_address1} <br />
                                {bankData.bank_address2} <br />
                                {bankData.bank_city}, {bankData.bank_state_province} <br />
                                {bankData.bank_postal_code}
                            </p>
                        </div>
                    </>):(<></>)}
                </div>
                <div className="form-control"></div>
            </div>
            <div className="banking__form-set">
                <div className="form-control">
                    <label>Account number</label>
                    <input type={type} value={accountNo} onChange={(e)=>{setaccountNo(e.target.value); setError("")}}  onBlur={(e)=>{validate()}}/>
                </div>
                <div className="form-control">
                    <label>Confirm account number</label>
                    <input type="text" value={confAccountNo} onChange={(e)=>{validateAcc(e.target.value)}} />
                </div>
                
            </div>
            
            {error !== "" ?(
                <>  
                    <div className="banking__form-set">
                        <div className="form-control">
                        <p className="error">{error}</p>
                        </div>
                        
                    </div>
                </>
                ):(<></>)}

                {accValid  ?(
                <>  
                    <div className="banking__form-set">
                        <div className="form-control">
                        <p className="success">Account Number Valid</p>
                        </div>
                        
                    </div>
                </>
                ):(<></>)}
        </>
    )
}

export default Swift;
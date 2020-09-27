import React, {useEffect} from 'react';
import Select from 'react-select';

const Country =(props)=>{

    useEffect(()=>{
        //rerendar when the value changes
    },[props.setSelectedCountry, props.selectedCurrency])

    return(
        <>
            <div className="banking__form-set">
                <div className="form-control">
                    <label>Bank Country</label>
                    <Select
                        classNamePrefix="jump"
                        defaultValue={props.selectedCountry}
                        options={props.countrys}
                        getOptionLabel ={(option)=>option.label}
                        onChange={(e) => {props.setSelectedCountry(e.value); props.setSelectedCurrency(e.value)}}
                    />
                </div>
                <div className="form-control">
                    <label>Currency</label>
                    <Select
                        classNamePrefix="jump"
                        value={props.selectedCurrency}
                        defaultValue={props.selectedCurrency}
                        options={props.currency}
                        onChange={(e) => { props.setSelectedCurrency(e.value) }}
                        readOnly ={true}
                    />
                </div>
            </div>
        </>
    )
}

export default Country
import React from 'react'
import Select from 'react-select'

const Iban = props=>{

    return(
        <>
            <div className="banking__form-set">
                <div className="form-control">
                    <label>Account number</label>
                    <input type="text" />
                </div>
                <div className="form-control">
                    <label>Currency</label>
                    <Select
                        classNamePrefix="jump"
                        defaultValue={props.selectedCurrency}
                        options={props.currency}
                        onChange={(e) => {  }}
                       
                    />
                </div>
            </div>
        </>
    )
}
export default Iban;
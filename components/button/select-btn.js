import React, {useState} from 'react';
import '../../sass/components/_selectbtn.scss';

const SelectBtn =(props)=>{

    return(
        <>
            <div className="banking__form-set">
                <div className="form-control">
                    <div className="btn-select">
                        <div className={"radio " + (props.entryOption === 'sweft' ? 'selected' : '')}>
                            <input type="radio" id="sweft" name="bank" value="sweft" checked={props.entryOption === 'sweft'} onChange={(e)=>{props.setEntryOption(e.currentTarget.value)}} />
                            <label htmlFor="sweft">SWEFT</label>
                        </div>
                        <div className={"radio " + (props.entryOption === 'iban' ? 'selected' : '')}>
                            <input type="radio" id="iban" name="bank" value="iban" checked={props.entryOption === 'iban'} onChange={(e)=>{props.setEntryOption(e.currentTarget.value)}} />
                            <label htmlFor="iban">IBAN</label>
                        </div>
                        </div>
                </div>
            </div>
        </>
    )
}
export default SelectBtn;
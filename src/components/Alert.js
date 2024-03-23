import React from 'react'
// import  { Fragment } from 'react';

export default function Alert(props) {
  const capatalize =(word)=>{
    if (word ==="danger") {
      word="error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() +lower.slice(1);
  }
  
  return (
     <>
    <div className='fixed-top ' style={{height:'50px',marginTop: '55px'}}>
      
   
  {props.alert &&  <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
   <strong>{capatalize(props.alert.type)}</strong> : {props.alert.msg}
  {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
</div>}
</div>
    </>
  )
}
// props.alert this syntax means when the props.alert is null then the state after && is not executed and if the props.alert not equal to null then the condition after && will execute 
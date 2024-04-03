import React from 'react';

const Modal = ({ open, onClose, showData, cleardata,apiotherdata }) => {
  console.log(showData);
  if (!open) return null;
  return (
    <div onClick={ () => {onClose(); cleardata()}} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >

        <div className='modal-cards-container'>
        <div><b>Total Words : {apiotherdata.totalwords}</b></div>
        <div><b>Error Words : {apiotherdata.errorwords}</b></div>
        
          {showData && showData.length > 0 && (
            <div >
              
              
              {showData.map((item, index) => (
                <>
                  <div className='modal-cards'>
                  <div key={index}><b>Bad Word : </b>  {item.bad} </div>
                  <div key={index}><b>Reason : </b> {item.description.en} </div>
                  <div key={index}><b>suggestion :</b> {item.better.join(', ')}</div>
                  </div>
                </>
              ))}
            </div>
          )}

        </div>

        <button  onClick={ () => {onClose(); cleardata()}}>
          Close
        </button>


      </div>
    </div>

  );
};

export default Modal;
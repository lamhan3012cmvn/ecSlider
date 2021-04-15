import { useEffect, useState } from 'react';

const ListImg = (props) => {
  const {isShow,listName}=props
  return (
   
    <div className={isShow?"wrap_popup_list display":"wrap_popup_list"}>
      <div className="title">
        <h3>List Image</h3>
      </div>
      <div className="listBx">
        <div className="list">
          {listName.map((e,i)=>{
            return (
              <div key={i} className="items">
                <p>{i} : {e.name}</p>
                <img src={e.link}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};
export default ListImg;

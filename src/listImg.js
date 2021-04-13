import { useEffect, useState } from 'react';

const ListImg = (props) => {
  const {isShow,listName}=props
  console.log("listVew",listName)
  return (
   
    <div className={isShow?"wrap_popup_list display":"wrap_popup_list"}>
      <div className="title">
        <h3>List Image</h3>
      </div>
      <div className="listBx">
        <div className="list">
          {listName.map((e,i)=>{
            return (<p key={i} className="items">{i} : {e.name}</p>)
          })}
        </div>
      </div>
    </div>
  );
};
export default ListImg;

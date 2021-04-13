
const ModalUpImg = (props) => {
	const {isShow,func,url,nameRef} =props
	const {upLoad,onChange,close}=func
  return (

    <div className={isShow?"wrap_popup display":"wrap_popup"}>
      <div className="title">
        <h3>New image</h3>
      </div>
      <div className="imgBx">
        <img src={url} alt="abc"></img>
      </div>
      <label htmlFor="inputImage" className="btn_inputFile">
        Choose Image
      </label>

      <div className="form-control-input">
        <input type="input" ref={nameRef} required />
        <label>Name Image</label>
      </div>

      <label htmlFor="modal" className="btn_submit" onClick={upLoad} >
        Submit
      </label>
      <input
        type="file"
        className="form-control-file"
        id="inputImage"
        onChange={onChange}
        hidden
      />
    </div>
  );
};
export default ModalUpImg;

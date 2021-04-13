/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import 'antd/dist/antd.css';
import './App.css';
import {useEffect, useRef, useState} from "react"

import { Carousel } from 'antd';
import img1 from '../src/img/1.jpg';
import img2 from '../src/img/2.jpg';
import img3 from '../src/img/3.jpg';
import {storage,fire} from "./base"
function App() {
	console.log("load")
	const [url,setUrl]=useState(null)
	const [image,setImage]=useState(null)
	const nameRef = useRef(null)
	const onChangeImage= (e)=>{
		if(e.target.files&&e.target.files[0])
		{
			const file=e.target.files[0]
			const check=file.name.match(/\.(jpg|jpeg|png|gif)$/)
			if(check)
			{
				setImage(file)
				setUrl(URL.createObjectURL(file))
			}
		}
	} 
	const upLoad=()=>{
		if(image===null)
		{
			return;
		}
		const updateTask= storage.ref(`images/${image.name}`).put(image)
		updateTask.on(
			"state_changed",snapshot=>{},
			error=> console.log(error),
			async ()=>{
				const res=await storage.ref("images").child(image.name).getDownloadURL()
				res&&upDatabase(nameRef.current.value,res)
			}
		)
	}
	const upDatabase=async(name,link)=>{
		await fire.firestore().collection('Image').add({
			name:name,
			link:link
		})
	}

	// useEffect(() => {
	// 	upDatabase()
	// }, [])
	return (
		<div className='App'>
			<section className='hero'>
					<input type='checkbox' id='modal' hidden/>
					<label htmlFor='modal' className='overlay'></label>
					{/* <input type='checkbox' id='modal_listImage' hidden/>
					<label htmlFor='modal_listImage' className='overlay'></label> */}

					<div className='wrap_popup'>
						<div className="title">
							<h3>New image</h3>
						</div>
						<div className='imgBx'>
							<img src={url} alt="abc"></img>
						</div>
						<label htmlFor="inputImage" className="btn_inputFile" >Choose Image</label>

						<div className="form-control-input">
							<label>Name Image</label>
							<input type="input"  ref={nameRef}/>
						</div>
					
						<label htmlFor='modal' className='btn_submit' onClick={upLoad}>
							Submit
						</label>
						<input type="file" className="form-control-file" id="inputImage" onChange={onChangeImage} hidden/>
					</div>

					{/* <div className='wrap_popup wrap_popup_list'>
						<div className="title">
							<h3>List Image</h3>
						</div>
						<div className="listBx">
							<div className="list">
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
								<p className="items">
									index  :  name
								</p>
							</div>
						</div>
					</div> */}

				<nav className='navbar'>
					<div className='navbar-container'>
						<div className='nav-logo'>
							<h3> o0oKenZyo0o </h3>
						</div>
						<div className='nav-menu'>
							<ul className='nav-menu_wrap'>
								<li className='nav-items'>
									<a href='#'> about us </a>
								</li>
								<li className='nav-items'>
									<a href='#'> services </a>
								</li>
								<li className='nav-items'>
									<a href='#'> works </a>
								</li>
								<li className='nav-items'>
									<a href='#'> contact </a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className='wrap_hero'>
					<div className='contentBx'>
						<div className='content'>
							<h2>
								We &#32;<span>&#32; are &#32;</span> <br />
								concept studio
							</h2>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Accusamus omnis nihil molestias ipsum quaerat aut
								exercitationem `?
							</p>
							<div className="popup">
								<label htmlFor='modal' className='btn_Popup'>
									Up Load
								</label>
								<label htmlFor='modal_listImage' className='btn_Popup'>
									List Image
								</label>
							</div>
						</div>
					</div>
					<Carousel effect='fade' autoplay className='sliderBox'>
						<div>
							<div
								className='card'
								style={{
									background: `url(${img1})`
								}}>
								<div className='glass'> </div>
							</div>
						</div>
						<div>
							<div
								className='card'
								style={{
									background: `url(${img2})`
								}}>
								<div className='glass'> </div>
							</div>
						</div>
						<div>
							<div
								className='card'
								style={{
									background: `url(${img3})`
								}}>
								<div className='glass'> </div>
							</div>
						</div>
					</Carousel>
				</div>
				<div className='worker'>
					<h3> Worker </h3>
				</div>
			</section>
		</div>
	);
}

export default App;

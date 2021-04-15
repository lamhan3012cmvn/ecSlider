/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import {useEffect, useRef, useState} from "react"
import ModalUpImg from './modalUpImg';
import ListImg from './listImg';
import {storage,fire} from "./base"
import Slider from "react-slick";
function App() {
	
	const [showListImg,setshowListImg]=useState(false)
	const [showUpload,setshowUpload]=useState(false)

	const hidden=()=>{
		setshowListImg(false)
		setshowUpload(false)
	}
	const [list,setList]=useState([])
	const fetch=async()=>{
		const resArr=[]
		await fire.firestore().collection('Image').get().then(res=>{
			const docs=res.docs
			docs.forEach(e=>resArr.push(e.data()))
		})
		setList(resArr)
		}
	useEffect(()=>{
		
		fetch()
		
	},[])

	
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
				console.log(res)
				res&&upDatabase(nameRef.current.value,res)
				hidden()
			}
		)
	}
    const upDatabase=async(name,link)=>{
		await fire.firestore().collection('Image').add({
			name:name,
			link:link
		})
		setList([])
		fetch()
	}
	const settings = {
		dots: false,
		infinite: true,
		speed: 400,
		autoplay:true,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	return (
		<div className='App'>
			<section className='hero'>
					<label className={(showListImg||showUpload)?"overlay  block":"overlay"} onClick={hidden}></label>
					<ModalUpImg isShow={showUpload} url={url} nameRef={nameRef} func={{upLoad:upLoad,onChange:onChangeImage}}/>

					<ListImg isShow={showListImg} listName={list}/>

				<nav className='navbar'>
					<div className='navbar-container'>
						<div className='nav-logo'>
							<h3> o0oKenZyo0o </h3>
						</div>
						<div className='nav-menu'>
							<ul className='nav-menu_wrap'>
								<li className='nav-items'>
									<a> about us </a>
								</li>
								<li className='nav-items'>
									<a> services </a>
								</li>
								<li className='nav-items'>
									<a> works </a>
								</li>
								<li className='nav-items'>
									<a> contact </a>
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
								<label className='btn_Popup' onClick={()=>setshowUpload(true)}>
									Up Load
								</label>
								<label className='btn_Popup' onClick={()=>setshowListImg(true)}>
									List Image
								</label>
							</div>
						</div>
					</div>
					{list.length>0&&(
						<Slider {...settings} className='sliderBox'>
							{list.map(e=>{
							return(
								<div>
									<div
									className='card'
									style={{
										background: `url(${e.link})`
									}}>
									<div className='glass'>
									<h3>
											{e.name}
									</h3>
									</div>
									
								</div>
							</div>)})}
						</Slider>
						
					)}	
					
				</div>
				<div className='worker'>
					<h3> Worker </h3>
				</div>
			</section>
			
		</div>
	);
}

export default App;

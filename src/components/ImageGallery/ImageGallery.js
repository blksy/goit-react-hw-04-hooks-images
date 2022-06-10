import React, { Component } from 'react'
import API from '../ApiService/API'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'

import "./ImageGallery.scss"
import Loader from '../Loader/Loader'

const Status = {
  LOADING: "loading",
  REJECTED: "rejected",
  MODAL: "modal"
}
export default function ImageGallery({imgName}) {
  const [hits, setHits] = useState([])
  const [modalImg, setModalImg] = useState("")
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [showLoadMore, setShowLoadMore] = useState(false)
  const [status,setStatus] = useState("waiting")
  const [prevImgName, setPrevImgName] = useState("")

  const showModal = (img) => {
    setModalImg(img)
    setStatus(Status.MODAL)
  }

 const closeModal = () => {
    setStatus(Status.REJECTED)
  }

useEffect(() => {
if (imgName !== prevImgName){
  setPage(0)
  setStatus(Status.LOADING)
  setHits(null)
  setPrevImgName(imgName)
  setPage(1)
  }
}, [imgName])

useEffect(()=>{
if (page>0){
  API.FetchImg(imgName, page)
  .then(data => {
    if (page === 1) {
      if (data.total>0 && data.total<=12){
             setHits(data.hits)
              setError(null)
             }
      if (data.total===0){
             setError(true)
             setHits(null)
           }
      if (data.total>12){
                 setMaxPage(Math.ceil(data.totalHits/12))
                 setHits(data.hits)
                 setShowLoadMore(true)
                 setError(null)
                 }
    }else {setHits([...hits, ...data.hits])}
})
.finally(()=>{
  setStatus(Status.REJECTED);
  setShowLoadMore(true);
  if (page>=2) {
    scroll()
  }
})}
}, [page, prevImgName])

function loadMore () {
 setStatus(Status.LOADING)
 setShowLoadMore(false)
 setPage(page+1)
}

const scroll = () => {
  window.scrollBy({
  top: 500,
  behavior: 'smooth',
  })
}

return (
  <section>
  {error && <div className='wrap'><h2>Zdjęcia z nazwą  <span className='wrapper'>{imgName}</span> Nie znaleziono</h2></div>}
  {imgName === "" && <div className='wrap'><h2>Wpisz tekst, aby wyszukać zdjęcie</h2></div>}
  {hits && <><ul className="gallery">{hits.map(img => <ImageGalleryItem key={img.id} URL={img.webformatURL} largeImg={img.largeImageURL} alt={imgName} showModal={showModal} />)}
  </ul> </>}
  {status === "loading" && <Loading/>}
  {maxPage !== page && hits && showLoadMore && <Button loadMore={loadMore}/> }
  { status === "modal" && <Modal  URL={modalImg} closeModal={closeModal}  />}
  </section>
)}

import React, { Component } from 'react'
import "./ImageGalleryItem.scss"

export default function ImageGalleryItem({largeImg, showModal, URL, alt }) {
  const modal = (e) => {
    showModal(largeImg)
}

return (
  <li className="gallery-item">
    <img src={URL} alt={alt} onClick={modal} />
  </li>
 )
}

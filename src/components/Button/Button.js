import React, { Component } from 'react'

export default function Button({loadMore} ) {
  return (
    <div className='wrap'><button className='loadMoreBtn' type='button' onClick={loadMore} > load more... </button></div>
  )
}

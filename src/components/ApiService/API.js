function FetchImg(name, page) {
    return fetch(`https://pixabay.com/api/?q=${name}&page=${page}&key=26975997-de7a8a152454f319936439968&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Brak obrazu o podanej nazwie ${name}`));
    });
  }
   
  const api = {
    FetchImg,
  }; 

  export default api;
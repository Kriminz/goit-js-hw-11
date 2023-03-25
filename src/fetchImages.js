import axios from 'axios';
export default class ImgApiGallery {
  constructor() {
    this.searchQuery ='';
    this.page = 1;
  }

  fetchImages() {
    console.log(this.searchQuery);
    this.incrementPages();
    const KEY = '?key=34723488-66dab51363ef0d45c9f34cb5f';
    return axios.get(`https://pixabay.com/api/${KEY}&q=${this.searchQuery}&image_type=photo&
    orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
      // .then((response) => response.json())
      .then(function ({data}) {
        // console.log(response);
        // this.incrementPages();

        return data;
        // console.dir(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  incrementPages(){
    this.page += 1;
  }

  resetPages() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
// return
// .then(function (response) {
  // return response.data;
  // console.dir(response);
// })      .then((response) => response.json())
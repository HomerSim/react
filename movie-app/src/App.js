import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';


class App extends Component {
  // render : componentWillMount() -> render() -> componentDidMount()
  // update : componentWillreceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> compoentDidUpdate()

  state = {}

  componentWillMount() {
    // start

  }

  //render 후 호출됨 
  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie 
          title={movie.title_english} 
          poster={movie.medium_cover_image} 
          key={movie.id} 
          genres={movie.genres}
          synopsis={movie.synopsis}  
          >
          </Movie>
    });
    return movies;
  }

  //async 비동기 처리 
  // await _callApi()가 끝나길 기다린다 (동기)
  // async 안쓰면 await 동작 안함
   _getMovies = async () => {
    
    const movies = await this._callApi();
    //await 끝나고 아래 코드 실행됨 
    this.setState({
      movies
    })
  }

  _callApi = () => {
    // 성공 end
    // ajax get
    
    /* 
      프로미스 기능
     첫뻔재 라인이 끝나든 말든 두번째 라인 작업을 함 (동기 , 비동기)
     시나리오 캐치 영화를 보러간다, 영화를 보지 못한다 
     시나리오 관리 가능
    */
   //fetch = ajax, then 속성값은 한개만 있음
   //https://yts.lt/api/v2/list_movies.json?sort_by=rating
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=like_count')
          .then(potato => potato.json())
          .then(json => json.data.movies)
          .catch(err => console.log(err))
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}



export default App;

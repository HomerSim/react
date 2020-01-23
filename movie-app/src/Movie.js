import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import LinesEllipsis from 'react-lines-ellipsis';

/*
class Movie extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        poster : PropTypes.string
    };
    render(){
        
        return (
            <div>
                <MoviePoster poster={this.props.poster}/>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}
*/
/*
class MoviePoster extends Component {
    static propTypes = {
        poster : PropTypes.string.isRequired // string 타입 및 필수 로 지정
    };
    render() {
        return (
            <img src={this.props.poster} />
        );

    }

}
*/

// 렌더링 필요 없을땐 함수로 생성함, 라이프 사이클 없음!
function Movie({title, poster, index, genres, synopsis}) {
    return (
        <div className="Movie">
            <div className="Movie__Columns">
                <MoviePoster poster={poster} alt={title}/>
            </div>
            <div className="Movie__Columns">
                <h1>{title}</h1>
                <div className="Movie__Genres">
                    {genres.map(genre => <MovieGenre genre={genre} key={index} />)}
                </div>
                <div className="Movie__Synopsis">
                    <LinesEllipsis 
                        text={synopsis}
                        maxLine='3'
                        ellipsis=' ...'
                        trimRight
                        basedOn='letters'>
                    </LinesEllipsis>
                    
                </div>
            </div>
        </div>       
    );
}

function MoviePoster({poster, alt}) {
    return (
        <img src={poster} className="Movie__Poster" alt={alt} title={alt}/>
    );
}

function MovieGenre({genre}) {
    return (
        <span className="Movie__Genre">{genre} </span>
    );
}
//props 변수 타입 체크 하는 거 
Movie.propType = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    synopsis: PropTypes.string.isRequired,
}

MoviePoster.propType = {
    poster: PropTypes.string.isRequired,
    alt:PropTypes.string.isRequired
}

export default Movie;


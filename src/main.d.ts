interface MoviesList{
    entities:Array<any>,
    status?:'idle'|'pending'|'fulfilled'|'rejected',
    length?:number,
}
interface Genre {
    id:number,
    name:string
}
interface Video {
    id:number,
    results:Array<any>
}
interface Card {
    id:number,
    genreIds:Array<number>,
    title:string,
    voteAverage:number,
    overview:string,
    posterPath:string,
    movieGenres?:Array<any>,
    handleMouseHoverEvent?(id?:number):void,
    isVisible?:boolean,
    trailerKey?:string
}
interface MovieDetails {
    backdropPath:string|null,
    posterPath:string|null,
    id:number,
    movieGenre:Array<Genre>,
    title:string|null,
    tagline:string|null,
    runtime:number|null,
    releaseDate:string,
    overview:string|null

}

declare module '*.module.scss';
declare module 'react-modal-video';

import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../css/SectionsTop.css'

export default class SectionsTop extends Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            display: 'show'
        }
    }

    async componentDidMount() {
        let articles;
        articles = await axios.get(`./${this.props.picks}`)
        articles = articles.data.results.filter(art => {if(art.multimedia.length > 0) return art});
        this.setState({articles})
    }

    render() {
        let sectionClasses = [this.state.display , "section"] 
        return (           
            <div className="outside-box">
                <div classlist={sectionClasses}>
                    <span>{`${this.props.picks.toUpperCase()}`}</span>
                </div>
                <div className='grid-container'>{this.state.articles.slice(0,3).map((article, i) => {
                    return(
                            <div key = {`article-title-${i}`} className="card">
                                <img className="card-img-top" src={article.multimedia[1].url} alt="na"/>
                                <p className ="card-title">{article.title}</p>
                                <p className ="card-body">{article.abstract}</p>
                                <div className="click-more">
                                    <a href={article.url} className="btn btn-warning"> Continue Reading</a>
                                </div>
                            </div>
                            )
                    })}
                </div>
                <div className="btn btn-warning">
                    <Link  to={`/allnews?p=${this.props.picks}`}>{`More ${this.props.picks} News`}</Link>
                </div>
            </div>
        )
    }
}


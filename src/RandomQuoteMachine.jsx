// READINGS:
// initialisation
// https://reactjs.org/docs/faq-ajax.html
// animations with styled-components
// https://codeburst.io/animating-react-components-with-css-and-styled-components-cc5a0585f105

import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
const url = "https://type.fit/api/quotes"; // quotes API
let quotes;

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: ""
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    this.getQuotes();
  }

  async getQuotes() {
    // use when component mounts initially
    // get quotes JSON object from API
    let response = await fetch(url);
    if (response.ok) {
      quotes = await response.json();
      // Get an initial quote to display
      this.getRandomQuote();
    } else {
      alert("HTTP Error:" + response.status);
    }
  }

  getRandomQuote() {
    // pick a random quote from the quotes object
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let quote = quotes[randomIndex];
    let text = quote.text;
    let author = quote.author ?? "Unknown";

    this.setState({
      quote: text,
      author: author
    });
  }

  render() {
    let quote;
    let author;
    if (this.state.quote !== "") {
      quote = <p id="text">{`"${this.state.quote}"`}</p>
    } else {
      quote = <p id="text"></p>
    }
    if (this.state.author !== "") {
      author = <p id="author">- {this.state.author}</p>
    } else {
      author = <p id="author"></p>
    }
    return (
      <div className="RandomQuoteMachine">
        <h1>Random Quote Machine</h1>
        <div id="quote-box" className="flex-centered">
          {quote}
          {author}
          <div className="buttons-container">
            <a
              className="button"
              id="tweet-quote"
              href="twitter.com/intent/tweet"
            >
             <FontAwesomeIcon id="twitter-icon" icon={faTwitter} color="#1da1f2" />
            </a>
            <button
              id="new-quote"
              className="button"
              onClick={this.getRandomQuote}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomQuoteMachine;

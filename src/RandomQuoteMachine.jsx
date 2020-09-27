// READINGS:
// initialisation
// https://reactjs.org/docs/faq-ajax.html
// animations with styled-components
// https://codeburst.io/animating-react-components-with-css-and-styled-components-cc5a0585f105

import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
// quotes API from https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373
const url = "https://type.fit/api/quotes";
let quotes;

// styled components
const animation = keyframes`
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
`;
const StyledText = styled.p`
  animation: ${animation} 2.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: "",
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
      quoteIndex: randomIndex,
      quote: text,
      author: author
    });
  }

  render() {
    let quoteElement;
    let authorElement;
    let quoteIndex = this.state.quoteIndex;
    let quoteText = this.state.quote;
    let authorName = this.state.author;

    if (this.state.quote !== "") {
      quoteElement = <StyledText key={`quote-${quoteIndex}`} id="text">{`"${quoteText}"`}</StyledText>
    } else {
      quoteElement = <StyledText key={`quote-${quoteIndex}`} id="text"></StyledText>
    }
    if (this.state.author !== "") {
      authorElement = <StyledText key={`author-${quoteIndex}`} id="author">- {authorName}</StyledText>
    } else {
      authorElement = <StyledText key={`author-${quoteIndex}`} id="author"></StyledText>
    }
    
    return (
      <div className="RandomQuoteMachine">
        <div id="quote-box" className="flex-centered">
          {quoteElement}
          {authorElement}
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

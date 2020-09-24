import React from "react";
const url = "https://quotes.rest/"; // quotes API

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: "",
      randomQuote: "",
      author: ""
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }
  async getQuotes() {
    // use when component mounts initially
    // get quotes JSON object from API
    // put into quotes property of the state object
    const endpoint = "qod.json?category=inspire";
    let response = await fetch(url+endpoint);

    if (response.ok) {
      let json = await response.json();
      console.log(JSON.stringify(json));
    } else {
      alert("HTTP Error:" + response.status);
    }
  }
  getRandomQuote() {
    // pick a random quote from the quotes object
    // put into state object randomQuote and author properties
  }
  render() {
    return (
      <div className="RandomQuoteMachine">
        <h1>Random Quote Machine</h1>
        <div id="quote-box">
          <p id="text">"Quote here"</p>
          <p id="author">- Author here</p>
          <a type="button" id="tweet-quote" href="twitter.com/intent/tweet">
            Tweet
          </a>
          <button id="new-quote" onClick={this.getQuotes}>New quote</button>
        </div>
        <Attribution />
      </div>
    );
  }
}

// They Said So - Quotes API Attribution
const Attribution = () => {
  return (
    <span className="attribution">
      <img
        src="https://theysaidso.com/branding/theysaidso.png"
        alt="theysaidso.com"
      />
      <a
        href="https://theysaidso.com"
        title="Powered by quotes from theysaidso.com"
      >
        They Said So®
      </a>
    </span>
  );
};

export default RandomQuoteMachine;

import React from "react";
import { Component } from "react";
import handShake from "../Assets/images/handshake.gif";
import diceImage from "../Assets/images/dice.png";
import "../Assets/styles/error-boundary.css";
import { Helmet } from "react-helmet";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div className="">
          <div className="dice">
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export class LuckyNumber extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  componentDidMount() {
    this.setState({ number: Math.floor(Math.random() * 10) });
  }

  render() {
    return (
      <div className="game-sec">
        {/* about game */}
        <div className="about-game">
          <span className="pinned">📌</span>
          <p>
            Roll the dice to see if you are lucky enough to win the game. <br />
            If you roll a 7, you win! <br />
            If you roll an even number, you lose!
          </p>
        </div>
        {/* button to refresh to see a new number*/}

        <img
          src={diceImage}
          onClick={() =>
            this.setState({ number: Math.floor(Math.random() * 10) })
          }
          alt="dice"
          className="dice"
        />
        <h1>Your lucky number is {this.state.number} </h1>
        {this.state.number === 7 ? (
          <div>
            <h2>CONGRATS! You hit the jackpot! 🥳🤩</h2>
            <img src={handShake} alt="handshake"className="hand-s" />
          </div>
        ) : null}
        {/* throw error for even numbers */}
        {this.state.number % 2 === 0 ? (
          <div>
            <h2>Ouch! You rolled an even number. You lose! 😢😭</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export const ErrorBoundaryExample = () => {
  return (
    <div className="dice-main">
      <Helmet>
        <title>Error Boundary</title>
        <meta name="description" content="Error Boundary Example" />
        <link
          rel="canonical"
          href="/error-boundary"
              
        />
      </Helmet>
      <div className="dice-m">
        <ErrorBoundary>
          <LuckyNumber luckyNumber={7} />
        </ErrorBoundary>
        {/* back button  */}
        <button onClick={() => window.history.back()} className="error-btn">
          Back
        </button>
      </div>
    </div>
  );
};

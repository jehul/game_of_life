import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";

import "./Home.css";

import conwayImg from "../../images/conway.jpeg";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-container">
        <div className="title-container">
          <h1 className="header">Conway's Game of Life</h1>
        </div>
        <div className="black-container"></div>
        <div className="img-container">
          <img alt="conway sitting in office." src={conwayImg} />
        </div>
        <Link to="/game">
          <Button className="game-button">Let's get started.</Button>
        </Link>
      </div>
      <div className="description-container">
        <div className="description">
          <p>
            John Horton Conway (1937-2020) was an English mathematician who
            invented this cellular automata called the Game of Life. One
            interacts with the Game of Life by creating an initial configuration
            and observing how it evolves. It is Turing complete and can simulate
            a universal constructor or any other Turing machine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

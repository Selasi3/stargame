import React, { useState, useEffect } from 'react';
import utils from '../math-utils';
import PlayAgain from "./PlayAgain"
import PlayNumber from "./PlayNumber"
import StarsDisplay from './StarsDisplay';
const useGameState = () => {

    const [stars, setStars] = useState(utils.random(1,9));
    const [availableNums, setAvailableNums] = useState(utils.range(1,9));
    const [candidateNums, setCandidateNums] = useState([1,2,3]);
    const [secondsLeft, setSecondsLeft] =  useState(10);

    // setinterval , setTimeout,
    useEffect(() => {
      if(secondsLeft > 0 && availableNums.length > 0){
         const timerId = setTimeout(() => {
          setSecondsLeft(secondsLeft - 1)
        }, 1000);
        return () => clearTimeout(timerId);
      }

    });

    const setGameState = (newCandidateNums) => {
      if(utils.sum(newCandidateNums) !== stars){
        setCandidateNums(newCandidateNums);
      }

      else{
        const newAvailabeNums = availableNums.filter(
          n => !newCandidateNums.includes(n));
          setStars(utils.randomSumIn(newAvailabeNums,9))
          setAvailableNums(newAvailabeNums);
          setCandidateNums([]);
      }
    };
    return {stars, availableNums, candidateNums, secondsLeft, setGameState}


    }


const Game = (props) => {

    const {
      stars,
      availableNums,
      candidateNums,
      secondsLeft,
      setGameState
    } =
      useGameState();




    const candidatesAreWrong = utils.sum(candidateNums) > stars;


    const gameStatus = availableNums.length === 0 ?
                      'won' : secondsLeft === 0 ? 'lost':'active';




    const numberStatus = (number) => {
      if(!availableNums.includes(number)){
        return "used";
      }
      if(candidateNums.includes(number)){
        return candidatesAreWrong ? "wrong" : "candidate";
      }

      return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
      if(gameStatus !== 'active' || currentStatus === 'used'){
        return ;
      }

      const newCandidateNums =
      currentStatus === 'available' ?
      candidateNums.concat(number):
      candidateNums.filter(cn => cn !== number)

   setGameState(newCandidateNums);


    }

    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            { gameStatus !== 'active' ?
            <PlayAgain onClick = { props.startNewGame } gameStatus={ gameStatus }/>: (<StarsDisplay count={stars} />)}

          </div>
          <div className="right">
            {utils.range(1, 9).map(number =>
              <PlayNumber
                key={number}
                status = {numberStatus(number)}
                number={number}
                onClick = {onNumberClick}/>
            )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };
export default Game;
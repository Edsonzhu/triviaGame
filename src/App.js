import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import data from './utils/questions.json';

// Context
import {PointsContext} from './context/Points';

// Components
import Card from './components/Card';
import Timer from './components/Timer';

const NUMBER_OF_QUESTIONS = 16;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #cc8400;
  position: relative;
  padding: 0 10%;
  box-sizing: border-box;
`

const Title = styled.h1`
  text-align: center;
  color: white;
  margin: 0;
  padding: 40px 0;
  font-size: 50px;
`

const Subtitle = styled(Title)`
  font-size: 40px;
  position: absolute;
  
  ${({totalPoints}) => totalPoints > 0 ? `
    & span {color: green;}
  ` : totalPoints < 0 && `
    & span {color: red;}
  `}  
`

const TimerWrapper = styled(Timer)`
  position: absolute;
  top: 94px;
`

const GridContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
`

const App = () => {
  const {totalPoints} = useContext(PointsContext);
  const [questions, setQuestions] = useState([]);

  const getRandomQuestions = () => {
    const questions = data;
    const selectedQuestions = [];

    for(let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
      const totalQuestions = questions.length;
      const index = Math.floor(Math.random() * totalQuestions);
      selectedQuestions.push(questions.splice(index, 1)[0]);
    }

    setQuestions(selectedQuestions);
  }

  useEffect(() => {
    getRandomQuestions();
  }, []);

  return (
    <Container>
      <Subtitle totalPoints={totalPoints} >Score: <span>{totalPoints}</span></Subtitle>
      <Title>
        Trivia!
      </Title>
      <TimerWrapper />
      <GridContainer>
        {questions.length !== 0 && questions.map(elem => <Card data={elem} />)}
      </GridContainer>
    </Container>
  );
}

export default App;

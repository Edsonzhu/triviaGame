import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';

// Context
import {PointsContext} from '../context/Points';

const categoryColor = {
  "sports": "#ffffb1",
  "nature": "#c4ffc4",
  "music": "#ffc4c4",
  "science": "#b1b1ff"
}

const Container = styled.div`
  padding: 10px;
  border: 3px solid white;
  border-radius: 20px;
  background-color: ${({color}) => color};
  min-height: 60px;
  text-align: center;
  cursor: pointer;
  margin-bottom: auto;

  ${({isCorrect}) => isCorrect && `
    border: 3px solid green;
  `}

  ${({isCorrect}) => isCorrect === 'wrong' && `
    border: 3px solid red;
  `}
`

const Choices = styled.div`
  font-weight: 600;
  cursor: pointer;

  &: hover{
    color: gray;
  }
`

const Points = styled.p`
  font-size: 44px;
  margin: 0;
  font-weight: 600;

  ${({isCorrect}) => isCorrect && `
    color: green;
  `}  

  ${({isCorrect}) => isCorrect === 'wrong' && `
    color: red;
  `}
`

const Line = styled.div`
  height: 1px;
  width: 80%;
  margin: 10px auto;
  background-color: gray;
`

const Card = ({data}) => {
  const {
    setTotalPoints, 
  } = useContext(PointsContext);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const points = useRef(Math.ceil(Math.random() * 5)); // It is used to not change the point during rerendering of the component

  const handleToggle = () => {
    (isCorrect === null) && setIsOpen(prev => !prev);
  }

  const handleCheckAnswers = (selected) => {
    if (selected === data.correct) {
      setTotalPoints(prev => prev+=points.current);
      setIsCorrect(true);
    } else {
      setIsCorrect("wrong");
      setTotalPoints(prev => prev-=points.current);
    }
  }

  return <Container color={categoryColor[data.category]} isCorrect={isCorrect} onClick={handleToggle} >
    {isOpen 
    ? <>
      {data.question}
      <Line />
      {data.answers.map((elem, i) => (
        <Choices onClick={() => handleCheckAnswers(i)} key={`${elem}${i}`} >{elem}</Choices>)
      )}
    </>
    : <Points isCorrect={isCorrect} >
      {points.current}
    </Points>}
  </Container>
}

export default Card;
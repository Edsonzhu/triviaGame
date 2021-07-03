import { createContext, useEffect, useState } from "react";

export const PointsContext = createContext();

export default ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [clearTimer, setClearTimer] = useState(false);
  const [timeout, setCustomTimeout] = useState(false);
  
 return <PointsContext.Provider 
    value={{
      totalPoints, 
      setTotalPoints, 
      startTimer, 
      setStartTimer, 
      clearTimer, 
      setClearTimer, 
      timeout, 
      setCustomTimeout
      }}
    >
    {children}
  </PointsContext.Provider>
}
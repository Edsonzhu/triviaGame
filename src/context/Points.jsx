import { createContext, useEffect, useState } from "react";

export const PointsContext = createContext();

export default ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  
 return <PointsContext.Provider 
    value={{
      totalPoints, 
      setTotalPoints,
      }}
    >
    {children}
  </PointsContext.Provider>
}
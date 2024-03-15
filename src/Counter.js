import React, { useEffect } from "react"; 
import { useState } from "react";

export default function Counter()
{
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(100);

    useEffect(() => {
            console.log("mounting phase...");

            return function()
            {
                console.log("exit!!");
            }

        }, []
    )

    useEffect(() => {
            console.log("updating phase...");
        }, [count, count2]
    )
    
    return (
        <div>
            <h1>Counter 1 : {count}</h1>
            <button onClick={() => {setCount(count + 1)}}>+</button>
            <button onClick={() => {setCount(count - 1)}}>-</button><br></br>
            <h1>Counter 2 : {count2}</h1>
            <button onClick={() => {setCount2(count2 + 1)}}>+</button>
            <button onClick={() => {setCount2(count2 - 1)}}>-</button>
        </div>
    );
}
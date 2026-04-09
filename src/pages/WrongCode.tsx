import { useState } from "react"

function WrongCode() {
    const [count, setCount] = useState(0)
    function handleClick() {
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
    }
    return <>
        <h1>Wrong Code</h1>
        <p>Count: {count}</p>
        <button onClick={handleClick}>Click Me to increase the counter by 2</button>
    </>

}

export default WrongCode
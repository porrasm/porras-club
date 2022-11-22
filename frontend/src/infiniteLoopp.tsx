import { useState } from "react"

export const InfiniteLoop = () => {
  const loop = () => {
    let i = 1
    while (true) {
      if (window.confirm(`loop ${i}`)) {
        i++
      } else {
        window.alert("trieded to end infinite loop but its infinite. freezing browser...")
        break
      }
    }

    while (true) {
      i++
    }
  }
  return <div style={{ "display": "flex", "flexDirection": "column" }}>
    <span>welcome to infinite loopo</span>
    <button onClick={loop}>start loop: {"((warneing: infinite))"}</button>
  </div>
}

export const Calculator = () => {
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [c, setC] = useState("")

  const plus = () => {
    setC(a + b)
  }
  const minus = () => {
    // remove all letters from a which exist in b
    setC(a.replace(new RegExp(`[${b}]`, "g"), ""))
  }
  const times = () => {
    // add b before every letter from a
    setC(a.split("").map(l => b + l).join(""))
  }
  const divide = () => {
    try {
      setC((Number(a) / Number(b)).toString())
    } catch (e) {
      setC("error (divide by 0)")
    }
  }

  const flip = () => {
    const temp = a
    setA(b)
    setB(temp)
  }

  return <div>
    <input value={a} onChange={e => setA(e.target.value)} />
    <input value={b} onChange={e => setB(e.target.value)} />
    <button onClick={plus}>+</button>
    <button onClick={minus}>-</button>
    <button onClick={times}>*</button>
    <button onClick={divide}>/</button>
    <button onClick={flip}>flippe:</button>
    <span>Resulte: {c}</span>
  </div>
}

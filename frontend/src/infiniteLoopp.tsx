import { useState } from "react"
import cx from "classnames"
import styles from "./styles.module.scss"

const style: React.CSSProperties = {
  position: "fixed",
  bottom: "0px",
  left: "50%",
  maxWidth: '450px',
  zIndex: 1,
  transform: "tras",
}

const horFlip: React.CSSProperties = {
  transform: "scaleX(-1)"
}

const verFlip: React.CSSProperties = {
  transform: "scaleY(-1)"
}


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
  const [flipV, setFlipV] = useState(false)

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
    setC("error (divide by 0)")
  }

  const flip = () => {
    setFlipV(!flipV)
    setA(upsideDownText(a))
    setB(upsideDownText(b))
    setC(upsideDownText(c))
  }

  function upsideDownText(srcText: string) {
    let out = '';
    for (var i = srcText.length - 1; i >= 0; --i) {
      var ch = srcText.charAt(i);
      if (ch == 'a') {
        out += '\u0250'
      } else if (ch == 'b') {
        out += 'q'
      } else if (ch == 'c') {
        out += '\u0254'
        // etc....
      } else {
        out += ch
      }
    }

    return out;
  }

  return <div style={flipV ? horFlip : {}} >
    <input style={flipV ? verFlip : {}} value={a} onChange={e => setA(e.target.value)} />
    <input style={flipV ? horFlip : {}} value={b} onChange={e => setB(e.target.value)} />
    <button style={flipV ? verFlip : {}} onClick={plus}>+</button>
    <button style={flipV ? horFlip : {}} onClick={minus}>-</button>
    <button style={flipV ? verFlip : {}} onClick={times}>*</button>
    <button style={flipV ? horFlip : {}} onClick={divide}>/</button>
    <button style={flipV ? verFlip : {}} onClick={flip}>flippe:</button>
    <span style={flipV ? horFlip : {}} className={cx(flipV && styles.flipHorizontal)}>Resulte: {c}</span>
  </div>
}

const mirrorComponent = (comp: JSX.Element) => {
  // turn comp upside down css
  <div>

  </div>
}

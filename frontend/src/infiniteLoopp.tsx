import { useEffect, useState } from "react"
import cx from "classnames"
import styles from "./styles.module.scss"
import { getPasswords, PasswordForService, savePassword } from "./api"

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

type RPSChoice = "rock" | "paper" | "scissors"
export const RockPaperScissors = () => {
  // rock paper scissors ai
  const [hardMode, setHardMode] = useState(false)
  const [winText, setWintext] = useState("Play against AI! (Neural Network)")

  const [playerScore, setPlayerScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)

  const randomChoice = () => {
    const choices = ["rock", "paper", "scissors"] as RPSChoice[]
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
  }
  const getWinningChoice = (choice: RPSChoice) => {
    switch (choice) {
      case "rock":
        return "paper"
      case "paper":
        return "scissors"
      case "scissors":
        return "rock"
    }
  }

  const getResult = (playerChoice: RPSChoice, aiChoice: RPSChoice) => {
    if (playerChoice === aiChoice) {
      return 0
    } else if (aiChoice === getWinningChoice(playerChoice)) {
      return -1
    } else {
      return 1
    }
  }

  const play = (choice: RPSChoice) => {
    const aiChoice = hardMode ? getWinningChoice(choice) : randomChoice()

    const result = getResult(choice, aiChoice)

    if (result === 1) {
      setPlayerScore(playerScore + 1)
      setWintext("You win! AI chose " + aiChoice)
    } else if (result === -1) {
      setAiScore(aiScore + 1)
      setWintext("You lose! AI chose " + aiChoice)
    } else {
      setWintext("Tie! AI chose " + aiChoice)
    }
  }

  return <div style={{ "display": "flex", "flexDirection": "column" }}>
    <span>rock paper scissors</span>
    <span>{winText}</span>
    <span>Your score: {playerScore}, AI score: {aiScore}</span>
    <button onClick={() => play("rock")}>rock</button>
    <button onClick={() => play("paper")}>paper</button>
    <button onClick={() => play("scissors")}>scissors</button>
    <button onClick={() => setHardMode(!hardMode)}>toggle hard mode, currently: {hardMode ? "hard" : "easy"}</button>
  </div>
}

export const PasswordManager = () => {
  const [passwords, setPasswords] = useState<PasswordForService[]>([])
  useEffect(() => {
    getPasswords().then(p => setPasswords(p))
  }, [])

  const [newService, setNewService] = useState("")
  const [newLogin, setNewLogin] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const addPassword = () => {
    const newPass = { service: newService, login: newLogin, password: newPassword, id: -1 }
    savePassword(newPass)
    setPasswords([...passwords, newPass])
    setNewService("")
    setNewLogin("")
    setNewPassword("")
  }

  const deletePassword = (id: number) => {
    deletePassword(id)
    setPasswords(passwords.filter(p => p.id !== id))
  }

  return <div>
    <span>password manager</span>
    <input value={newService} onChange={e => setNewService(e.target.value)} placeholder="service" />
    <input value={newLogin} onChange={e => setNewLogin(e.target.value)} placeholder="login" />
    <input value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="password" />
    <button onClick={addPassword}>add password</button>

    <h2>Existing</h2>
    {passwords.map(p => <div key={p.id} style={{ "display": "flex", "flexDirection": "column" }}>
      <span>Service: {p.service}</span>
      <span>Login: {p.login}</span>
      <span>Password: {p.password}</span>
      <button onClick={() => deletePassword(p.id)}>delete</button>
    </div>)}
  </div>
}

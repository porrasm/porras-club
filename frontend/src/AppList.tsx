import { useEffect, useState } from "react"
import { ChatView } from "./Chat"
import { Calculator, InfiniteLoop, PasswordManager, RockPaperScissors } from "./infiniteLoopp"

type SApp = {
  name: string
  redirect?: string
  component?: () => JSX.Element
  action?: () => void
}

const verFlip: React.CSSProperties = {
  transform: "scaleY(-1)"
}

export const AppList = () => {
  const [timeText, setTimeText] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeText(new Date().toLocaleTimeString() + " (in milliseconds: " + new Date().getTime())
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const [apps, setApps] = useState<SApp[]>([
    {
      name: "streaming service (better than discord)",
      redirect: "http://video.porras.club"
    },
    {
      name: "youtube channel",
      redirect: "https://www.youtube.com/@porrasm"
    },
    {
      name: "infinite loop",
      component: () => <InfiniteLoop />
    },
    {
      name: "calculator",
      component: () => <Calculator />
    },
    {
      name: "Rock paper & scissors",
      component: () => <RockPaperScissors />
    },
    {
      name: "password manager",
      component: () => <PasswordManager />
    },
    {
      name: "austria mode (for view in new zeland)",
      action: () => setFlip(!flip)
    }
  ])
  const [currentApp, setCurrentApp] = useState<SApp>()
  const [flip, setFlip] = useState(false)

  const selectApp = (a: string) => {
    const newApp = apps.find(app => a === app.name)
    setCurrentApp(newApp)

    if (newApp?.redirect) {
      location.href = newApp.redirect
    }

    if (newApp?.action) {
      newApp.action()
    }
  }

  return <div style={flip ? verFlip : { "backgroundColor": "green", "height": "100vh", "overflow": "scroll" }}>
    <h2>
      Apps list (click to open), different useful tools. all tools programmed by me. homepage: www.porras.club/club
    </h2>
    <div style={{ "display": "flex", "flexDirection": "column", "backgroundImage": "url(/background.jpg)", "backgroundSize": "100% 100%", "color": "white" }}>
      {"<br\\>"}
      <span>apps list {"(server functionelity); "}</span>
      {"<br\\>"}
      {currentApp?.component ? currentApp.component() : apps.map(a => <div style={{ "display": "flex" }}>Open app <button onClick={() => selectApp(a.name)}>{a.name}</button></div>)}
      {"<br\\>"}
      {currentApp ? <button onClick={() => setCurrentApp(undefined)}>go backk</button> : <span>select app from list above</span>}
      {"<br\\>"}
    </div>
    <h2>Chat</h2>
    <ChatView />
    <h2>Time of day: {timeText}</h2>
    <h2>Site information</h2>
    <a href="https://github.com/porrasm/porras-club">Github</a>
    <h3>Tech</h3>
    <span>React engine (most recent edition)</span><br />
    <span>Node.js (server)</span><br />
    <span>Express (server)</span><br />
    <span>Typescript (frontend)</span><br />
    <span>Javascript (frontend backend)</span><br />
    <span>CI & Automation: (bash script for build)</span><br />
    <span>Version control: (Gitlab)</span><br />
    <span>HTML (frontend)</span><br />
    <span>CSS (frontend)</span><br />
    <span>JSX (frontend)</span><br />
    <span>React (frontend)</span><br />
    <span>React router (frontend)</span><br />
    <span>React hooks (frontend)</span><br />
    <span>React router (frontend)</span><br />
    <span>Data format: (JSON)</span><br />
    <span>OS: Linus</span><br />
    <span>Hosting: Self hosted on rented machnine</span><br />
  </div>
}

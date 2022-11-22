import { useState } from "react"
import { Calculator, InfiniteLoop } from "./infiniteLoopp"

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
  const [apps, setApps] = useState<SApp[]>([
    {
      name: "streaming service (better than discord)",
      redirect: "http://video.porras.club"
    },
    {
      name: "youtube",
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

  return <div style={flip ? verFlip : { "backgroundColor": "green", "height": "100vh" }}>
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
    <h2>Site information</h2>
    <a href="https://github.com/porrasm/porras-club">Github</a>
    <h3>Tech</h3>
    <span>React engine (most recent edition)</span>
    <span>Node.js (server)</span>
    <span>Express (server)</span>
    <span>Typescript (frontend)</span>
    <span>Javascript (frontend backend)</span>
    <span>CI & Automation: (bash script for build)</span>
    <span>Version control: (Gitlab)</span>
    <span>HTML (frontend)</span>
    <span>CSS (frontend)</span>
    <span>JSX (frontend)</span>
    <span>React (frontend)</span>
    <span>React router (frontend)</span>
    <span>React hooks (frontend)</span>
    <span>React router (frontend)</span>
    <span>Data format: (JSON)</span>
    <span>OS: Linus</span>
    <span>Hosting: Self hosted on rented machnine</span>
  </div>
}
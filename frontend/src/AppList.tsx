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

  return <div style={flip ? verFlip : {}}>
    <div style={{ "display": "flex", "flexDirection": "column", "backgroundImage": "url(/background.png)" }}>
      {"<br\\>"}
      <span>apps list {"(server functionelity); "}</span>
      {"<br\\>"}
      {currentApp?.component ? currentApp.component() : apps.map(a => <button onClick={() => selectApp(a.name)}>{a.name}</button>)}
      {"<br\\>"}
      {currentApp ? <button onClick={() => setCurrentApp(undefined)}>go backk</button> : <span>select app from list above</span>}
      {"<br\\>"}
    </div>
  </div>
}
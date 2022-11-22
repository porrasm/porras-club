import { useState } from "react"
import { Calculator, InfiniteLoop } from "./infiniteLoopp"

type SApp = {
  name: string
  redirect?: string
  component?: () => JSX.Element
}

const apps: SApp[] = [
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
  }
]

export const AppList = () => {
  const [currentApp, setCurrentApp] = useState<SApp>()

  const selectApp = (a: string) => {
    const newApp = apps.find(app => a === app.name)
    setCurrentApp(newApp)

    if (newApp?.redirect) {
      location.href = newApp.redirect
    }

  }

  return <div style={{ "display": "flex", "flexDirection": "column" }}>
    {"<br\\>"}
    <span>apps list {"(server functionelity); "}</span>
    {"<br\\>"}
    {currentApp?.component ? currentApp.component() : apps.map(a => <button onClick={() => selectApp(a.name)}>{a.name}</button>)}
    {"<br\\>"}
    {currentApp ? <button onClick={() => setCurrentApp(undefined)}>go backk</button> : <span>select app from list above</span>}
    {"<br\\>"}
  </div>
}
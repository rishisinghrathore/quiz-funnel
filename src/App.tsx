import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import BreezeHomePage from "@/pages/home/page"
import Example1Page from "@/pages/example-1/page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BreezeHomePage />} />
        <Route path="/example-1" element={<Example1Page />} />
        <Route path="*" element={<Navigate to="/example-1" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { render } from 'solid-js/web'
import { Router } from 'solid-app-router'
import './styles/global.css'
import App from './app'

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement,
)

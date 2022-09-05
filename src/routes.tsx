import { lazy } from 'solid-js'
import { Route, Routes } from 'solid-app-router'
import Home from '@pages/home'
import { ROUTE_PROFILE } from '@config/routes'
import ProfileData from '@pages/profile/[idProfile].data'

const PageError404 = lazy(() => import('./errors/404'))
const PageProfile = lazy(() => import('./pages/profile/[idProfile]'))

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={ROUTE_PROFILE} data={ProfileData} element={<PageProfile />} />

      <Route path="**" element={<PageError404 />} />
    </Routes>
  )
}

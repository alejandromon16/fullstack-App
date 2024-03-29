import Cookies from 'js-cookie'
import {browser} from '$app/env'

export const handleSession = async (res) => {
  if (res.status === 440) {
    await logout()
  }
}

export const getCookieItem = async (key) => {
  return await Cookies.get(key)
}

export const logout = async () => {
  await removeCookie('token')
  await removeCookie('user')
  await removeCookie('role')
  if (browser) {
    window.location.replace('/admin/')
  }
}

export const setCookie = async (key, value) => {
  await Cookies.set(key, value, {expires: 2})
}

export const removeCookie = async (key) => {
  if (browser) {
    await Cookies.remove(key)
  }
}

export const authenticate = async (data) => {
  if (browser) {
    await setCookie('token', data.token, {expires: 2, httpOnly: true, sameSite: 'lax'})
    await setCookie('user', data._id, {expires: 2, httpOnly: true, sameSite: 'lax'})
    await setCookie('role', data.role, {expires:2, httpOnly: true, sameSite: 'lax'})
  }
}

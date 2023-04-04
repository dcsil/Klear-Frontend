/* istanbul ignore file */
import { DOMAIN } from "@env"

export const domain = `http://${DOMAIN}` // Domain is either url of website or "IP address of local server":port number

export const headers = (accessToken?: string | null): RequestInit => {
  return {
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  }
}

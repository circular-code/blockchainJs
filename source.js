const stringToUI8A = (string) => new TextEncoder().encode(string)
const bufferToHex = (buffer) => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
const lock = (string, algorithm) => crypto.subtle.digest(algorithm, stringToUI8A(string).buffer)
window.bC = async function ({ type, target: {id: target} }) {
  const key = localStorage.getItem('.bC.HEAD' ) || target
  const block = JSON.stringify({ key, body: {type, target} })
  const digestedKeyHex = bufferToHex(await lock(block, 'SHA-256'))
  sessionStorage.setItem(digestedKeyHex, block)
  localStorage.setItem(key === target ? '.bC.TAIL': key, digestedKeyHex)
  localStorage.setItem('.bC.HEAD', digestedKeyHex)
}

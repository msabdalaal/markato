export const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const emailAlert = () => {
  alert('Please enter a valid email address.')
}
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/gm
export const passwordAlert = () => {
  alert(
    'Password should be Minimum 6 characters, at least one letter and one number'
  )
}

export const userNameRegex = /^[A-z ]{5,}$/
export const userNameAlert = () => {
  alert('username has to be at least 5 characters and contain only letters')
}

export const smallStringRegex = /^[A-Z a-z0-9]{4,25}$/gm

export const smallStringAlert = (field: string) => {
  alert(
    `${field} should contain only alphanumeric characters and have a length between 4 and 20`
  )
}

export const priceRegex = /^\d+(\.\d{1,2})?$/gm

export const priceAlert = () => {
  alert(`price should contain only numbers and onedecimal characters`)
}
export const longStringRegex = /^[A-Z a-z0-9,]{4,50}$/gm

export const longStringAlert = (field: string) => {
  alert(
    `${field} should contain only alphanumeric characters and have a length between 4 and 50`
  )
}
export const smallNumberRegex = /^[0-9]{1,6}$/gm

export const smallNumberAlert = (field: string) => {
  alert(`${field} should contain only digits and have a length between 1 and 6`)
}
export const imageURLRegex =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gm
export const imageURLAlert = () => {
  alert(
    "Image URL should be in the format 'https://example.com/image.(png|jpg|jepg)' "
  )
}

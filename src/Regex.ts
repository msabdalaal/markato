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

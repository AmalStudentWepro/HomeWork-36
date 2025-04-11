const form = document.forms['userInfo']
const inputs = document.querySelectorAll('input')
const required = document.querySelectorAll('.required')

const rules = {
  username: /^[a-zA-Z]+$/,
  age: /^(?:[1-9][0-9]?|100)$/,
  aboutYou: /^[a-zA-Z]+$/,
  emailAddress: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  whatIsJavaScript: /^[a-zA-Z]+$/,
  html: /^[a-zA-Z]+$/,
  css: /^[a-zA-Z]+$/
}

const messages = {
  username: 'Please enter your name',
  age: 'Please enter your age',
  aboutYou: 'Please tell about yourself',
  emailAddress: 'Please enter your email address',
  whatIsJavaScript: 'Please answer what is JavaScript',
  html: 'Please answer what is HTML',
  css: 'Please answer what is CSS'
}

function updateStats() {
  const valid = document.querySelectorAll('.required.passed')
  const invalid = document.querySelectorAll('.required.failed')

  document.getElementById('total').textContent = `All: ${inputs.length}`
  document.getElementById('required').textContent = `Need: ${required.length}`
  document.getElementById('completed').textContent = `Success: ${valid.length}/${required.length}`
  document.getElementById('errors').textContent = `Error: ${invalid.length}/${required.length}`
}

function check(fields) {
  let valid = true

  fields.forEach(input => {
    if (!input.classList.contains('required')) return

    const rule = rules[input.name]
    const value = input.value.trim()
    const hint = input.nextElementSibling

    input.classList.remove('passed', 'failed')

    if (value !== '' && rule && rule.test(value)) {
      input.style.border = ''
      input.previousElementSibling.style.color = ''
      hint.textContent = ''
      input.classList.add('passed')
    } else {
      input.style.border = '2px solid red'
      input.previousElementSibling.style.color = 'red'
      hint.textContent = messages[input.name]
      hint.style.color = 'red'
      input.classList.add('failed')
      valid = false
    }
  })

  updateStats()
  return valid
}

inputs.forEach(input => {
  input.addEventListener('input', () => {
    check([input])
  })
})

form.addEventListener('submit', e => {
  e.preventDefault()
  if (!check(required)) return

  const data = new FormData(form)
  const result = {}

  for (let [key, value] of data.entries()) {
    result[key] = value
  }

  console.log(result)
})

updateStats()
    
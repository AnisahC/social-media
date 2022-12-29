const username = document.getElementById('username')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const form = document.getElementById('form')
const error = document.getElementById('error')
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
const isUpperCase = (string) => /^[A-Z]*$/.test(string)

function containsNumbers(str) {
    return /[0-9]/.test(str);
}

form.addEventListener('submit', (e) => {
    let messages = []
    
    if(username.value.length < 3) {
        messages.push('Username is too short')
    }

    if(!(/^[a-zA-Z]+$/.test(username.value.charAt(0)))) {
        messages.push('Username must begin with a character')
    }

    if(!(specialChars.test(password.value))) {
        messages.push('Password must contain at least one special character')
    }

    if(!(containsNumbers(password.value))) {
        messages.push("Password must contain at least one number")
    }

    var count = 0;

    for(let i=0; i<password.value.length; i++) {
        if((isUpperCase(password.value.charAt(i)))) {
            break
        } else {
           count++
        }
    }

    if(count === password.value.length) {
        messages.push("Password must contain at least one upper case letter")
    }

    if(password.value.length < 8) {
        messages.push('Password is too short')
    }

    if(password.value != password2.value) {
        messages.push("Passwords don't match")
    } 

    if(messages.length > 0) {
        e.preventDefault()
        error.innerText = messages.join(", ")
    }
})
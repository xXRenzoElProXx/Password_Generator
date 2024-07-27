document.getElementById('generateBtn').addEventListener('click', () => {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const password = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    animatePassword(password);
    updateStrength(password);
    toggleCopyButton(password);
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const passwordText = document.getElementById('animatedPassword').textContent;
    if (passwordText.length > 0) {
        const textArea = document.createElement('textarea');
        textArea.value = passwordText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2500,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Contraseña copiada al portapapeles"
        });
    }
});

function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = lowercaseChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}

function animatePassword(password) {
    const animatedPassword = document.getElementById('animatedPassword');
    animatedPassword.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        animatedPassword.textContent += password[i];
        i++;
        if (i >= password.length) {
            clearInterval(interval);
        }
    }, 100);
}

function updateStrength(password) {
    const strengthIndicator = document.getElementById('strength');
    let strength = getStrength(password);

    strengthIndicator.textContent = strength.text;
    strengthIndicator.className = `strength ${strength.className}`;
}

function getStrength(password) {
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (length >= 12 && hasUppercase && hasNumbers && hasSymbols) {
        return { text: 'Fuerte', className: 'strong' };
    } else if (length >= 8 && (hasUppercase || hasNumbers || hasSymbols)) {
        return { text: 'Moderada', className: 'moderate' };
    } else {
        return { text: 'Débil', className: 'weak' };
    }
}

function toggleCopyButton(password) {
    const copyBtn = document.getElementById('copyBtn');
    if (password.length > 0) {
        copyBtn.disabled = false;
    } else {
        copyBtn.disabled = true;
    }
}

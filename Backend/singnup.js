const password = document.getElementById('password');
const strengthBar = document.querySelector('.password-strength-bar');

password.addEventListener('input', () => {
    const strength = calculatePasswordStrength(password.value);
    strengthBar.style.width = `${strength}%`;
    strengthBar.style.background = getStrengthColor(strength);
});

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length > 6) strength += 20;
    if (password.length > 10) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
}

function getStrengthColor(strength) {
    if (strength < 40) return '#ff4444';
    if (strength < 70) return '#ffbb33';
    return '#00C851';
}
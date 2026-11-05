// Same SDK, [DEFAULT] app and persistence ordering as firebase_auth_web.
// Observe only: no custom session cookie, auth storage, sign-in or redirect here.
import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import {initializeAuth, indexedDBLocalPersistence, browserLocalPersistence,
  browserSessionPersistence, onAuthStateChanged}
  from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
import {firebaseConfig} from './v11-auth-config.js';

const lang = document.documentElement.lang;
const labels = {
  en: ['Sign in', 'Create account', 'Open app', 'Profile'],
  fr: ['Se connecter', 'Créer un compte', 'Ouvrir l’application', 'Profil'],
  de: ['Anmelden', 'Konto erstellen', 'App öffnen', 'Profil'],
  es: ['Iniciar sesión', 'Crear cuenta', 'Abrir aplicación', 'Perfil'],
  it: ['Accedi', 'Crea account', 'Apri app', 'Profilo']
}[lang] || ['Sign in', 'Create account', 'Open app', 'Profile'];
const appUrl = '/app/?lang=' + encodeURIComponent(lang);
function render(user) {
  // Match the canonical email-verification gate. This is presentation only;
  // the app and backend remain the authorities for all record access.
  const ready = !!user && (user.emailVerified ||
    !user.providerData.some(p => p.providerId === 'password'));
  const entry = document.querySelector('[data-auth-entry]');
  const account = document.querySelector('[data-auth-account]');
  if (entry) {
    entry.textContent = labels[ready ? 2 : 0];
    entry.href = appUrl + (ready ? '#/dashboard' : '#/sign-in');
  }
  if (account) {
    account.textContent = labels[ready ? 3 : 0];
    account.href = appUrl + (ready ? '#/profile' : '#/sign-in');
  }
}
render(null);
const auth = initializeAuth(initializeApp(firebaseConfig), {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence]
});
onAuthStateChanged(auth, render, () => render(null));
// Recheck persisted authentication after returning to a browser-cached page.
window.addEventListener('pagehide', () => render(null));
window.addEventListener('pageshow', event => {
  if (event.persisted) location.reload();
});

export function saveUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('user'));
  }
  return null;
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem('user');
}
export function validatePassword(password: string | undefined){
  const upperCaseMatch = /[A-Z]/g;
  const numberMatch = /[0-9]/g;

  if(!password || !password.match(upperCaseMatch) || !password.match(numberMatch) || password.length < 8){
    return false;
  }

  return true;
}
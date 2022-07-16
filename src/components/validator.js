const validate = (type, text) => {
  const emailregex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  const passwordregex = /^([a-zA-Z0-9]{4,10}\s*)+$/;
  if (type === 'email') {
    if (emailregex.test(text) === false) {
      return 'Please enter valid Email';
    } else {
      return true;
    }
  } else if (type === 'password') {
    if (text.length > 5 && text.length < 16) {
      return true;
    } else {
      return 'Please enter in between 6 to 16 characters';
    }
  }

  return true;
};

export default validate;

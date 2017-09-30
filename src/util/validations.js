export const isRequired = (val) => val && val.length > 0;

export const lessThan = (val, num) => {
  const lessThan = num;
  if (!(val.length < num)) {
    return {lessThan};
  }
  return false;
};

export const greaterThan = (val, num) => {
  const greaterThan = num;
  if (!(val.length > num)) {
    return {greaterThan};
  }
  return false;
};

export const validateEmail = (value) => {
  // regex for validate-email-address-in-javascript
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};


export const validateFullName = (value) => {
  let name = value.split(' ');
  if(name[1])
    if(name[1].length)
     return true;
  return false;
};

export const formatDatetoDDMMYY=(inputDate) => {
  let date = new Date(inputDate);
  if (!isNaN(date)){
    // Months use 0 index.
    return date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
  }
};

export const getTodaysDate=() => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear()-13; //Minimum Age of 13 years from the current year

  if(dd<10) {
    dd='0'+dd;
  }

  if(mm<10) {
    mm='0'+mm;
  }

  today = yyyy+'-'+mm+'-'+dd;
  return today;
};

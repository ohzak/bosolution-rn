export const reg_email = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

export const reg_password = /^(?=.*[A-Z])(?=.*\W)(?=.*\d)[a-zA-Z0-9\W]{8,}$/;

export const reg_swiss_telephone =
  /^(\+41|0)\s?(\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$/;

export const validate_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

export const validate_email = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;


// 用户名
export function validate_username(value){
    return validate_email.test(value)
  }

  // 密码 
  export function validate_pass(value){
    return validate_password.test(value)
  }
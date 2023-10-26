class Validation {
    static validatePassword(password, conf_pw) {
      // Password regex pattern
      if(password!==conf_pw){
        return false;
      }
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return pattern.test(password);
    }
  
    static validateEmail(email) {
      // Email regex pattern
      const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(email);
    }
}

export default Validation;
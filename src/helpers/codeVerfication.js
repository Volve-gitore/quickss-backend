import model from '../db/models';
const { VerificationCode } = model;

class CodeVerification {
  

  /**
   *
   * @param {object} code
   * @param {Object} res
   * @returns {object} verified code
   */
  static async verifyCode(code) {
  const verifyCode= await VerificationCode.findOne({
        where: { code: code }
      });
          if(verifyCode){
            return verifyCode
          } else {
            return "Code expired";
          }
    }  
  }

export default CodeVerification;


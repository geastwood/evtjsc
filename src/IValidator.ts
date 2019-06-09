export default interface IValidator {
  validate: () => { success: boolean; errorMsg: string };
}

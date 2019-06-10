export default interface ISummary {
  summary: () => { success: boolean; data: string[]; errorMsg: string };
}

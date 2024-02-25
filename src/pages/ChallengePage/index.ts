import { getChallengePageData } from './model/selectors/getChallengePageData';
import type { ChallengePageScheme } from './model/types/ChallengePageScheme';
import { requestChallengeByID } from './model/services/requestChallengeByID';
import { ChallengePageAsync } from './UI/ChallengePage.async';
export {
  ChallengePageAsync,
  requestChallengeByID,
  ChallengePageScheme,
  getChallengePageData,
};

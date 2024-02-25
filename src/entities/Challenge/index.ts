import type { Challenge } from './types/ChallengeScheme';
import { setChallengeIsDone } from './model/services/setChallengeIsDone';
import type { Participant } from 'entities/Challenge/types/ChallengeScheme';
import { getChallengeData } from 'entities/Challenge/model/selectors/getChallengeData';
import { getchallenges } from 'entities/Challenge/model/selectors/getChallengeData';
import { getShowChallenges } from './model/selectors/getChallengeData';
import { getChallengesByUserID } from './model/services/getChellengesByUserID';
import { takePart } from './model/services/takePart';
import { createNewChallenge } from './model/services/createNewChallenge';
import ChallengeCard from './UI/ChallengeCard/ChallengeCard';
import ChallengesList from './UI/ChallengesList/ChallengesList';
import { setChallengeData } from './model/slice/ChallengeSlice';

import {
  setShowChallenges,
  setChallengeTitle,
  setChallengeDescription,
  setChallengeStartDate,
  setChallengeEndDate,
  setChallengeExecutionType,
  setChallengePoints,
} from '../Challenge/model/slice/ChallengeSlice';
export {
  createNewChallenge,
  takePart,
  ChallengeCard,
  getChallengesByUserID,
  setShowChallenges,
  getShowChallenges,
  ChallengesList,
  getchallenges,
  getChallengeData,
  setChallengeTitle,
  setChallengeDescription,
  setChallengeStartDate,
  setChallengeEndDate,
  setChallengeExecutionType,
  setChallengePoints,
  Participant,
  Challenge,
  setChallengeIsDone,
  setChallengeData,
};

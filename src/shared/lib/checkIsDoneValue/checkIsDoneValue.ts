import type {
  Challenge,
  Participant,
  isDoneObject,
} from 'entities/Challenge/types/ChallengeScheme';

export const checkIsDoneValue = (challenge: Challenge, userID: string) => {
  if (!challenge || !userID) {
    return false;
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const formattedToday = new Date(year, month, day);
  const participantIndex = challenge.participants.findIndex(
    (x: Participant) => x.ID === userID,
  );
  if (participantIndex === -1) {
    return false;
  }

  const isDoneArray = challenge.participants[participantIndex].isDoneArray;
  const isDoneIndex = isDoneArray.findIndex(
    (isDoneObj: isDoneObject) =>
      //@ts-ignore
      isDoneObj.date.toDate().toDateString() === formattedToday.toDateString(),
  );
  if (isDoneIndex === -1) {
    return false;
  }
  const isDoneTodayValue = isDoneArray[isDoneIndex]?.isDone || false;
  return isDoneTodayValue;
};

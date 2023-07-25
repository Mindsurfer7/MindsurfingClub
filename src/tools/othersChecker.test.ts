type GroupMember = {
  nickname: string;
  AFK: number;
};

let others: GroupMember[] = [];

let trueFronteders: GroupMember[] = [];

const otherChecker = (group: GroupMember[]) => {
  for (let i = 0; i < group.length; i++) {
    if (group[i].AFK > 3) {
      others.push(group[i]);
    } else {
      trueFronteders.push(group[i]);
    }
  }
};

describe('ossthersChecker', () => {
  test('checking the right result of array', () => {
    type GroupMember = {
      nickname: string;
      AFK: number;
    };

    let group: Array<GroupMember> = [
      { nickname: 'BekzatikMatematik', AFK: 0 },
      { nickname: 'Kerell_Verstalschik', AFK: 0 },
      { nickname: 'Gleb_task_killer', AFK: 0 },
      { nickname: 'ArtemyAmanitaMuscaria', AFK: 0 },
      { nickname: 'AlexMachine', AFK: 0 },
      { nickname: 'JusifSchoolSenior', AFK: 0 },
      { nickname: 'Volodymyr Serhienko', AFK: 15 },
      { nickname: 'Esilia', AFK: 12 },
      { nickname: 'George Pak', AFK: 17 },
      { nickname: 'Shohszahon Karimov', AFK: 4 },
    ];

    let others: GroupMember[] = [];

    let trueFronteders: GroupMember[] = [];

    const otherChecker = (group: GroupMember[]) => {
      for (let i = 0; i < group.length; i++) {
        if (group[i].AFK > 3) {
          others.push(group[i]);
        } else {
          trueFronteders.push(group[i]);
        }
      }
    };

    otherChecker(group);

    expect(others).toEqual([
      { nickname: 'Volodymyr Serhienko', AFK: 15 },
      { nickname: 'Esilia', AFK: 12 },
      { nickname: 'George Pak', AFK: 17 },
      { nickname: 'Shohszahon Karimov', AFK: 4 },
    ]);
    expect(trueFronteders).toEqual([
      { nickname: 'BekzatikMatematik', AFK: 0 },
      { nickname: 'Kerell_Verstalschik', AFK: 0 },
      { nickname: 'Gleb_task_killer', AFK: 0 },
      { nickname: 'ArtemyAmanitaMuscaria', AFK: 0 },
      { nickname: 'AlexMachine', AFK: 0 },
      { nickname: 'JusifSchoolSenior', AFK: 0 },
    ]);
  });

  test('checking if arrays are empty without checker call', () => {
    type GroupMember = {
      nickname: string;
      AFK: number;
    };

    let group: Array<GroupMember> = [
      { nickname: 'BekzatikMatematik', AFK: 0 },
      { nickname: 'Kerell_Verstalschik', AFK: 0 },
      { nickname: 'Gleb_task_killer', AFK: 0 },
      { nickname: 'ArtemyAmanitaMuscaria', AFK: 0 },
      { nickname: 'AlexMachine', AFK: 0 },
      { nickname: 'JusifSchoolSenior', AFK: 0 },
      { nickname: 'Volodymyr Serhienko', AFK: 15 },
      { nickname: 'Esilia', AFK: 12 },
      { nickname: 'George Pak', AFK: 17 },
      { nickname: 'Shohszahon Karimov', AFK: 4 },
    ];

    let others: GroupMember[] = [];

    let trueFronteders: GroupMember[] = [];

    const otherChecker = (group: GroupMember[]) => {
      for (let i = 0; i < group.length; i++) {
        if (group[i].AFK > 3) {
          others.push(group[i]);
        } else {
          trueFronteders.push(group[i]);
        }
      }
    };

    expect(others).toEqual([]);
    expect(trueFronteders).toEqual([]);
  });
});

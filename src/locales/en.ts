import { GameType, ShootResult } from "../const";

const en = {
  ui: {
    altLogo: 'Warship',
    mainHeader: 'Battleship',
    admiral: "Admiral",
    navStart: 'Start game',
    startBattle: 'Start battle',
    newGame: 'New game',
    navOptions: 'Options',
    navLanguage: 'Language',
    russianLanguage: 'Русский',
    englishLanguage: 'English',
    score: 'Score',
  },
  alert: {
    warning: 'Warning',
    areYouSureToContinue: 'Are you sure that you want to continue?',
    restart: 'The restart game will lose current data.',
    changeSetting: 'Changing setting will restart game and current data will lost',
    haveYouFinishedPlacing: 'Have you finished placing your ships?',
    putYourShips: 'You must finish arrangement your ships before starting the battle',
    continue: 'Continue',
    cancel: 'Cancel',
  },
  info: {
    makeSetting: 'Set options and push "Start game" if you ready',
    setFleet: 'Arrange the ships so that they do not touch each other. Double click to rotate the ship. When push "Start battle"',
    killEnemy: 'Good luck!',
    putYourShips: 'You must finish arrangement your ships before starting the battle',
    [ShootResult.Started]: {
      [GameType.Auto]: "'s turn.",
      [GameType.WithAI]: 'Your turn.',
    },
    [ShootResult.Wounded]: {
      [GameType.Auto]: " hit ship!",
      [GameType.WithAI]: "You hit enemy's ship!",
    },
    [ShootResult.Killed]: {
      [GameType.Auto]: " has sunk ship!",
      [GameType.WithAI]: "You has sunk enemy's ship!",
    },
    [ShootResult.Won]: {
      [GameType.Auto]: ' won.',
      [GameType.WithAI]: 'You won!',
    },
    [ShootResult.OffTarget]: {
      [GameType.Auto]: ' missed the target.',
      [GameType.WithAI]: "You missed the target.",
    },
  },
  field: {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
    j: 'j',
    x: 'X',
    point: '●',
  },
  shipsTable: {
    header: 'Available ships',
    unit: 'pcs',
  },
  optionsMenu: {
    fieldType: 'Battle field size',
    '10': '10 x 10 cells',
    '7': '7 x 7 cells',
    '5': '5 x 5 cells',
    '3': '3 x 3 cells',
    enemy: 'Enemy',
    user: 'You',
    ushakov: 'Ushakov',
    jack: 'Jack Sparrow',
    hector: 'Hector Barbossa',
    nahimov: 'Nahimov',
    shipType: 'Ship type',
    line: 'Only line',
    any: 'Any forms',
    player1: 'An admiral of first fleet',
    player2: 'An admiral of second fleet',
    shortNameForjack: 'Jack',
    shortNameForhector: 'Hector',
  },
  log: {
    started: 'started',
    offTarget: 'off target',
    wounded: 'did wound',
    killed: 'did kill',
    won: 'won',
    user: 'You',
    enemy: 'Enemy',
    n: 'N',
    player: 'Player',
    shoot: 'Shoot',
    result: 'Result',
  },
};

export default en;

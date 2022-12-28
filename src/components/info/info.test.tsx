import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Info from './info';
import english from '../../locales/en';
import { GameType, NameSpace, PlayerType, ShootResult } from '../../const';
import { NotShootResultInfokey } from '../../types';
import { OptionsMenuKey } from '../../locales/types';


const mockStore = configureMockStore();
const gameOptions: { players: { id: OptionsMenuKey, name: string, type: PlayerType }[]} = { players: [
  {id: 'user', name: 'user', type: PlayerType.Human},
  {id: 'ushakov', name: 'Ushakov', type: PlayerType.Robot},
]};

const renderInfo = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Info />
    </Provider>,
  );
};

const notShootTestData: NotShootResultInfokey[] = ['makeSetting', 'setFleet', 'killEnemy', 'putYourShips'];
const shootResults: ShootResult[] = [
  ShootResult.Killed,
  ShootResult.OffTarget,
  ShootResult.Started,
  ShootResult.Won,
  ShootResult.Wounded,
];

describe('Info', () => {
  describe('should show right not shootresult message', () => {
    it.each(notShootTestData)('%s', (message) => {
      const store = mockStore({
        [NameSpace.GameOptions]: gameOptions,
        [NameSpace.Billboard]: { message, player: null},
        [NameSpace.GameType]: GameType.WithAI,
      });

      renderInfo(store);

      expect(screen.getByText(english.info[message])).toBeInTheDocument();
    });
  });

  describe('should show shootresult messages from "human-robot" game', () => {
    const gameWithAIForActiveUser = shootResults.map((el) => {
      const activePlayer = 0;
      let text = english.info[el][GameType.WithAI];
      if (el === ShootResult.Killed || el === ShootResult.Wounded) {
        text = `${text} ${english.info.started[GameType.WithAI]}`;
      }
      if (el === ShootResult.OffTarget) {
        const enemyId = gameOptions.players[1].id;
        const enemyName = english.optionsMenu[enemyId];
        text = `${text} ${enemyName}${english.info.started[GameType.Auto]}`;
      }
      return [activePlayer, el, text];
    });

    const gameWithAIForActiveEnemy = shootResults.map((el) => {
      const activePlayer = 1;
      const enemyId = gameOptions.players[1].id;
      const enemyName = english.optionsMenu[enemyId];
      let text = `${enemyName}${english.info[el][GameType.Auto]}`;
      if (el === ShootResult.Killed || el === ShootResult.Wounded) {
        text = `${text} ${enemyName}${english.info.started[GameType.Auto]}`;
      }
      if (el === ShootResult.OffTarget) {
        text = `${text} ${english.info.started[GameType.WithAI]}`;
      }
      return [activePlayer, el, text];
    });

    const testData = [...gameWithAIForActiveUser, ...gameWithAIForActiveEnemy];

    it.each(testData)("0 - user, 1 - enemy: %s, %s", (activePlayer, message, text) => {
      const store = mockStore({
        [NameSpace.GameOptions]: gameOptions,
        [NameSpace.Billboard]: { message, player: activePlayer},
        [NameSpace.GameType]: GameType.WithAI,
      });
      renderInfo(store);

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  describe('should show shootresult messages from "robot-robot" game', () => {
    const gameOptions1: { players: { id: OptionsMenuKey, name: string, type: PlayerType }[]} = { players: [
      {id: 'nahimov', name: 'Nahimov', type: PlayerType.Robot},
      {id: 'ushakov', name: 'Ushakov', type: PlayerType.Robot},
    ]};

    const gameAutoData = shootResults.map((el) => {
      const activePlayer = 1;
      const activePlayerId = gameOptions1.players[activePlayer].id;
      const activePlayerName = english.optionsMenu[activePlayerId];
      const enemyId = gameOptions1.players[activePlayer === 1 ? 0 : 1].id;
      const enemyName = english.optionsMenu[enemyId];
      let text = `${activePlayerName}${english.info[el][GameType.Auto]}`;
      if (el === ShootResult.Killed || el === ShootResult.Wounded) {
        text = `${text} ${activePlayerName}${english.info.started[GameType.Auto]}`;
      }
      if (el === ShootResult.OffTarget) {
        text = `${text} ${enemyName}${english.info.started[GameType.Auto]}`;
      }
      return [el, activePlayer, text];
    });

    it.each(gameAutoData)('%s', (message, activePlayer, text) => {
      const store = mockStore({
        [NameSpace.GameOptions]: gameOptions1,
        [NameSpace.Billboard]: { message, player: activePlayer},
        [NameSpace.GameType]: GameType.Auto,
      });

      renderInfo(store);

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  })
});

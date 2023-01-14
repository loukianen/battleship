import { Dispatch, ActionFromReducer } from '@reduxjs/toolkit';
import {DALAY_BEFORE_RENDER_ROBOT_ACTION, GameType, ShipShape, ShootResult } from "../const";
import game from "../game/game/game";
import { addNewRecord } from '../store/log-process/log-process';
import { FieldType, Record } from "../types";

type AddNewRecordAction = typeof addNewRecord;

const adoptCoords = (record: Record): Record => {
  const coords = record[1];
  if (coords) {
    const x = coords.x + 1;
    const y = coords.y + 1;
    return [record[0], {x, y}, record[2]];
  }
  return record;
};

const getPlayers = () => game.getAvailablePlayers();

const startGame = (
  players: string[],
  gameType: GameType,
  fieldType: FieldType,
  dispatch: Dispatch<ActionFromReducer<AddNewRecordAction>>,
  shipShapeType?: ShipShape,
) => {
  const shoot = (record: Record) => {
    dispatch(addNewRecord(adoptCoords(record)));
    if (record[2] !== ShootResult.Won) {
      setTimeout(() => {
        const nextRecord = game.nextRobotTurn() as Record;
        shoot(nextRecord);
      }, DALAY_BEFORE_RENDER_ROBOT_ACTION);
    }
  };

  const startMapping = {
    [GameType.Auto]: () => {
      const newRecord = game.startNewGame({ players, fieldType, shipShapeType}) as Record;
      shoot(newRecord);
    },
    [GameType.WithAI]: () => console.log('Game with user'),
  };

  startMapping[gameType]();
};

const connector = { getPlayers, startGame };

export default connector;

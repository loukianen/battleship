import { Dispatch, ActionFromReducer } from '@reduxjs/toolkit';
import {DALAY_BEFORE_RENDER_ROBOT_ACTION, GameState, ShipShape, ShootResult } from "../const";
import game from "../game/game/game";
import { addNewRecord } from '../store/log-process/log-process';
import { setGameState } from '../store/game-state-process/game-state-process';
import { Coords, Field, FieldType, Record } from "../types";

type AddNewRecordAction = typeof addNewRecord;

const adoptCoordsToGame = (coords: Coords) => {
  const x = coords.x - 1;
  const y = coords.y - 1;
  return { x, y };
};

const adoptCoordsToUI = (record: Record): Record => {
  const coords = record[1];
  if (coords) {
    const x = coords.x + 1;
    const y = coords.y + 1;
    return [record[0], {x, y}, record[2]];
  }
  return record;
};

const getPlayers = () => game.getAvailablePlayers();

const shoot = (dispatch: Dispatch<ActionFromReducer<AddNewRecordAction>>, coords?: Coords) => {
  const handleRobotShoot = (robotShootingRecord: Record) => {
    dispatch(addNewRecord(adoptCoordsToUI(robotShootingRecord)));
    if (robotShootingRecord[2] !== ShootResult.OffTarget && robotShootingRecord[2] !== ShootResult.Won) {
      const nextRobotShootingRecord = game.nextRobotTurn() as Record;
      setTimeout(() => handleRobotShoot(nextRobotShootingRecord), DALAY_BEFORE_RENDER_ROBOT_ACTION);
    }
  };

  const doRobotShoot = () => {
    const robotShootingRecord = game.nextRobotTurn() as Record;
    handleRobotShoot(robotShootingRecord);
  }

  if (coords) {
    const userShootingRecord = game.nextHumanTurn(adoptCoordsToGame(coords)) as Record;
    dispatch(addNewRecord(adoptCoordsToUI(userShootingRecord)));
    if (userShootingRecord[2] === ShootResult.OffTarget) {
      doRobotShoot();
    }
  } else {
    doRobotShoot();
  }
};

const startBattle = (field: Field, dispatch: Dispatch<ActionFromReducer<AddNewRecordAction>>) => {
  const record = game.startBattle(field) as Record;
  dispatch(setGameState(GameState.Battle));
  dispatch(addNewRecord(record));
  if (record[0] === 1) {
    shoot(dispatch);
  }
};

const startRobotsGame = (
  players: string[],
  fieldType: FieldType,
  dispatch: Dispatch<ActionFromReducer<AddNewRecordAction>>,
  shipShapeType?: ShipShape,
) => {
  const shoot = (record: Record) => {
    dispatch(setGameState(GameState.Battle));
    dispatch(addNewRecord(adoptCoordsToUI(record)));
    if (record[2] !== ShootResult.Won) {
      setTimeout(() => {
        const nextRecord = game.nextRobotTurn() as Record;
        shoot(nextRecord);
      }, DALAY_BEFORE_RENDER_ROBOT_ACTION);
    }
  };

  const newRecord = game.startNewGame({ players, fieldType, shipShapeType}) as Record;
  shoot(newRecord);
};

const startUserGame = (
  players: string[],
  fieldType: FieldType,
  dispatch: Dispatch<ActionFromReducer<AddNewRecordAction>>,
  shipShapeType?: ShipShape,
) => {
  dispatch(setGameState(GameState.SettingFleet));
  game.startNewGame({ players, fieldType, shipShapeType});
};

const connector = { getPlayers, shoot, startBattle, startRobotsGame, startUserGame };

export default connector;

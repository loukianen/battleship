import './battlefield.sass';
import flatten from 'lodash-ts/flatten';
import isEqual from 'lodash-ts/isEqual';
import {DragEventHandler, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { changeFields } from '../../store/fields-process/fields-process';
import { getLocalizedUsername } from '../../services/utils';
import { getFleet } from '../../store/fleet-process/selectors';
import { getGameState } from '../../store/game-state-process/selectors';
import { getGameType } from '../../store/game-type-process/selectors';
import { getShipInMove } from '../../store/ship-in-move-process/selectors';
import { moveShip } from '../../store/ship-in-move-process/ship-in-move-process';
import { placeShipOnBattlefield } from '../../store/fleet-process/fleet-process';
import { returnShipIntoDock } from '../../store/dock-process/dock-process';
import { calcArea, isValidCoords } from '../../services/utils';
import { Cell, Coords, FieldChangeDataType, Player } from '../../types';
import { BattlefieldType, CellType, FieldName, GameState, GameType } from '../../const';

type DifferenceWithType<T> = (arr: Array<T>, gauge: Array<T>, compareFunction: (a: T, b: T) => boolean ) => Array<T>;

const differenceWith: DifferenceWithType<Coords> = (arr, gauge, compareFunction) => arr
  .filter((item) => !gauge.some((el) => compareFunction(item, el)));

const isPutingPosible = (area: Coords[], ship: Coords[], field: Cell[][]) => {
  const maxCoords = field.length - 1;
  if (!isValidCoords(ship, 1, maxCoords)) {
    return false;
  }
  const coords = [...area.filter((item) => isValidCoords(item, 1, maxCoords)), ...ship];
  for (const cell of coords) {
    const { x, y } = cell;
    const style = field[y][x].type;
    if (style === CellType.SW || style === CellType.AW) {
      return false;
    }
  }
  return true;
};

const Battlefield = (props: {owner: Player, fieldType: BattlefieldType, mark?: string, field: Cell[][]}) => {
  const { owner, mark, field, fieldType } = props;
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const fleet = useAppSelector(getFleet);
  const gameState = useAppSelector(getGameState);
  const gameType = useAppSelector(getGameType);
  const shipInMove = useAppSelector(getShipInMove);

  const markText = mark ? ` ${mark}` : '';
  const ownerName = `${t('ui.admiral')}: ${getLocalizedUsername(owner, i18n)}${markText}`;
  const fieldSize = field.length - 1;

  const makeDataForChange = (data: Coords[], styleRight: CellType, styleWrong: CellType)  => {
    // for every cell { coords, options: [['style', new style], ['value', new value]] }
    const maxCoordValue = field.length - 1;
    return data.reduce((acc, coords) => {
      if (isValidCoords(coords, 1, maxCoordValue)) {
        const { x, y } = coords;
        const style = field[y][x].shipId === null ? styleRight : styleWrong;
        acc.push({ coords, options: { type: style }});
      }
      return acc;
    }, [] as FieldChangeDataType);
  };

  const makeDataForClean = (data: Coords[]) => data.map((coords) => {
    const { x, y } = coords;
    return field[y][x].shipId === null
      ? { coords, options: { type: field[y][x].defaultType } }
      : { coords, options: { type: CellType.Ship } };
  });

  const handleDragEnd = (e:SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.type, 'dragEnd work');
    if (shipInMove) {
      dispatch(returnShipIntoDock(shipInMove));
    }
  };

  const handleDragStart = (shipId: number | null) : DragEventHandler<HTMLElement> => (e) => {
    let ship;
    if (shipId !== null) {
      ship = fleet[shipId];
    }
    if (ship) {
      dispatch(moveShip(ship));
    }
  };

  const handleDragEnter = (mainPoint: Coords) => (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (shipInMove) {
      shipInMove.setCoords(mainPoint);
      const shipCoords = shipInMove.getCoords();
      const shipArea = calcArea(shipCoords);
      const shipCoordsData = makeDataForChange(shipCoords, CellType.Ship, CellType.SW);
      const areaCoordsData = makeDataForChange(shipArea, CellType.Area, CellType.AW);
      dispatch(changeFields({ [FieldName.First]: [...shipCoordsData, ...areaCoordsData] }));
    }
  };

  const handleDragLeave = (mainPoint: Coords) => (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (shipInMove) {
      const shipCoords = shipInMove.getCoords();
      const curCoords = [...shipCoords, ...calcArea(shipCoords)];
      const oldShipCoords = shipInMove.calcCoords(mainPoint);
      const oldAreaCoords = calcArea(oldShipCoords);
      const oldCoords = [...oldShipCoords, ...oldAreaCoords];
      const maxCoordValue = field.length - 1;

      const coordsForCleaning: Coords[] = isEqual(curCoords, oldCoords)
        ? curCoords
        : differenceWith(oldCoords, curCoords, isEqual);

      const validCoordsForCleaning = coordsForCleaning.filter((coords) => isValidCoords(coords, 1, maxCoordValue));

      dispatch(changeFields({ [FieldName.First]: makeDataForClean(validCoordsForCleaning) }));
    }
  }

  const handleDrop = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (shipInMove !== null) {
      const maxCoordValue = field.length - 1;
      const shipCoords = shipInMove.getCoords();
      const areaCoords = calcArea(shipCoords);
      const validCoordsForCleaning = [...shipCoords, ...areaCoords].filter((coords) => isValidCoords(coords, 1, maxCoordValue));
      dispatch(changeFields({ [FieldName.First]: makeDataForClean(validCoordsForCleaning) }));
      if (isPutingPosible(areaCoords, shipCoords, field)) {
        dispatch(placeShipOnBattlefield(shipInMove));
      } else {
        dispatch(returnShipIntoDock(shipInMove));
      }
    }
  };

  const handleDragOver = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = (coords: Coords) => (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Click ', coords);
  };

  const renderClickableCell = (id: number, coords: Coords, className: string, text: string | number | null) => (
    <div
      key={id}
      className={`${className} d-flex justify-content-center align-items-center`}
      onClick={handleClick(coords)}
    >{text}</div>
  );

  const renderDraggableCell = (cell: Cell, className: string, text: string | number | null) => {
    const { id, coords, type, shipId } = cell;
    return (
      <div
      key={id}
      className={`${className} d-flex justify-content-center align-items-center`}
      onDragLeave={handleDragLeave(coords)}
      onDragEnter={handleDragEnter(coords)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      draggable={type === CellType.Ship}
      onDragStart={handleDragStart(shipId)}
      onDragEnd={handleDragEnd}
      >{text}</div>
    );
  };

    const renderUsualCell = (id: number, className: string, text: string | number | null) => (
      <div key={id} className={`${className} d-flex justify-content-center align-items-center`}>{text}</div>
      );
    
    const renderCell = (cell: Cell) => {
      const { id, coords, type, value } = cell;
      const cellClassName = `field-container_field_cell field-container_field_cell__${type}`;
    const text = value && typeof value !== 'number' ? t(`field.${value}`) : value;
    if (fieldType === BattlefieldType.PlayerField && gameState === GameState.SettingFleet) {
      return renderDraggableCell(cell, cellClassName, text);
    }
    if (fieldType === BattlefieldType.EnemyField && gameType === GameType.WithAI && gameState === GameState.Battle) {
      return renderClickableCell(id, coords, cellClassName, text);
    }
    return renderUsualCell(id, cellClassName, text);
  };

  return(
    <div className="field-container">
      <div className="text-center field-container_battlefield h4" id={`${owner.id}-fleet`}>{ownerName}</div>
      <div className={`col field-container_field rounded mb-3 field-container_grid__${fieldSize}`} id={'fieldId'}>
        {flatten(field).map((cell) => renderCell(cell))}
      </div>
    </div>
  );
};

export default Battlefield;

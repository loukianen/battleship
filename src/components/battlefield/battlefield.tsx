import './battlefield.sass';
import flatten from 'lodash-ts/flatten';
import isEqual from 'lodash-ts/isEqual';
import { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { changeFields } from '../../store/fields-process/fields-process';
import { getLocalizedUsername } from '../../services/utils';
import { getGameState } from '../../store/game-state-process/selectors';
import { getShipInMove } from '../../store/ship-in-move-process/selectors';
import { placeShipOnBattlefield } from '../../store/fleet-process/fleet-process';
import { returnShipIntoDock } from '../../store/dock-process/dock-process';
import { calcArea, isValidCoords } from '../../services/utils';
import { Cell, Coords, FieldChangeDataType, Player } from '../../types';
import { FieldTextKey } from '../../locales/types';
import { BattlefieldType, CellType, FieldName, GameState } from '../../const';

type DifferenceWithType<T> = (arr: Array<T>, gauge: Array<T>, compareFunction: (a: T, b: T) => boolean ) => Array<T>;

const differenceWith: DifferenceWithType<Coords> = (arr, gauge, compareFunction) => arr
  .filter((item) => !gauge.some((el) => compareFunction(item, el)));

const isPutingPosible = (area: Coords[], ship: Coords[], field: Cell[][]) => {
  const coords = [...area, ...ship].filter((item) => isValidCoords(item, 1, field.length - 1));
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
  const gameState = useAppSelector(getGameState);
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

  // const handleClick = (coords) => (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { shoot, dispatch, game } = this.props;
  //   const records = game.handleUserShoot(coords);
  //   dispatch(shoot({ records, newGame: game }));
  // };

  const renderUsualCell = (id: string, className: string, text: string | number) => (
    <div key={id} className={`${className} d-flex justify-content-center align-items-center`}>{text}</div>
    );

  const renderDroppingCell = (id: string, coords: Coords, className: string, text: string | number) => {
    if (gameState !== GameState.SettingFleet) {
      return renderUsualCell(id, className, text);
    }
    return (
      <div
        key={id}
        className={`${className} d-flex justify-content-center align-items-center`}
        onDragLeave={handleDragLeave(coords)}
        onDragEnter={handleDragEnter(coords)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >{text}</div>
    );
  };

  const renderCell = (id: string, coords: Coords, type: string, cellValue: FieldTextKey | number) => {
    const cellClassName = `field-container_field_cell field-container_field_cell__${type}`;
    const text = cellValue && typeof cellValue !== 'number' ? t(`field.${cellValue}`) : cellValue;
    if (fieldType === BattlefieldType.EnemyField) {
      return renderUsualCell(id, cellClassName, text);
    }
    return renderDroppingCell(id, coords, cellClassName, text);
  };

  return(
    <div className="field-container">
      <div className="text-center field-container_battlefield h4" id={`${owner.id}-fleet`}>{ownerName}</div>
      <div className={`col field-container_field rounded mb-3 field-container_grid__${fieldSize}`} id={'fieldId'}>
        {flatten(field).map(({id, coords, type, value}) => renderCell(id, coords, type, value))}
      </div>
    </div>
  );
};

export default Battlefield;

//  <div className="text-center color-ship-border h3" id={flotId}>{i18next.t(`ui.${flotId}`)}</div>
//       <div className={`col field rounded mb-3 grid-${fieldSize}`} id={fieldId}>
//         {_.flatten(field.map((line, lineIndex) => {
//           return line.map((cell, cellIndex) => {
//             const { value } = cell;
//             const cellValue = typeof value ==='string' ? i18next.t(`field.${value}`) : value;
//             if (lineIndex === 0 || cellIndex === 0) {
//               return this.renderHeaderCell(cell, cellValue);
//             }
//             return owner === 'user'
//               ? this.renderUserFieldCell(cell, cellValue)
//               : this.renderEnemyFieldCell(cell, cellValue);
//           });
//         }))}
//       </div>

/*
renderHeaderCell(cell, cellValue) {
    const { id, style } = cell;
    return (
      <div key={id} className={`${style} d-flex justify-content-center align-items-center`}>
        <div>{cellValue}</div>
      </div>
    );
  }

  renderEnemyFieldCell(cell, cellValue) {
    const { activePlayer, gameState } = this.props;
    const { id, style, coords } = cell;
    const handler = activePlayer === 'user'
      && gameState === 'battleIsOn' && style !== 'killed-ship'
      ? this.handleClick(coords) : null;
    return (<div key={id} className={`${style} d-flex justify-content-center align-items-center`} onClick={handler}>{cellValue}</div>);
  }

  renderUserFieldCell(cell, cellValue) {
    const { id, style, coords } = cell;
    return (
      <div
        key={id}
        className={`${style} d-flex justify-content-center align-items-center`}
        onDragLeave={this.handlerDragLeave(coords)}
        onDragEnter={this.handlerDragEnter(coords)}
        onDrop={this.handlerDrop(coords)}
        onDragOver={this.handlerDragOver}
      >
        {cellValue}
      </div>);
  }
  */
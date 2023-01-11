import './dock.sass';
import { useState, MouseEvent, DragEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getDock } from '../../store/dock-process/selectors';
import { getGameState } from '../../store/game-state-process/selectors';
import { getShipInMove } from '../../store/ship-in-move-process/selectors';
import { returnShipIntoDock } from '../../store/dock-process/dock-process';
import { takeShipOutOfDock } from '../../store/ship-in-move-process/ship-in-move-process';
import { GameState, ShipClass, shipMainClasses, ShipOrientation } from '../../const';
import { ShipInterface } from '../../types';

export const initDocOrientationState = shipMainClasses
  .reduce((acc: { [p: string]: ShipOrientation }, shipClass) => {
    acc[shipClass] = ShipOrientation.East;
    return acc;
  }, {});

const getDockStyle = (isDockEmpty: boolean, prefix: string) => {
  const classNames = isDockEmpty
    ? 'dock_cell30x30 dock_cell30x30__empty-dock rounded'
    : 'dock_cell30x30 dock_cell30x30__ship rounded';
  return <div key={`${prefix}-s`} className={classNames}></div>;
};

const Dock = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [docksOrientation, setDockOrientation] = useState(initDocOrientationState);
  const dock = useAppSelector(getDock);
  const shipInMove: ShipInterface | null = useAppSelector(getShipInMove);
  const gameState = useAppSelector(getGameState);

  const handleDoubleClick = (className: ShipClass) => (e: MouseEvent) => {
    e.stopPropagation();
    const orientation = docksOrientation[className] === ShipOrientation.East ? ShipOrientation.North : ShipOrientation.East;
    setDockOrientation({...initDocOrientationState, [className]: orientation});
  };

  const handleDragEnd = () => {
    if (shipInMove) {
      dispatch(returnShipIntoDock(shipInMove));
    }
  };

  const handleDragStart = (className: ShipClass) : DragEventHandler<HTMLElement> => (e) => {
    const ship = dock[className][0];
    ship.setOrientation(docksOrientation[className]);
    if (ship) {
      dispatch(takeShipOutOfDock(ship));
    }
  };

  const renderDock = () => shipMainClasses.map((className, index) => {
    const amountOfShips = dock[className].length;
    const isDockEmpty = amountOfShips === 0;
    const dockClasses = docksOrientation[className] === ShipOrientation.East
    ? 'd-flex flex-row'
    : 'd-flex flex-column';
    const dockDesign = shipMainClasses.slice(index).map((className) => getDockStyle(isDockEmpty, className));
    return (<tr key={className}>
      <td key={`${className}-i`}>
        <div
            className={dockClasses}
            onDoubleClick={handleDoubleClick(className)}
            draggable={gameState === GameState.SettingFleet && amountOfShips > 0}
            onDragStart={handleDragStart(className)}
            onDragEnd={handleDragEnd}
          >
            {dockDesign}
        </div>
      </td>
      <td key={`${className}-a`}>{amountOfShips}</td>
      <td  key={`${className}-u`}>{t('shipsTable.unit')}</td>
    </tr>);
  });

  return (
    <div className="d-flex flex-column dock_shipsfield justify-content-center text-center rounded" data-testid="dock">
        <h5 className="mt-2">{t('shipsTable.header')}</h5>
        <table className="table table-borderless color-ship-border">
          <tbody>
            {renderDock()}
          </tbody>
        </table>
    </div>
  );
};

export default Dock;

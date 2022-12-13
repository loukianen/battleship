import './battlefield.sass';
import flatten from 'lodash-ts/flatten';
import { useTranslation } from 'react-i18next';
import { getLocalizedUsername } from '../../services/utils';
import { PlayerDataType } from '../../types';

const Battlefield = (props: {owner: PlayerDataType, mark?: string}) => {
  const { t, i18n } = useTranslation();
  const { owner, mark } = props;
  const markText = mark ? ` ${mark}` : '';
  const ownerName = `${t('ui.admiral')} ${getLocalizedUsername(owner, i18n)}${markText}`;

  const renderEnemyFieldCell = (id: string, cellValue: string) => (
    <div key={id} className={`d-flex justify-content-center align-items-center`}>{cellValue}</div>
  );

  return(
    <div className="field-container">
      <div className="text-center battlefield h3" id={`${owner.id}-fleet`}>{ownerName}</div>
      <div className={`col field rounded mb-3 grid-${10}`} id={'fieldId'}>
        {flatten(Array.from(Array(11), () => Array(11).fill('.')).map((row, y) => row
          .map((el, x) => renderEnemyFieldCell(`${x}${y}`, el))))}
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
import './battlefield.sass';
import flatten from 'lodash-ts/flatten';
import { useTranslation } from 'react-i18next';
import { getLocalizedUsername } from '../../services/utils';
import { Cell, Player } from '../../types';
import { FieldTextKey } from '../../locales/types';
import { BattlefieldType } from '../../const';

const Battlefield = (props: {owner: Player, type: BattlefieldType, mark?: string, field: Cell[][]}) => {
  const { t, i18n } = useTranslation();
  const { owner, mark, field } = props;
  const markText = mark ? ` ${mark}` : '';
  const ownerName = `${t('ui.admiral')}: ${getLocalizedUsername(owner, i18n)}${markText}`;
  const fieldSize = field.length - 1;

  const renderCell = (id: string, type: string, cellValue: FieldTextKey | number) => {
    const cellClassName = `field-container_field_cell field-container_field_cell__${type}`;
    const text = cellValue && typeof cellValue !== 'number' ? t(`field.${cellValue}`) : cellValue;
    return (<div key={id} className={`${cellClassName} d-flex justify-content-center align-items-center`}>{text}</div>);
  };

  return(
    <div className="field-container">
      <div className="text-center field-container_battlefield h4" id={`${owner.id}-fleet`}>{ownerName}</div>
      <div className={`col field-container_field rounded mb-3 field-container_grid__${fieldSize}`} id={'fieldId'}>
        {flatten(field).map(({id, type, value}) => renderCell(id, type, value))}
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
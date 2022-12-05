import { useTranslation } from 'react-i18next';
import { getLocalizedUsername } from '../../services/utils';
import { PlayerDataType } from '../../types';

const Battlefield = (props: {owner: PlayerDataType, mark?: string}) => {
  const { t, i18n } = useTranslation();
  const { owner, mark } = props;
  const markText = mark ? ` ${mark}` : '';
  const ownerName = `${t('ui.admiral')} ${getLocalizedUsername(owner, i18n)}${markText}`;

  return(
    <div className="text-center color-ship-border h3" id={`${owner.id}-fleet`}>
      {ownerName}
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
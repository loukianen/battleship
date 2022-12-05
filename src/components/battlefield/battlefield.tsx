const Battlefield = (props: {[i: string]: string}) => {
  const { owner } = props;
  return(
    <div className="field-container">
      {owner}
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
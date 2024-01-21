module.exports.addLogs = (fields, stack, data) => {
    const FIELDS_TO_AGGREGATE = fields
    const DATE_TEXT_FORMAT = new Intl.DateTimeFormat('en-GB', {
      weekday: 'short', 
      day: 'numeric',
      month: 'short', 
    });
    const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
      weekday: 'narrow', 
    })
    
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    
      // Data will be added column by column
      const mainStack = stack.addStack();
      mainStack.layoutHorizontally();
      // Field label column
      addColumnToStack(mainStack, [{ value: '' }]
        .concat(FIELDS_TO_AGGREGATE
          .map(field => ({
            value: field.label, 
            color: field.color, 
          }))));
      mainStack.addSpacer(5);
      // Use to keep track of how many days each field was completed
      const fieldCompletionCounts = {};
      FIELDS_TO_AGGREGATE.forEach(field => fieldCompletionCounts[field.label] = 0);
      // Collect data to format one column for each day's data
      const dataByDay = data.fields.reverse();
      let date = parseDateFromKey(data.dateKey);
      date = date.addDays(-1 * (dataByDay.length - 1));
      // One column per day
      dataByDay.forEach(dayData => {
        const columnData = [];
        columnData.push({
          value: `${SHORT_DATE_FORMAT.format(date)}`,
          isBold: true,
          align: 'center',
        });
        
        FIELDS_TO_AGGREGATE.forEach(field => {
          const fieldFromDay = dayData.find(d => d.label === field.label);
          if (fieldFromDay) {
            columnData.push({ value: fieldFromDay.value ? '✅' : '❌' });
            fieldCompletionCounts[fieldFromDay.label] += fieldFromDay.value ? 1 : 0;
          } else {
            columnData.push({ value: '?'});
          }
        });
        
        addColumnToStack(mainStack, columnData);
        mainStack.addSpacer(2);
        date = date.addDays(1);
      });
      
      mainStack.addSpacer(5);
     const completionData = [{ value: ' '}];
      FIELDS_TO_AGGREGATE.forEach(field => {
        const completionCount = fieldCompletionCounts[field.label];
        let completionRate = (completionCount * 100 / data.fields.length).toFixed(0);
        if (completionRate.length === 1) {
          completionRate = '  ' + completionRate;
        } else if (completionRate.length === 2) {
          completionRate = ' ' + completionRate;
        }
        completionData.push({
          value: `[${completionRate}%]`, 
          align: 'right',
          color: completionCount === data.fields.length ? '#66ff00' : '#ffffff',
        });
      });
      addColumnToStack(mainStack, completionData);
      return mainStack;
    }
    function addColumnToStack(stack, columnData) {
      const column = stack.addStack();
      column.layoutVertically();
      column.spacing = 5;
      columnData.forEach(cd => addCellToColumn(column, cd));
    }
    function addCellToColumn(column, data) {
      const cell = column.addStack();
      cell.layoutVertically();
      addTextToStack(cell, data);
    }
    function addTextToStack(stack, data) {
      console.log(`addTextToStack, data: ${JSON.stringify(data)}`);
      const { value, color, isBold, align } = data;
      const textLine = stack.addText(value);
      textLine.font = new Font(`Menlo${isBold ? '-Bold' : ''}`, 10);
      if (color) {
        textLine.textColor = new Color(color);
      }
      if (align === 'center') {
        textLine.centerAlignText();
      } else if (align === 'right') {
        textLine.rightAlignText();
      } else {
        textLine.leftAlignText();
      }
    }
    
    function parseDateFromKey(dateKey) {
      const dateParts = dateKey.split('_');
      return new Date(
        parseInt(dateParts[0]), // year
        parseInt(dateParts[1]), // month (0-indexed)
        parseInt(dateParts[2]), // day of month
      );
    }
    
// module.exports.fetchData = async (FIELDS, CACHE) => {
//     let date = new Date();
//     if (date.getHours() < 5) {
//       date = date.addDays(-1);
//     }
//     const dateText = DATE_TEXT_FORMAT.format(date);
//     const dateKey = `${padNumber(date.getDate())}_${padNumber(date.getMonth())}_${date.getFullYear()}`;
//     const fields = [];
//     for (let i = 0; i < 5; i++) {
//       const dateCacheKey = `${padNumber(date.getDate())}_${padNumber(date.getMonth())}_${date.getFullYear()}`;
//       let dayData = await CACHE.read(dateCacheKey);
//       if (!dayData) {
//         if (i === 0) {
//           console.log(`Cache miss for key=${dateCacheKey}, creating new log entry...`);
//           dayData = initializeFields(FIELDS);
//           CACHE.write(dateCacheKey, dayData);
//         } else {
//           console.log(`Cache miss for key=${dateCacheKey}, breaking out of loop...`);
//           break;
//         }
//       }
//       fields.push(dayData);
//       date = date.addDays(-1);
//     }
//     console.log(`Got ${fields.length} days of data`);
//     return {
//       today: fields[0],
//       fields,
//       dateText,
//       dateKey,
//     };
// }

module.exports.dailyLogs = async (FIELDS, CACHE_NAME, STACK) => {
const CATEGORY_CONFIGURATIONS = {
    SAMPLE_CAT_1: {
        color: '#10FC0C',
        name: 'Health',
      },
      SAMPLE_CAT_2: {
        color: '#FFCCCC',
        name: 'Work',
      },
      SAMPLE_CAT_3: {
        color: '#CCCCFF',
        name: 'Personal',
      },
    };
const FIELDS_TO_AGGREGATE = FIELDS

const DATE_TEXT_FORMAT = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', 
    day: 'numeric',
    month: 'short',
  });

const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  weekday: 'narrow', 
})
const NUM_DAYS = 5;
const PADDING = 5;
const TITLE_TEXT_SPACING = 10;
const TITLE_TEXT_SIZE = 20;
const VERTICAL_TEXT_SPACING = 8;
const VERTICAL_DATA_GRID_SPACING = 4;
const TEXT_SIZE = 14;
const Cache = importModule('Cache');
const DAILY_LOG_CACHE = new Cache(CACHE_NAME);


Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

const data = await fetchData();
if (config.runsInApp) {
  const alert = createAlert(data.dateText, data.today);
  const response = await alert.present();
  if (response === 0) {
    console.log('Cancel was pressed... doing nothing');
  } else if (response === 1) {
      console.log('Submit was pressed');
      const updatedFields = [];
      for (let i = 0; i < FIELDS.length; i++) {
        const value = alert.textFieldValue(i);
        updatedFields.push({
          label: FIELDS[i].label, 
          category: FIELDS[i].category, 
          value, 
        });
      }
      DAILY_LOG_CACHE.write(data.dateKey, updatedFields);
      data.today = updatedFields;
      data.fields[0] = updatedFields;
  }
}

function createAlert(dateText, fields) {
  const alert = new Alert();
  alert.title = `Daily Log for ${dateText}`;
  fields.forEach(field => {
    alert.addTextField(field.label, `${field.value}`);
  });
  alert.addAction('Cancel'); // 0
  alert.addAction('Submit'); // 1
  return alert;
}
const returnStack = createStack(data)
function createStack(data) {
  const mainStack = STACK.addStack();
  const bgColor = new LinearGradient();
  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
  bgColor.locations = [0.0, 1.0];
  mainStack.backgroundGradient = bgColor;
  mainStack.setPadding(PADDING, PADDING, PADDING, PADDING);
  const stack = mainStack.addStack();
  stack.layoutVertically();
  const bottomStack = stack.addStack();
  bottomStack.layoutHorizontally();
  addColumnToStack(bottomStack, [{ value: '' }]
    .concat(FIELDS_TO_AGGREGATE
      .map(field => ({
        value: field.label, 
        color: CATEGORY_CONFIGURATIONS[field.category].color, 
      }))));
  bottomStack.addSpacer(VERTICAL_TEXT_SPACING);
  const fieldCompletionCounts = {};
  FIELDS_TO_AGGREGATE.forEach(field => fieldCompletionCounts[field.label] = 0);
  const dataByDay = data.fields.reverse();
  let date = parseDateFromKey(data.dateKey);
  date = date.addDays(-1 * (dataByDay.length - 1));
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
    addColumnToStack(bottomStack, columnData);
    bottomStack.addSpacer(VERTICAL_DATA_GRID_SPACING);
    date = date.addDays(1);
  });
  bottomStack.addSpacer(VERTICAL_TEXT_SPACING);
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
  addColumnToStack(bottomStack, completionData);
  return mainStack;
}

function parseDateFromKey(dateKey) {
    const dateParts = dateKey.split('_');
    return new Date(
      parseInt(dateParts[0]), // year
      parseInt(dateParts[1]), // month (0-indexed)
      parseInt(dateParts[2]), // day of month
    );
}
function addColumnToStack(stack, columnData) {
  const column = stack.addStack();
  column.layoutVertically();
  column.spacing = VERTICAL_TEXT_SPACING;
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
  textLine.font = new Font(`Menlo${isBold ? '-Bold' : ''}`, TEXT_SIZE);
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
function padNumber(num) {
    return num < 10 ? `0${num}` : num;
}
async function fetchData() {
  let date = new Date();
  if (date.getHours() < 5) {
    date = date.addDays(-1);
  }
  const dateText = DATE_TEXT_FORMAT.format(date);
  const dateKey = `${padNumber(date.getDate())}_${padNumber(date.getMonth())}_${date.getFullYear()}`;
  const fields = [];
  for (let i = 0; i < NUM_DAYS; i++) {
    const dateCacheKey = `${padNumber(date.getDate())}_${padNumber(date.getMonth())}_${date.getFullYear()}`;
    let dayData = await DAILY_LOG_CACHE.read(dateCacheKey);
    if (!dayData) {
      if (i === 0) {
        console.log(`Cache miss for key=${dateCacheKey}, creating new log entry...`);
        dayData = initializeFields();
        DAILY_LOG_CACHE.write(dateCacheKey, dayData);
      } else {
        console.log(`Cache miss for key=${dateCacheKey}, breaking out of loop...`);
        break;
      }
    }
    fields.push(dayData);
    date = date.addDays(-1);
  }
  console.log(`Got ${fields.length} days of data`);
  return {
    today: fields[0],
    fields,
    dateText,
    dateKey,
  };
}

function initializeFields(FIELDS) {
    return FIELDS.map((field) => ({
        label: field.label,
        category: field.category,
        value: '',
    }));
}

return returnStack;
}
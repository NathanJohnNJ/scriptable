const healthFields = [
  { label: 'Enough Sleep', category: 'SAMPLE_CAT_1' },
  { label: 'Shower', category: 'SAMPLE_CAT_1' },
  { label: 'Exercised', category: 'SAMPLE_CAT_1' },
  { label: 'Medication', category: 'SAMPLE_CAT_1' },
];
const workFields = [
    { label: 'Job Hunt', category: 'SAMPLE_CAT_2' },
    { label: 'Upskill', category: 'SAMPLE_CAT_2' },
    { label: 'NJTD', category: 'SAMPLE_CAT_2' },
  ];
  const personalFields = [
    { label: 'Smart Home', category: 'SAMPLE_CAT_3' },
    { label: 'General Code', category: 'SAMPLE_CAT_3' },
    { label: 'Raspberry Pi', category: 'SAMPLE_CAT_3' },
  ];
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
const dailyLogs = importModule('newDLFunc');
const healthCache = new Cache('healthCache');
const workCache = new Cache('workCache');
const personalCache = new Cache('personalCache');

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// if (config.runsInApp) {
//   const alert = createAlert(data.dateText, data.today);
//   const response = await alert.present();
//   if (response === 0) {
//     console.log('Cancel was pressed... doing nothing');
//   } else if (response === 1) {
//       console.log('Submit was pressed');
//       const updatedFields = [];
//       for (let i = 0; i < FIELDS.length; i++) {
//         const value = alert.textFieldValue(i);
//         updatedFields.push({
//           label: FIELDS[i].label, 
//           category: FIELDS[i].category, 
//           value, 
//         });
//       }
//       DAILY_LOG_CACHE.write(data.dateKey, updatedFields);
//       data.today = updatedFields;
//       data.fields[0] = updatedFields;
//   }
// }

const widget = createWidget(data);
Script.setWidget(widget);
Script.complete();

// function createAlert(dateText, fields) {
//   const alert = new Alert();
//   alert.title = `Daily Log for ${dateText}`;
//   fields.forEach(field => {
//     alert.addTextField(field.label, `${field.value}`);
//   });
//   alert.addAction('Cancel'); // 0
//   alert.addAction('Submit'); // 1
//   return alert;
// }

function createWidget(data) {
  const widget = new ListWidget();
//   const bgColor = new LinearGradient();
//   bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
//   bgColor.locations = [0.0, 1.0];
//   widget.backgroundGradient = bgColor;
  widget.setPadding(10, 10, 10, 10);
  const stack = widget.addStack();
  stack.layoutVertically();
  const topStack = stack.addStack();
  topStack.layoutHorizontally();
  const titleTextLine = topStack.addText(`DAILY LOGS`);
  titleTextLine.textColor = Color.white();
  titleTextLine.font = new Font('Menlo-Bold', TITLE_TEXT_SIZE);
  titleTextLine.centerAlignText();
  topStack.addSpacer(TITLE_TEXT_SPACING);
  const healthStack = stack.addStack();
  healthStack.layoutVertically();
  addHeading(healthStack, 'Health');
  dailyLogs.dailyLogs(healthFields, healthCache, healthStack);
  const workStack = stack.addStack();
  workStack.layoutVertically();
  addHeading(workStack, 'Work');
  dailyLogs.dailyLogs(workFields, workCache, workStack);
  const personalStack = stack.addStack();
  personalStack.layoutVertically();
  addHeading(personalStack, 'Personal');
  dailyLogs.dailyLogs(personalFields, personalCache, personalStack);

  return widget;
}

function padNumber(num) {
    return num < 10 ? `0${num}` : num;
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
function addHeading(stack, text){
    let textHandle = stack.addText(text);
    textHandle.font = Font.heavyMonospacedSystemFont(16);
    textHandle.textColor = Color.dynamic(Color.white(),Color.black());
    textHandle.leftAlignText();
    return textHandle;
}
function initializeFields() {
  return FIELDS.map((field) => ({
    label: field.label,
    category: field.category,
    value: '',
  }));
}


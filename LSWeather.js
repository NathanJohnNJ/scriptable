aqua0 = "#8ec07c";
aqua1 = "#427b58";
red0 = "#fb4934";
red1 = "#9d0006"
yellow0 = "#b8bb26";
yellow1 = "#b57614";
green0 = "#b8bb26";
green1 = "#79740e";
blue0 = "#1E4E8C";
blue1 = "#011039";
purple0 = "#d3869b";
purple1 = "#8f3f71";
orange0 = "#fe8019";
orange1 = "#af3a03";
darkGrey0 = "#9B9CA1";
darkGrey1 = "#5D5D5F";
darkCream0 = "#9B7E56"; 
darkCream1 = "#E4D094";
cream0 = "#E4D094";
cream1 = "#E4D094";
white = "#D6D7DC";
black = "#0A0A0C";

const LOG_FILE_NAME = "LSWeather.txt";
const LOG_FILE_PATH = "LSWeatherLogs";
const LOG_TO_FILE = false;
let LOG_STEP = 1;
const UPDATE_CHECK_DAYS = 4; 
const SHOW_LAST_UPDATED_TIME = false;
//  CONFIGURABLE SECTION (START)  //
const WEATHER_SHOW_WEATHER = true;
const WEATHER_UNITS = 'metric';
const WEATHER_LANG = 'en';
const WEATHER_EXCLUDE = 'minutely'; 
let WEATHER_API_KEY = '31c0b0b062e2eb7d13664b499cbeb8e4';
const CALENDAR_SHOW_CALENDARS = true;
const CALENDAR_SHOW_ALL_DAY_EVENTS = true;
const CALENDAR_SHOW_TOMORROW_EVENTS = true;
const CALENDAR_SHOW_COLORS = true;
let CALENDAR_PERSONAL_CALENDARS = []; 
const CALENDAR_PERSONAL_MAX_EVENTS = 3;
const CALENDAR_NO_EVENTS_TEXT = 'No Upcoming Events';
const CALENDAR_COLORS = [aqua0,red0,yellow0,green0,blue0,purple0,orange0,darkGrey0,darkCream0,cream0];
let LAYOUT = 'welcome';

let welcome = {
  welcomeGreeting: {source: "function", key: "greetingText()", prefix: "", suffix: "", x: "center", y: "top_margin + 220", w: "full", h: 100, font: "large", color: "light",  align: "center", hide: 0},
  
  sunrise: {source: "weather", key: "sunrise", prefix: "SFSymbol|sunrise.fill", suffix: "", x: "left_margin + 50", y: -50, w: "full", h: 70, font: "medium", color: "light",  align: "left", hide: 0},
  sunset: {source: "weather", key: "sunset", prefix: "SFSymbol|sunset.fill", suffix: "", x: "right_margin - 50", y: -50, w: "full", h: 70, font: "small", color: "light",  align: "right", hide: 0},
  
  highTemp: {source: "weather", key: "high", prefix: "SFSymbol|arrow.up", suffix: "temperature", x: "center", y: "center - 100", w: 200, h: 100, font: "medium", color: "light", align: "center", hide: 1},
  lowTemp: {source: "weather", key: "low", prefix: "SFSymbol|arrow.down", suffix: "temperature", x: "center", y: "center", w: 200, h: 100, font: "medium", color: "light", align: "center", hide: 1},
  
  weatherText: {source: "text", key: "W E A T H E R", prefix: "SFSymbol|cloud.sun.rain", suffix : "", x: "center", y: "center - 300", w: "full", h: 150, font: "extraLarge", color: "light",  align: "center", hide: 0},
  welcomeTemp: {source: "weather", key: "temp", prefix: "SFSymbol|weatherID", suffix: "temperature", x: "center + 375", y: "center - 150", w: 350, h: 180, font: "big", color: "light",  align: "center"},
  welcomeClimate: {source: "function", key: "weatherText(weatherData)", prefix: "", suffix: "", x: "center - 250", y: "center - 85", w: 725, h: 300, font: "medium", color: "light",  align: "center", hide: 0},
  
  eventText0: {source: "text", key: "", prefix: "SFSymbol|calendar", suffix: "", x: "center - 382.5", y: "center + 250", w: "half", h: 100, font: "extraLarge", color: "light",  align: "center", hide: 0},
  eventText: {source: "text", key: "E", prefix: "", suffix: "", x: "center - 307.5", y: "center + 125", w: "half", h: 100, font: "extraLarge", color: "light",  align: "center", hide: 0},
  eventText1: {source: "text", key: "V", prefix: "", suffix: "", x: "center - 207.5", y: "center + 25", w: "half", h: 100, font: "extraLarge", color: "light",  align: "center", hide: 0},
  eventText2: {source: "text", key: "E", prefix: "", suffix: "", x: "center - 67.5", y: "center - 25", w: "half", h: 100, font: "extraLarge", color: "light",  align: "center", hide: 0},
  eventText3: {source: "text", key: "N", prefix: "", suffix: "", x: "center + 67.5", y: "center - 25", w: "half", h: 100, font: "extraLarge", color: "light",  align: "center", hide: 0},
  eventText4: {source: "text", key: "T", prefix: "", suffix: "", x: "center + 207.5", y: "center + 25", w: "half", h: 100, font: "extraLarge", color: "light",  align: "center", hide: 0},
  eventText5: {source: "text", key: "S", prefix: "", suffix: "", x: "center + 307.5", y: "center + 125", w: "half", h: 100, font: "extraLarge", color: "light",  align: "center", hide: 0},
  eventText6: {source: "text", key: "", prefix: "SFSymbol|calendar", suffix: "", x: "center + 382.5", y: "center + 250", w: "half", h: 100, font: "extraLarge", color: "light",  align: "center", hide: 0},
  personalEvents: {source: "calendar", key: "personalEvents", prefix: "", suffix: "", x: "center", y: "center + 100", w: "half", h: 60, font: "small", color: "light",  align: "center", hide: 0},
  
  location: {source: "weather", key: "loc", prefix: "", suffix: null, x: "center", y: -150, w: "half", h: 100, font: "large", color: "#FFFFFF", align: "center"},
  personalText: {source: "text", key: "📍", prefix: "", suffix: "", x: "center", y: -210, w: "half", h: 120, font: "veryLarge", color: "light",  align: "center", hide: 0},
  
  pendingUpdate: {source: "update", key: "", prefix: "SFSymbol|arrow.triangle.2.circlepath.circle.fill", suffix: "", x: "left_margin + 120", y: "top_margin + 110", w: 75, h: 75, font: "medium", color: red0,  align: "center", hide: 2},
  lastUpdated: {source: "function", key: "lastUpdate()", prefix: "[", suffix: "]", x: "left_margin + 25", y: "bottom_margin - 20", w: 200, h: 75, font: "small", color: "light",  align: "center", bold:false, hide: 0},
};

// source: Source of the data. Valid values are "weather", "calendar", "quote", "function" and "text".
// key: JSON key returned by functions fetchWeather(), fetchCalendar(), fetchQuote(). When source is "text", key will be displayed as data.
// prefix: If present, will be prefixed to the data. SFSymbols are allowed in prefix. Use "SFSymbol|symbolName".
// suffix: If present, will be suffixed to the data. Use "temperature" for temperature data and "speed" for wind data, any other string accepted.
// x: x co-ordinate of the data element. Valid values are "left_margin", "right_margin", "center" and numbers. Anything else will be defaulted to "left_margin".
//    Use -ve values to start from right margin i.e -50 will place the element at 50 pixels from the right margin.
// y: y co-ordinate of the data element. Valid values are numbers.
//    Use -ve values to start from bottom margin i.e -50 will place the element at 50 pixels from the bottom margin.
// w: Width of the data element. Valid values are "half", "full" and numbers. Anything else will be defaulted to DEFAULT_MARGIN
// h: Height of the data element. Valid values are numbers.
// font: Font for the data element. Valid values are Font type object. Can be null.
// color: Color for the data element (except icon). Valid values are "light", "dark" or hex code of the color. If null, white will be used.
// align: Alignment of the data element within the data rectangle. Valid values are "left", "right" or "center".
// hide: 0 or null to show this data element, 1 to hide, 2 for sunrise/sunset only (to show only 1 of them based on the time of the day).
// bold: true or false
// field: [source,key,prefix,suffix,x,y,width,height,font,color,align,hide]

// ============================================== CONFIGURABLE SECTION (END) ============================================== //

let layout;
let useDarkColor = false;
let errMsg;

const LIGHT_COLOR = "#FFFFFF";
const DARK_COLOR = "#000000";

// Default values for layout
const LEFT_MARGIN = 15;
const RIGHT_MARGIN = 15;
const DEFAULT_WIDTH = 100;
const HEADER_RSIZE = +1;
const DETAIL_RSIZE = 1;
const FOOTER_RSIZE = -1;
const SYSTEM_FONT_NAME = "SF-Pro-Text";
const SYSTEM_FONT_WEIGHT = "Normal";      
const ULTRA_SMALL_TEXT_SIZE = 20;
const EXTRA_SMALL_TEXT_SIZE = 30;
const SMALL_TEXT_SIZE = 35;
const MEDIUM_TEXT_SIZE = 50;
const LARGE_TEXT_SIZE = 60;
const VERY_LARGE_TEXT_SIZE = 80;
const EXTRA_LARGE_TEXT_SIZE = 100;
const BIG_TEXT_SIZE = 120;
const VERY_BIG_TEXT_SIZE = 140;
const DEFAULT_TEXT_SIZE = 40;
const allfonts = {
  ultraSmall: {size: ULTRA_SMALL_TEXT_SIZE, font: Font.systemFont(ULTRA_SMALL_TEXT_SIZE), boldFont: Font.boldSystemFont(ULTRA_SMALL_TEXT_SIZE), up: "extraSmall", down: "ultraSmall"},
  extraSmall: {size: EXTRA_SMALL_TEXT_SIZE, font: Font.systemFont(EXTRA_SMALL_TEXT_SIZE), boldFont: Font.boldSystemFont(EXTRA_SMALL_TEXT_SIZE), up: "small", down: "ultraSmall"}, 
  small: {size: SMALL_TEXT_SIZE, font: Font.systemFont(SMALL_TEXT_SIZE), boldFont: Font.boldSystemFont(SMALL_TEXT_SIZE), up: "medium", down: "extraSmall"},
  medium: {size: MEDIUM_TEXT_SIZE, font: Font.systemFont(MEDIUM_TEXT_SIZE), boldFont: Font.boldSystemFont(MEDIUM_TEXT_SIZE), up: "large", down: "small"}, 
  large: {size: LARGE_TEXT_SIZE, font: Font.systemFont(LARGE_TEXT_SIZE), boldFont: Font.boldSystemFont(LARGE_TEXT_SIZE), up: "veryLarge", down: "medium"}, 
  veryLarge: {size: VERY_LARGE_TEXT_SIZE, font: Font.systemFont(VERY_LARGE_TEXT_SIZE), boldFont: Font.boldSystemFont(VERY_LARGE_TEXT_SIZE), up: "extraLarge", down: "large"},
  extraLarge: {size: EXTRA_LARGE_TEXT_SIZE, font: Font.systemFont(EXTRA_LARGE_TEXT_SIZE), boldFont: Font.boldSystemFont(EXTRA_LARGE_TEXT_SIZE), up: "big", down: "veryLarge"},
  big: {size: BIG_TEXT_SIZE, font: Font.systemFont(BIG_TEXT_SIZE), boldFont: Font.boldSystemFont(BIG_TEXT_SIZE), up: "veryBig", down: "extraLarge"},
  veryBig: {size: VERY_BIG_TEXT_SIZE, font: Font.systemFont(VERY_BIG_TEXT_SIZE), boldFont: Font.boldSystemFont(VERY_BIG_TEXT_SIZE), up: "veryBig", down: "big"},
  default: {size: DEFAULT_TEXT_SIZE, font: Font.systemFont(DEFAULT_TEXT_SIZE), boldFont: Font.boldSystemFont(DEFAULT_TEXT_SIZE), up: "default", down: "default"}
}
const baseWeatherURL='https://api.openweathermap.org/data/2.5/onecall';
const baseWeatherIconURL='http://openweathermap.org/img/wn';


if (!config.runsInApp) {
  let inputParams = args.shortcutParameter;
  if (inputParams.layout) LAYOUT = inputParams.layout;
  if (inputParams.apiKey) WEATHER_API_KEY = inputParams.apiKey;
}

const DEVICE_RESOLUTION = Device.screenResolution();
const DEVICE_SCALE = Device.screenScale();
const updateRequired = await checkUpdates();
const calendarData = await fetchCalendar();
const weatherData = await fetchWeather();
let overlayImage;
let overlayBase64String;
try {
  await updateLayout(weatherData.isNight, weatherData.weatherID);
  overlayImage = await createOverlay(weatherData, calendarData);
  overlayBase64String = encodeOverlayImage(overlayImage);
} catch (error) {
  errMsg = "Main_" + error.message.replace(/\s/g,"_");
  Script.complete();
}
if (config.runsInApp) {
  QuickLook.present(overlayImage);
  Script.complete();
} else {
  return overlayBase64String; // return to Shortcuts}
}

/*---FUNCTION encodeOverlayImage ---*/
function encodeOverlayImage(overlayImage){
  let overlayBase64String;
  try {
    const rawOverlay = Data.fromPNG(overlayImage);
    if (rawOverlay === null) {
      errMsg = "Error_convert_Image_to_Data";
      return;
    }
    overlayBase64String = rawOverlay.toBase64String();
    if (overlayBase64String === null) {
      errMsg = "Error_convert_Data_to_Base64String";
      return;
    }
  } catch(error) {
    errMsg = "encodeOverlayImage_" + error.message.replace(/\s/g,"_");
    return;
  }
  return overlayBase64String;
}
/*---FUNCTION fetchWeather---*/
async function fetchWeather(){
  let response;
  let isNight;
  Location.setAccuracyToThreeKilometers();
  locationData = await Location.current();
  const latitude = locationData.latitude;
  const longitude = locationData.longitude;
  const address = await Location.reverseGeocode(locationData.latitude, locationData.longitude);
  const weatherURL = baseWeatherURL + '?lat=' + latitude + '&lon=' + longitude + '&exclude=' + WEATHER_EXCLUDE + '&units=' + WEATHER_UNITS + '&lang=' + WEATHER_LANG + '&appid=' + WEATHER_API_KEY;
  try {
    const request = new Request(weatherURL);
    response = await request.loadJSON();
  } catch (error) {
      return unknownWeatherData;
  }
  try {
    if (response.cod == 401) {
      return unknownWeatherData;
    }
  } catch(error) {
    console.log("JSON Data: " + JSON.stringify(response));
  }
  const currentTime = new Date().getTime() / 1000;
  isNight = currentTime >= response.current.sunset || currentTime <= response.current.sunrise;
  return {
    loc: address[0].locality.toUpperCase(),
    weatherID: response.current.weather[0].id.toString(),
    desc: response.current.weather[0].description,
    mainDesc: response.current.weather[0].main,
    temp: Math.round(response.current.temp).toString(),
    feelsLike: Math.round(response.current.feels_like).toString(),
    humidity: Math.round(response.current.humidity).toString(),
    dewPoint: Math.round(response.current.dew_point).toString(),
    visibility: (Math.round(response.current.visibility) / 1000).toString(),
    pressure: response.current.pressure.toString(),
    uvi: response.current.uvi.toString(),
    wind: Math.round(response.current.wind_speed).toString(),
    high: Math.round(response.daily[0].temp.max).toString(),
    low: Math.round(response.daily[0].temp.min).toString(),
    icon: response.current.weather[0].icon,
    sunrise: convertFromUTC(response.current.sunrise),
    sunset: convertFromUTC(response.current.sunset),
    isNight: isNight
  }
}
/*---FUNCTION getWeatherIcon---*/
async function getWeatherIcon(iconID, isNight){
  try {
    const iconIDNight = iconID.replace("d","n");
    if (isNight) iconID = iconIDNight;
    const iconURL = baseWeatherIconURL + "/" + iconID + "@2x.png";
    let request = new Request(iconURL);
    return await request.loadImage();
  } catch (error) {
    errMsg = "getWeatherIcon_" + error.message.replace(/\s/g,"_");
    return;
  }
}
/*---FUNCTION createOverlay---*/
async function createOverlay(weatherData, calendarData) {
  try {
    let imgCanvas=new DrawContext();
    imgCanvas.opaque = false;
    imgCanvas.size = DEVICE_RESOLUTION;
    let x, y, w, h, rect, font, color, iconImage;
    for (let item in layout){
      source = layout[item].source;
      x = layout[item].x;
      y = layout[item].y;
      w = layout[item].w;
      h = layout[item].h;
      font = layout[item].font;
      fontSize = layout[item].fontSize;
      fontName = layout[item].fontName;
      color = layout[item].color;
      align = layout[item].align;
      suffix = layout[item].suffix;
      prefix = layout[item].prefix;
      prefixColor = layout[item].prefixColor;
      hide = layout[item].hide;
      repeat = false;
      if (source == 'weather') {
        element = eval(`${`weatherData.${layout[item].key}`}`);
      } else if (source == 'calendar') {
        element = eval(`${`calendarData.${layout[item].key}`}`);
      } else if (source == 'function') {
        try {
          element = eval(`${layout[item].key}`)
        } catch (error) {
          errMsg = "getWeatherIcon_" + error.message.replace(/\s/g,"_");
          element = "Invalid Function!";
        }
      } else {
        element = layout[item].key;
      } 

      if (typeof element  === 'undefined') {
        continue; // Skip this element
      } else {
        if (Array.isArray(element)) repeat = true;
      }
      if (hide == 1) {
        continue;
      } else console.log(`Processing item ${item} with value ${element}`);

      rect = new Rect(x,y,w,h)

      imgCanvas.setTextColor(new Color(color));

      if (align == 'left') imgCanvas.setTextAlignedLeft();
      else if (align == 'right') imgCanvas.setTextAlignedRight();
      else imgCanvas.setTextAlignedCenter();

      imgCanvas.setFont(font);

      if (item == 'icon') { // processing icon seperately since it is an image
        iconImage = await getWeatherIcon(element, weatherData.isNight);
        imgCanvas.drawImageInRect(iconImage,rect);
      } else { // Processing everything else
        if (repeat) { // If the element is an Array (for personal & work events)
          y = y - h;
          for (const e of element){
            // If inner element is a dictionary object
            // Data is rsize, title, color, bold
            if (e.constructor == Object) {
              // Relative size
              relativeSize = e.rsize;
              // Data 
              e0 = e.title;
              // Override color for data, if any
              if (typeof e.color !== 'undefined') overrideColor = e.color;
              else overrideColor = color;
              // Is the text bold?
              if (e.bold) bold = true;
              else bold = false;
              // Prefix color (only applicable to SFSymbol prefixes)
              if (typeof e.prefixColor !== 'undefined' && e.prefixColor !== null) prefixColor = e.prefixColor;
              else prefixColor = color;
              // Compute width of data to increase the height of data element 
              const fontSizeInPx = Math.ceil(fontSize / DEVICE_SCALE) + "px";
              const dW = (await getTextWidth(e0, SYSTEM_FONT_WEIGHT + " " + fontSizeInPx + " " + SYSTEM_FONT_NAME)) * DEVICE_SCALE;
              let dH = h;
              
              // Get relative font 
              newFont = getRelativeFont(fontName,relativeSize,bold);
              // Adjust delta based on relative size
              if (relativeSize == FOOTER_RSIZE) delta = -10;
              else delta = 0;
              imgCanvas.setFont(newFont);
              // Evaluate prefix - if present, SFSymbol or plain text
              if (typeof e.prefix !== 'undefined' && e.prefix !== null) {
                overridePrefix = e.prefix;
                if (e.prefix.split("|")[0] == "SFSymbol") {
                  const symbol = SFSymbol.named(e.prefix.split("|")[1]);
                  symbol.applyFont(newFont);
                  overridePrefix = symbol.image;
                } else overridePrefix = e.prefix;
              } else {
                overridePrefix = null;
                if (dW > w) dH = h * 2; // Currently only supporting 2 lines wrapping
              }
              imgCanvas.setTextColor(new Color(overrideColor));
              y = y + h + delta;
              rect = new Rect (x,y,w,dH);
              if (dH != h) y = y + (dH - h); // Increase y co-ordinate based on the delta height
            } else {
              e0 = e;
              y = y + h;
              imgCanvas.setFont(font);
              rect = new Rect (x,y,w,h);            
            }
            imgCanvas = await placeDataElement(imgCanvas, rect, e0, suffix, overridePrefix, prefixColor, align, fontName, color, x,y,w,h, bold);
          }
        } // Normal text element
        else {
          imgCanvas = await placeDataElement(imgCanvas, rect, element, suffix, prefix, prefixColor, align, fontName, color, x,y,w,h, false);
        }
      }
    }
    newImage=imgCanvas.getImage();
  } catch (error) {
    errMsg = "createOverlay_" + error.message.replace(/\s/g,"_");
    return;
  }
  return newImage;
}
/*------------------------------------------------------------------
FUNCTION getRelativeFont
------------------------------------------------------------------*/
function getRelativeFont(fontName, relativeSize, bold){
  newFont = fontName.split(".")[0];
  isBold = false;
  if (bold || fontName.split(".")[1] == "bold") isBold = true;
  if (relativeSize == HEADER_RSIZE) newFont = eval(`allfonts.${fontName}.up`);
  else if (relativeSize == FOOTER_RSIZE) newFont = eval(`allfonts.${fontName}.down`);
  if (!isBold) return eval(`allfonts.${newFont}.font`);
  else return eval(`allfonts.${newFont}.boldFont`);
}
/*------------------------------------------------------------------
FUNCTION placeDataElement
------------------------------------------------------------------*/
async function placeDataElement(imgCanvas, rect, e, suffix, prefix, prefixColor, align, fontName, overrideColor, x,y,w,h, bold){
  let element0 = e.slice(0, 1).toUpperCase() + e.slice(1, e.length)  // Capitalize first letter of the data  
  if ( suffix !== null) { 
    element0 = element0 + suffix
  }
  // Prefix can be a text value or SFSymbol
  if (prefix !== null) {
    if (typeof prefix == 'object') {  // if prefix is an image i.e. SFSymbol
        const prefix0 = await prefixImage(prefix, element0, fontName, prefixColor, overrideColor, w, h, bold);
        let newX;
        const newY = y;
        const newH = h;
        let newW = prefix0.size.width;
        if (newW > w) newW = w;
        if (align == 'right'){
          newX = x + w - newW;
        } else if (align == 'left') {
          newX = x
        } else {
          newX = x + (w/2) - (newW/2)
        }
        rect = new Rect(newX, newY, newW, newH);
        imgCanvas.drawImageInRect(prefix0, rect);
        return imgCanvas;
    } else {
      element0 = prefix + element0;
    }
  }
  imgCanvas.drawTextInRect(element0,rect);
  return imgCanvas;
}
/*------------------------------------------------------------------
FUNCTION prefixImage
------------------------------------------------------------------*/
async function prefixImage(prefixImage, text, fontName, prefixColor, overrideColor, oW, oH, bold){
  let prefixCanvas;
  let gap;
  try {
    if (bold) font = eval(`allfonts.${fontName}.boldFont`);
    else font = eval(`allfonts.${fontName}.font`);
    const fontSize = eval(`allfonts.${fontName}.size`);
    const fontSizeInPx = Math.ceil(fontSize / DEVICE_SCALE) + "px";
    const pW = prefixImage.size.width; // prefix width
    const pH = prefixImage.size.height; // prefix height
    const dW = (await getTextWidth(text, SYSTEM_FONT_WEIGHT + " " + fontSizeInPx + " " + SYSTEM_FONT_NAME)) * DEVICE_SCALE;

    if (fontSize <= 30) gap = 4;
    else if (fontSize <= 100) gap = 10;
    else if (fontSize > 100) gap = 20;

    // Create a new canvas for prefixImage + text of size item
    prefixCanvas=new DrawContext();
    prefixCanvas.opaque = false;
    prefixCanvas.size = new Size(pW + dW + gap,oH);
    if (prefixColor != "#######") prefixImage = await tintSFSymbol(prefixImage, new Color(prefixColor));
    // Draw prefixImage at (x,y) = (0,0)
    prefixCanvas.drawImageAtPoint(prefixImage, new Point(0,0));
    
    const dataRect = new Rect(pW + gap,0,dW,oH);
    prefixCanvas.setTextColor(new Color(overrideColor));
    prefixCanvas.setFont(font);
    prefixCanvas.setTextAlignedLeft();
    prefixCanvas.drawTextInRect(text, dataRect);
  } catch (error) {
    errMsg = "prefixImage_" + error.message.replace(/\s/g,"_");
    return;
  }
  return prefixCanvas.getImage();
}
/*------------------------------------------------------------------
FUNCTION updateLayout
------------------------------------------------------------------*/
async function updateLayout(isNight, weatherID){
  const coloredSFSymbols = ['wind','sunset','sunrise','cloud','sun','snow','tornado'];
  layoutName = 'welcome';
  layout = eval(layoutName);
  try {
    const imageSize=DEVICE_RESOLUTION;
    let TEMPERATURE_UNIT;
    let SPEED_UNIT; 
    // set constants based on UNITS
    if (WEATHER_UNITS == 'imperial'){
        TEMPERATURE_UNIT = "°";
        SPEED_UNIT = "mph";
    } else if (WEATHER_UNITS == 'metric') {
        TEMPERATURE_UNIT = "°";
        SPEED_UNIT = "m/s";
    } else { // when WEATHER_UNITS is not applied or "standard"
        TEMPERATURE_UNIT = "°";
        SPEED_UNIT = "m/s";
    }  
    // loop through the layout dictionary and update necessary dynamic data
    for (let item in layout){
      // Evaluate width & height 
      layout[item].w = parseWidthHeight("w",layout[item].w);
      layout[item].h = parseWidthHeight("h",layout[item].h);

      // Evaluate x & y co-ordinates
      layout[item].x = parseCoordinates("x",layout[item].w,layout[item].x);
      layout[item].y = parseCoordinates("y",layout[item].h,layout[item].y);

      // Evaluate suffix for temperature and speed units
      if (layout[item].suffix == "temperature") layout[item].suffix = TEMPERATURE_UNIT;
      else if (layout[item].suffix == "speed") layout[item].suffix = SPEED_UNIT;
      
      // Evaluate color
      if (layout[item].color == "light") {
        if (!useDarkColor) layout[item].color = LIGHT_COLOR;
        else layout[item].color = DARK_COLOR;
      } else if (layout[item].color == "dark") {
        if (!useDarkColor) layout[item].color = LIGHT_COLOR;
        else layout[item].color = DARK_COLOR;
      }
      
      // Evaluate font
      if (layout[item].font === null) {
        layout[item].font = allfonts.default.font;
        layout[item].size = allfonts.default.size;
        layout[item].fontName = "default";
        layout[item].bold = false;
      }
      else {
        const fontName = (layout[item].font).split(".")[0];
        let boldType = (layout[item].font).split(".")[1];
        if (layout[item].bold) boldType = 'bold';
        if (boldType == 'bold'){
          layout[item].font = eval(`${`allfonts.${fontName}.boldFont`}`);
          layout[item].bold = true;
        } else {
          layout[item].font = eval(`${`allfonts.${fontName}.font`}`);
          layout[item].bold = false;
        }
        layout[item].fontSize = eval(`${`allfonts.${fontName}.size`}`); // insert new field in the layout, fontSize
        layout[item].fontName = fontName;
      }

      // Evaluate prefix
      if (layout[item].prefix !== null && layout[item].hide != 1){
        // Prefix of the form SFSymbol|symbolname
        if (layout[item].prefix.split("|")[0] == "SFSymbol"){
          let symbolName = layout[item].prefix.split("|")[1];
          if (symbolName == 'weatherID') {
            symbolName = getWeatherSymbol(weatherID,isNight);
            // Change this to text type to show only symbol
            if (layout[item].key == 'weatherID'){
              layout[item].source = "text";
              layout[item].key = "";
            }
            layout[item].prefixColor = "#######";
          } else if (symbolName == 'dayOfMonth') {
            const day = (new Date()).getDate().toString().padStart(2,'0');
            symbolName = `${day}.circle.fill`;
          }
          const symbol = SFSymbol.named(symbolName);
          symbol.applyFont(layout[item].font);
          layout[item].prefix = symbol.image;
          if (coloredSFSymbols.includes(symbolName.split(".")[0])) layout[item].prefixColor = "#######";
          else layout[item].prefixColor = layout[item].color;
        }
        // Everything else remains untouched
      }

      // Evaluate hide based on sunset/sunrise time
      if (layout[item].hide == 2){
        if (layout[item].key == "sunrise") {
          if (isNight) layout[item].hide = 0;
          else layout[item].hide = 1;
        } 
        if (layout[item].key == "sunset") {
          if (!isNight) layout[item].hide = 0;
          else layout[item].hide = 1;
        }
      }
      if (layout[item].source == "update" && !updateRequired) layout[item].hide = 1;
      if (item == 'lastUpdated' && SHOW_LAST_UPDATED_TIME) layout[item].hide = 0;
      if (item == 'lastUpdated' && !SHOW_LAST_UPDATED_TIME) layout[item].hide = 1;
    }
  } catch (error) {
    errMsg = "updateLayout_" + error.message.replace(/\s/g,"_");
    return;
  }
}
/*------------------------------------------------------------------
FUNCTION parseWidthHeight
------------------------------------------------------------------*/
function parseWidthHeight(wh,field){
  const imageSize=DEVICE_RESOLUTION;
  let half,full;
  if (wh == 'w') {
    half = imageSize.width/2;
    full = imageSize.width;
  } else {
    half = imageSize.height/2;
    full = imageSize.height;
  }
  return eval(`${field}`);
}
/*------------------------------------------------------------------
FUNCTION parseCoordinates
------------------------------------------------------------------*/
function parseCoordinates(xy,wh,field){
  const imageSize=DEVICE_RESOLUTION;
  let left_margin, right_margin, center, top_margin, bottom_margin;
  if (xy == 'x') {
    left_margin = 0;
    right_margin = imageSize.width - wh;
    center = (imageSize.width/2) - (wh/2);
    if (field < 0) field = "right_margin - " + (field * -1);
  } else {
    top_margin = 0;
    bottom_margin = imageSize.height - wh;
    center = (imageSize.height/2) - (wh/2);
    if (field < 0) field = "bottom_margin - " + (field * -1);
  }
  return eval(`${field}`);
}
/*------------------------------------------------------------------
FUNCTION getWeatherSymbol
------------------------------------------------------------------*/
function getWeatherSymbol(weatherID, isNight){
  // Check all weather IDs at https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  if (weatherID >= 200 && weatherID <= 211){
    if (isNight) return "cloud.moon.bolt.fill";
    else return "cloud.sun.bolt.fill";
  } else if (weatherID > 211 && weatherID <= 232){
    if (isNight) return "cloud.bolt.rain.fill";
    else return "cloud.bolt.rain.fill";
  } else if (weatherID >= 300 && weatherID <= 311) {
    if (isNight) return "cloud.drizzle.fill";
    else return "cloud.drizzle.fill";
  } else if (weatherID > 311 && weatherID <= 321) {
    if (isNight) return "cloud.moon.rain.fill";
    else return "cloud.moon.rain.fill";    
  } else if (weatherID >= 500 && weatherID <= 510) {
    if (isNight) return "cloud.moon.rain.fill";
    else return "cloud.sun.rain.fill";    
  } else if (weatherID == 511) {
    if (isNight) return "cloud.hail.fill";
    else return "cloud.hail.fill";    
  } else if (weatherID > 511 && weatherID <= 531) {
    if (isNight) return "cloud.heavyrain.fill";
    else return "cloud.heavyrain.fill";
  } else if (weatherID >= 600 && weatherID <= 602) {
    if (isNight) return "snow";
    else return "snow";
  } else if (weatherID > 602 && weatherID <= 613) {
    if (isNight) return "cloud.sleet.fill";
    else return "cloud.sleet.fill";
  } else if (weatherID > 613 && weatherID <= 622) {
    if (isNight) return "cloud.snow.fill";
    else return "cloud.snow.fill";
  } else if (weatherID >= 701 && weatherID <= 731) {
    if (isNight) return "sun.haze.fill";
    else return "sun.haze.fill";
  } else if (weatherID == 741) {
    if (isNight) return "cloud.fog.fill";
    else return "cloud.fog.fill";
  } else if (weatherID > 741 && weatherID <= 771) {
    if (isNight) return "sun.dust.fill";
    else return "sun.dust.fill";
  } else if (weatherID == 781) {
    if (isNight) return "tornado";
    else return "tornado";
  } else if (weatherID == 800) {
    if (isNight) return "moon.stars.fill";
    else return "sun.max.fill";
  } else if (weatherID >= 801 && weatherID <= 899) {
    if (isNight) return "cloud.moon.fill";
    else return "cloud.sun.fill";
  } else return "exclamationmark.circle"
}
/*------------------------------------------------------------------
FUNCTION fetchCalendar
------------------------------------------------------------------*/
async function fetchCalendar() {
  if (!CALENDAR_SHOW_CALENDARS) return unknownCalendarData;
  let pEventsToday = [];
  let pEventsTomorrow = [];
  let pEventsTodayCount = 0;
  let pEventsTodayAllDayCount = 0;
  let pEventsTomorrowCount = 0;
  let pEventsTomorrowAllDayCount = 0;
  let calendarColors = {};
  const maxColors = CALENDAR_COLORS.length;
  let colorIdx = 0;
  // Filter out falsy values
  CALENDAR_PERSONAL_CALENDARS = CALENDAR_PERSONAL_CALENDARS.filter(x => x);

  // Fetch all personal calendar events for today and tomorrow
  for (const calendarName of CALENDAR_PERSONAL_CALENDARS) {
    const calendar = await Calendar.forEventsByTitle(calendarName);
    const todayEvents = await CalendarEvent.today([calendar]);
    const tomorrowEvents = await CalendarEvent.tomorrow([calendar]);
    if (todayEvents.length > 0 || tomorrowEvents.length > 0){
      calendarColors[calendarName] = CALENDAR_COLORS[colorIdx];
      colorIdx++;
      if (colorIdx >= maxColors) colorIdx = 0; // Repeat colors after max
    }
    for (const e of todayEvents) pEventsToday.push(e);
    if (CALENDAR_SHOW_TOMORROW_EVENTS){
      for (const e of tomorrowEvents) pEventsTomorrow.push(e);
    }
  }

  // If personal calendar not set, fetch default calendar for events
  if (CALENDAR_PERSONAL_CALENDARS.length == 0){
    const calendar = await Calendar.defaultForEvents();
    const todayEvents = await CalendarEvent.today([calendar]);
    const tomorrowEvents = await CalendarEvent.tomorrow([calendar]);
    if (todayEvents.length > 0 || tomorrowEvents.length > 0){
      calendarColors[calendar.title] = CALENDAR_COLORS[colorIdx];
      colorIdx++;
      if (colorIdx >= maxColors) colorIdx = 0; // Repeat colors after max
    }
    for (const e of todayEvents) pEventsToday.push(e);
    if (CALENDAR_SHOW_TOMORROW_EVENTS){
      for (const e of tomorrowEvents) pEventsTomorrow.push(e);
    }
  }
  
  // Filter out expired events from the event list
  pEventsToday = pEventsToday.filter(e => (new Date(e.endDate)).getTime() >= (new Date()).getTime());

  // Filter out all day events if required
  if (!CALENDAR_SHOW_ALL_DAY_EVENTS) {
    pEventsToday = pEventsToday.filter(e => !e.isAllDay);
    pEventsTomorrow = pEventsTomorrow.filter(e => !e.isAllDay);
  }
  // Sort array based on start time and put all day events at the end of the list
  pEventsToday = pEventsToday.sort(sortEvents);
  pEventsTomorrow = pEventsTomorrow.sort(sortEvents);

  pEventsTodayAllDayCount = pEventsToday.reduce((n, x) => n + (x.isAllDay), 0);
  pEventsTodayCount = pEventsToday.length - pEventsTodayAllDayCount;
  
  pEventsTomorrowAllDayCount = pEventsTomorrow.reduce((n, x) => n + (x.isAllDay), 0);
  pEventsTomorrowCount = pEventsTomorrow.length - pEventsTomorrowAllDayCount;


  // Format output array as required
  personalEvents = formatEvents(pEventsToday, pEventsTomorrow, CALENDAR_PERSONAL_MAX_EVENTS,calendarColors);

  // personEventsRaw = pEventsToday.concat(pEventsTomorrow);
  return {
    personalEvents: personalEvents, 
    pEventsTodayCount: pEventsTodayCount, 
    pEventsTodayAllDayCount: pEventsTodayAllDayCount, 
    pEventsTomorrowAllDayCount: pEventsTomorrowAllDayCount, 
    pEventsTomorrowCount: pEventsTomorrowCount,
   };
}
/*------------------------------------------------------------------
FUNCTION sortEvents
------------------------------------------------------------------*/
function sortEvents(e1,e2) {
  if (e1.isAllDay) return 1;
  else if (e2.isAllDay) return -1;
  else if ((new Date(e1.startDate)).getTime() < (new Date(e2.startDate)).getTime()) return -1;
  else if ((new Date(e1.startDate)).getTime() > (new Date(e2.startDate)).getTime()) return 1;
  else return 0;
}
/*------------------------------------------------------------------
FUNCTION formatEvents
------------------------------------------------------------------*/
function formatEvents(eventsToday, eventsTomorrow, maxEvents, calendarColors){
  let formatLine = [];
  let eventsToShow = 0;
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayText = "T O D A Y";
  const tomorrowText = "T O M O R R O W";

  formatLine.push({rsize: HEADER_RSIZE, title: todayText});
  eventsToShow = 0;
  for (const e of eventsToday) {
    if (eventsToShow < maxEvents) {
      let prefix = null;
      let prefixColor = null;
      let bold = false;
      // Mark ongoing events
      if ((new Date(e.endDate)).getTime() >= today.getTime() && (new Date(e.startDate)).getTime() <= today.getTime() && !e.isAllDay) {
        prefix = "SFSymbol|circlebadge.fill";
        prefixColor = red0;
        bold = false;
      } else {
        if (e.isAllDay) prefix = "SFSymbol|app";
        else prefix = "SFSymbol|app.fill";
        prefixColor = calendarColors[e.calendar.title];
      }
      // Array of [Relative size, event title, calendar color]
      if (CALENDAR_SHOW_COLORS) formatLine.push({rsize: DETAIL_RSIZE, title: e.title, prefix: prefix, prefixColor: prefixColor, bold: bold});
      // if (CALENDAR_SHOW_COLORS) formatLine.push({rsize: DETAIL_RSIZE, title: e.title, bold: bold});
      else formatLine.push({rsize: DETAIL_RSIZE, title: e.title});
      if (e.isAllDay) formatLine.push({rsize: FOOTER_RSIZE,title: "[ALL DAY]", bold: true});
      else {
        if (!isSameDay(e.startDate,e.endDate)){
          if (isSameDay(e.startDate,today)) // Starts today but ends on a later date, show only start time
            formatLine.push({rsize: FOOTER_RSIZE, title: `[${formatTime(e.startDate)}]`, bold: true});
          else formatLine.push({rsize: FOOTER_RSIZE, title: `[Ends ${formatTime(e.endDate)}]`, bold: true})   // Starts earlier but ends today
        } else {
          formatLine.push({rsize: FOOTER_RSIZE, title: `[${formatTime(e.startDate)} - ${formatTime(e.endDate)}]`, bold: true});
        }
      }
      eventsToShow++;
    }
  }
  if (eventsToShow == 0 && maxEvents > 0) formatLine.push({rsize: FOOTER_RSIZE, title: CALENDAR_NO_EVENTS_TEXT});
  if (eventsToShow < eventsToday.length) formatLine.push({rsize: FOOTER_RSIZE, title: `${eventsToday.length - eventsToShow} more event(s)`});

  if (!CALENDAR_SHOW_TOMORROW_EVENTS) return formatLine;

  formatLine.push({rsize: HEADER_RSIZE, title: tomorrowText});
  eventsToShow = 0;
  for (const e of eventsTomorrow) {
    if (eventsToShow < maxEvents) {
      // Color calendars    
      if (e.isAllDay) prefix = "SFSymbol|app";
      else prefix = "SFSymbol|app.fill";
      prefixColor = calendarColors[e.calendar.title];
      // Array of [Relative size, event title, calendar color]
      if (CALENDAR_SHOW_COLORS) formatLine.push({rsize: DETAIL_RSIZE,title: e.title, prefix: prefix, prefixColor: prefixColor});
      // if (CALENDAR_SHOW_COLORS) formatLine.push({rsize: DETAIL_RSIZE,title: e.title});
      else formatLine.push({rsize: DETAIL_RSIZE,title: e.title});
      if (e.isAllDay) formatLine.push({rsize: FOOTER_RSIZE,title: "[ALL DAY]", bold: true});
      else {
        if (!isSameDay(e.startDate,e.endDate)){
          if (isSameDay(e.startDate,tomorrow)) // Starts tomorrow but ends on a later date, show only start time
            formatLine.push({rsize: FOOTER_RSIZE, title: `[${formatTime(e.startDate)}]`, bold: true});
          else formatLine.push({rsize: FOOTER_RSIZE, title: `[Ends ${formatTime(e.endDate)}]`, bold: true});   // Starts earlier but ends tomorrow
        } else {
          formatLine.push({rsize: FOOTER_RSIZE, title: `[${formatTime(e.startDate)} - ${formatTime(e.endDate)}]`, bold: true});
        }
      }
      eventsToShow++;
    }
  }

  if (eventsToShow == 0 && maxEvents > 0) formatLine.push({rsize: FOOTER_RSIZE, title: CALENDAR_NO_EVENTS_TEXT});
  if (eventsToShow < eventsTomorrow.length) formatLine.push({rsize: FOOTER_RSIZE, title: `${eventsTomorrow.length - eventsToShow} more event(s)`});

  return formatLine;
}
function lastUpdate(){
  let dt = new Date();
  let hours = "0" + dt.getHours();
  let minutes = "0" + dt.getMinutes();
  return hours.substr(-2) + ':' + minutes.substr(-2);
}
/*------------------------------------------------------------------
FUNCTION tintSFSymbol
------------------------------------------------------------------*/
async function tintSFSymbol(image, color) {
  let html = `
  <img id="image" src="data:image/png;base64,${Data.fromPNG(image).toBase64String()}" />
  <canvas id="canvas"></canvas>
  `;
  
  let js = `
    let img = document.getElementById("image");
    let canvas = document.getElementById("canvas");
    let color = 0x${color.hex};
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let imgData = ctx.getImageData(0, 0, img.width, img.height);
    // ordered in RGBA format
    let data = imgData.data;
    for (let i = 0; i < data.length; i++) {
      // skip alpha channel
      if (i % 4 === 3) continue;
      // bit shift the color value to get the correct channel
      data[i] = (color >> (2 - i % 4) * 8) & 0xFF
    }
    ctx.putImageData(imgData, 0, 0);
    canvas.toDataURL("image/png").replace(/^data:image\\/png;base64,/, "");
  `;
  let wv = new WebView();
  await wv.loadHTML(html);
  let base64 = await wv.evaluateJavaScript(js);
  const tintedImage = Image.fromData(Data.fromBase64String(base64));

  // Above function expands the image based on Device scale, resize it to original image size
  const symbolCanvas=new DrawContext();
  symbolCanvas.opaque = false;
  symbolCanvas.size = image.size;
  symbolCanvas.drawImageInRect(tintedImage, new Rect(0,0,image.size.width,image.size.height));
  return symbolCanvas.getImage();
}
/*------------------------------------------------------------------
FUNCTION getTextWidth
------------------------------------------------------------------*/
async function getTextWidth(text, font){
  const buffer = 5; // This is a temporary solution until I figure out why width returned is a bit short.
  const html = `<canvas id="canvas"></canvas>`;
  const js = `
    function getTextWidth() {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.font = "${font}";
      let metrics = ctx.measureText("${text}");
      return metrics.width;
    }
    getTextWidth();
  `;
  let wv = new WebView();
  await wv.loadHTML(html);
  const width = await wv.evaluateJavaScript(js);
  return Math.ceil(width) + buffer;
}
/*------------------------------------------------------------------
FUNCTION convertFromUTC
------------------------------------------------------------------*/
function convertFromUTC(unixTimestamp){
  var date = new Date(unixTimestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours + ':' + minutes.substr(-2)
  return formattedTime;
}
/*------------------------------------------------------------------
FUNCTION formatTime
------------------------------------------------------------------*/
function formatTime(unformattedDate){
  let date = new Date(unformattedDate);
  let hours = "0" + date.getHours();
  let minutes = "0" + date.getMinutes();
  return hours.substr(-2) + ':' + minutes.substr(-2);
}
/*------------------------------------------------------------------
FUNCTION getTimeDiff
------------------------------------------------------------------*/
function getTimeDiff(date1, date2){
  var diff = date2.getTime() - date1.getTime(); // this is a time in milliseconds
  var diff_as_date = new Date(diff);
  const hours = diff_as_date.getUTCHours();
  const mins = diff_as_date.getUTCMinutes();
  let timeDiff;
  if (hours > 0) {
    if (hours == 1) timeDiff = hours + " hr "
    else timeDiff = hours + " hrs ";
  }
  if (mins > 0) timeDiff = timeDiff + mins + " mins";
  return timeDiff;
}
/*------------------------------------------------------------------
FUNCTION isSameDay
------------------------------------------------------------------*/
function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
}
/*------------------------------------------------------------------
FUNCTION greetingText
------------------------------------------------------------------*/
function greetingText(){
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours >= 0 && (hours <= 4 && minutes <= 59)){
    return `😴 Good Night 😴`;
  } else if (hours >= 5 && (hours <=11 && minutes <= 59)) {
    return `🥰 Good Morning 🥰`;
  } else if (hours >= 12 && (hours <=17 && minutes <= 59)) {
    return `😁 Good Afternoon 😁`;
  } else if (hours >= 18 && (hours <=21 && minutes <= 59)) {
    return `🥱 Good Evening 🥱`;
  } else return `😴 Good Night 😴`;
}
/*------------------------------------------------------------------
FUNCTION weatherText
------------------------------------------------------------------*/
function weatherText(weatherData) {
  let desc = weatherData.desc.slice(0, 1).toUpperCase() + weatherData.desc.slice(1, weatherData.desc.length);  // capitalize first letter of the data  
  const text = `${desc} today. It's currently ${weatherData.temp}°; the high will be ${weatherData.high}°.`;
  let wrapText = (s, w) => s.replace(
    new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
  );
  const text0 = wrapText(text,50);
  return text0;
}
/*------------------------------------------------------------------
FUNCTION calendarText
------------------------------------------------------------------*/
function calendarText(calendarData) {
  const events = calendarData.pEventsTodayCount;
  const allDayEvents = calendarData.pEventsTodayAllDayCount;
  if (events == 0 && allDayEvents == 0){
    text = `Your day is clear.`;
  } else if (events == 0 && allDayEvents > 0) {
    text = `You've got ${allDayEvents} all day event(s) today.`;
  } else if (events > 0 && allDayEvents == 0) {
    text = `You've got ${events} event(s) today.`;
  } else {
    text = `You've got ${events} event(s) and ${allDayEvents} all day event(s) today.`;
  }
  let wrapText = (s, w) => s.replace(
    new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
  );
  const text0 = wrapText(text,50);
  return text0;
}
/*------------------------------------------------------------------
FUNCTION checkUpdates
------------------------------------------------------------------*/
async function checkUpdates(){
  // Version info
  const VERSION = "2.1.2"; // DO NOT CHANGE THIS VALUE
if (UPDATE_CHECK_DAYS == 0) return false;
  versionURL = 'https://raw.githubusercontent.com/ajatkj/scriptable/master/lib/LSWeatherVersionInfo.json';
  let updateRequired = false;
  let t = new Date() 
  let today = t.getDate().toString().padStart(2,'0') + "/" + (t.getMonth() + 1).toString().padStart(2,'0') + "/" + t.getFullYear();
  let fm = FileManager.iCloud();
  let versionPath = fm.joinPath(fm.documentsDirectory(), "LSWeather");
  if (!fm.fileExists(versionPath)) fm.createDirectory(versionPath);
  let versionFile = fm.joinPath(versionPath,'versioncheck.txt');
  if (fm.fileExists(versionFile)) {
    vers = JSON.parse(fm.readString(versionFile));
    oldVersion = vers.version;
    lastChecked = vers.lastChecked;
  } else {
    oldVersion = 0;
    lastChecked = 0;
  }
  if (oldVersion != VERSION && oldVersion != 0) {
    updateRequired = true;
  }
  // Find when was last check done
  if (lastChecked != 0) {
    lc = lastChecked.split("/");
    td = today.split("/");
    daysDiff = ((new Date(+td[2], td[1] - 1, +td[0])) - (new Date(+lc[2], lc[1] - 1, +lc[0]))) / (1000 * 3600 * 24);
  } else {
    daysDiff = 999;
  }
  if (daysDiff >= UPDATE_CHECK_DAYS || lastChecked == 0) {
    //Check for updates
    try {
      let updateCheck = new Request(versionURL);
      updateCheck.timeoutInterval = 10;
      uC = await updateCheck.loadJSON()
      if (uC.version != VERSION){
        lastChecked = today;
        fm.writeString(versionFile, JSON.stringify({"version": uC.version, "lastChecked": lastChecked}));
        updateRequired = true;
      } else if (lastChecked == 0) {
        fm.writeString(versionFile, JSON.stringify({"version": VERSION, "lastChecked": today}));
      }
    } catch (error) {
      errMsg = "updateCheck_" + error.message.replace(/\s/g,"_") + ".Proceeding_without_checks.";
      updateRequired = false;
    }
  }
  return updateRequired;
}
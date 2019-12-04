const readToday = require('./main/file-process');

const TODAY_FILE_PATH = "../../docs/today.txt";
const DATA_FILE_PATH = "../../public/data";

readToday(TODAY_FILE_PATH, DATA_FILE_PATH);
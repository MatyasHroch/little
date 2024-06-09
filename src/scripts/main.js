import fs from "fs";

import { renderAll } from "./processer.js";
import data from "../data.js";

const result = await renderAll(data);

// write it to the result file
fs.writeFileSync("./index.html", result);

console.log(result);

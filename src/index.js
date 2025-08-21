import "./style.css";
import bird from "../src/img/Picture-bird.webp";

import * as styles from "./index.module.css";

console.log("CSS Module rrr:", styles.rrr);

const root = document.getElementById("root");
const app = document.createElement("h1");
app.textContent = "Hello World!";
app.className = styles.rrr;

root.appendChild(app);

const img = document.createElement("img");
img.src = bird;
img.alt = "Bird";
img.width = 200;
root.appendChild(img);

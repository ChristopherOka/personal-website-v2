import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";

main();

function main() {
  console.log("Rendering index.html");
  const contentHtml = fs.readFileSync("src/index-base.html").toString();

  const dom = new JSDOM(contentHtml);
  const components = dom.window.document.querySelectorAll("[data-component]");
  renderComponents(components);

  fs.writeFileSync("index.html", dom.serialize());
}

function renderComponents(components: NodeListOf<Element>) {
  components.forEach((component) => {
    // Find component file from name
    const componentName = component.getAttribute("data-component");
    if (!componentName) {
      console.error("No component name found");
      return;
    }
    // const componentHtml = getComponentHtml(componentName);
    // component.outerHTML = componentHtml;
  });
}

// export function getComponentHtml(componentName: string) {
//   const filePath = searchFileWithoutExtension("src/components", componentName, [
//     "ts",
//   ]);
//   return ;
// }

export function getFileHtml(componentName: string) {
  const filePath = searchFileWithoutExtension("src/components", componentName, [
    "html",
    "svg",
  ]);
  if (!filePath) {
    console.error("No component file found");
    throw new Error("No component file found");
  }
  return fs.readFileSync(filePath).toString();
}

function searchFileWithoutExtension(
  dir: string,
  fileName: string,
  validFileTypes: string[],
) {
  // read the contents of the directory
  const files = fs.readdirSync(dir);

  // search through the files
  for (const file of files) {
    // build the full path of the file
    const filePath = path.join(dir, file);

    if (!validateFileType(validFileTypes, filePath)) {
      continue;
    }

    // Trim file name extension
    const match = /(.*)\..*/g.exec(file);
    const trimmedFileName = match?.[1];

    // get the file stats
    const fileStat = fs.statSync(filePath);

    // if the file is a directory, recursively search the directory
    if (fileStat.isDirectory()) {
      return searchFileWithoutExtension(filePath, fileName, validFileTypes);
    } else if (trimmedFileName?.endsWith(fileName)) {
      // if the file is a match, return it
      return filePath;
    }
  }
}

function validateFileType(validFileTypes: string[], fileName: string) {
  for (const type of validFileTypes) {
    if (fileName.endsWith(type)) {
      return true;
    }
  }
  console.error("Invalid file type", fileName);
  return false;
}

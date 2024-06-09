import { isObject, isArray } from "./utils.js";
import { loadAll, getPrototype, getComponent } from "./preloader.js";

function getPrimitives(data) {
  const primitives = {};
  for (const key in data) {
    const value = data[key];
    if (!isObject(value) && !isArray(value)) {
      primitives[key] = value;
    }
  }
  return primitives;
}

async function renderObject(name, values, tagName) {
  const prototype = await getPrototype(name);
  const primitives = getPrimitives(values);
  let resultString = prototype.textHtml;

  // rendering the PRIMITIVES
  for (const primitiveName in primitives) {
    const value = primitives[primitiveName];
    resultString = resultString.replace(`{${primitiveName}}`, value);
  }

  // rendering arrays and objects
  for (const key in values) {
    const value = values[key];
    if (!Object.keys(primitives).includes(key)) {
      const result = await render(value, key);
      resultString = resultString.replace(`<${key} />`, result);
    }
  }

  return resultString;
}

export async function render(values, name, tagName = null) {
  if (!tagName) {
    tagName = name;
  }
  if (name.endsWith("_list")) {
    name = name.replace("_list", "");
  }

  if (isArray(values)) {
    const result = [];
    for (const item of values) {
      result.push(await render(item, name, tagName));
    }
    return result.join("");
  } else if (isObject(values)) {
    return await renderObject(name, values, tagName);
  }
  // else it is a primitive, so we just skip it
}

export async function renderAll(data) {
  await loadAll();
  const result = [];
  for (const name in data) {
    const value = data[name];
    result.push(await render(value, name));
  }
  return result.join("");
}

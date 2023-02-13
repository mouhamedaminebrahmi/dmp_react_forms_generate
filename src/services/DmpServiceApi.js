import axios from "axios";

export async function getTemplate(t) {
  try {
    const response = await axios.get("https://api.publicapis.org/entries");
    return require(`../data/templates/${t}-template.json`);
  } catch (error) {
    console.error(error);
  }
}

export async function getFullTemplate(t) {
  try {
    const response = await axios.get("https://api.publicapis.org/entries");
    return require(`../data/templates/${t}.json`);
  } catch (error) {
    console.error(error);
  }
}

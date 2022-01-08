
import { readFile } from 'fs/promises';

async function importJson(url) {
    const json = JSON.parse(
        await readFile(
          new URL(url, import.meta.url)
        )
      );
    return json;
}

export  {importJson};
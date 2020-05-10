// deno run --allow-read  ./scripts/cvt-toc.ts

import { readJson } from "https://deno.land/std/fs/read_json.ts";

const tocUnknown = await readJson("deno_docs_zh_CN/src/toc.json");

interface Toc {
    [key: string]: {
        name: string,
        children?: {
            [key: string]: string
        }
    }
}

const toc: Toc = tocUnknown as Toc; // Yes I know what I'm doing

for (const k1 of Object.keys(toc)) {
    console.log(`- [${k1}](${toc[k1].name}.md)`);

    const children = toc[k1].children ?? {};

    for (const k2 of Object.keys(children)) {
        console.log(`  - [${k2}](${children[k2]}.md)`);
    }
}

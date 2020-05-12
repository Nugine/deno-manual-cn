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
    console.log(`- [${toc[k1].name}](${k1}.md)`);

    const children = toc[k1].children ?? {};

    for (const k2 of Object.keys(children)) {
        console.log(`  - [${children[k2]}](${k1}/${k2}.md)`);
    }
}

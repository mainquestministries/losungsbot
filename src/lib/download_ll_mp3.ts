import axios from "axios";
import { parse } from "node-html-parser";
import {tmpdir} from "node:os";
import {join} from "path";
import * as fs from "node:fs";

export async function download_ll_mp3() : Promise<string> {
    const day = (new Date()).getDay();
    const day_map : Record<number, string> = {
        0: "sonntag",
        1: "montag",
        2: "dienstag",
        3: "mittwoch",
        4: "donnerstag",
        5: "freitag",
        6: "samstag"
    }
    const base_url = `https://lebensliturgien.de/archiv/${day_map[day]}/tagesgebet`

    const html_code = (await axios.get(base_url)).data.toString();
    const parsed = parse(html_code);

    const audioTag = parsed.querySelector("audio");
    const audio_url = audioTag?.getAttribute("src") ?? "";

    const response = await axios.get(audio_url, { responseType: "arraybuffer" });
    const tempFilePath = join(tmpdir(), `downloaded_audio_${Date.now()}.mp3`);
    fs.writeFileSync(tempFilePath, response.data);

    return tempFilePath;
}
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Vibrant } from "node-vibrant/browser";

import { calculatePointsForLevel } from "../data/points";

import styles from "./Level.module.css";

export function Level({ level, placement }: { level: ListLevel, placement: number }) {
    const [border, setBorder] = useState<string>("");

    const hasVideo = level.videoId !== "";
    const background = `https://levelthumbs.prevter.me/thumbnail/${level.levelId}/medium`;
    const thumbnail = hasVideo ? `https://i.ytimg.com/vi/${level.videoId}/hqdefault.jpg` : "/img/placeholder.jpg";

    useEffect(() => {
        const storageKey = level.levelId.toString();
        const cachedBorder = localStorage.getItem(storageKey);

        if (cachedBorder) {
            setBorder(cachedBorder);
        } else {
            Vibrant.from(background).getPalette().then((palette) => {
                const borderBase = "2px solid";
                let border;

                if (palette.Vibrant) {
                    border = `${borderBase} ${palette.Vibrant.hex}`;
                } else {
                    border = `${borderBase} white`;
                };
                
                setBorder(border);
                localStorage.setItem(storageKey, border);
            });
        }
    }, []);

    return (
        <div
            className={styles.level}
            style={{ backgroundImage: `url("${background}")`, border }}
        >
            <div className={styles.content}>
                <div className={styles.info}>
                    <a
                        href={`https://youtube.com/watch?v=${level.videoId}`}
                        style={{ pointerEvents: hasVideo ? "all" : "none" }}
                        target="_blank"
                    >
                        <img
                            src={thumbnail}
                            style={{ border }}
                            draggable={false}
                        />
                    </a>
                    <div className={styles.details}>
                        <h1>#{placement} - {level.name}</h1>
                        <p>Published by {level.publisher}</p>
                        <p>
                            Verified by <Link to={`/statsviewer/${level.verifier.username.toLowerCase()}`}>
                                {level.verifier.username}
                            </Link>
                        </p>
                        <p>{calculatePointsForLevel(placement)} points</p>
                    </div>
                </div>
                <div className={styles.tier}>
                    <img className={styles.tierBase} src={`/img/tier/bases/base${level.tier}.png`} draggable={false}/>
                    <img className={styles.tierBottom} src="/img/tier/bottom.png" draggable={false}/>
                    <img className={styles.tierTop} src="/img/tier/top.png" draggable={false}/>
                    <p>{level.tier}</p>
                </div>
            </div>
        </div>
    );
}
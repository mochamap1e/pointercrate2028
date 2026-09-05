import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { Vibrant } from "node-vibrant/browser";

import { calculatePointsForLevel } from "../data/points";

import styles from "./Level.module.css";

export function Level({ level, placement }: { level: ListLevel, placement: number }) {
    const [levelColor, setLevelColor] = useState<string>("");
    const [cachedColor, setCachedColor] = useLocalStorage(level.levelId.toString(), "");

    const hasVideo = level.videoId !== "";
    const background = `https://levelthumbs.prevter.me/thumbnail/${level.levelId}/medium`;
    const thumbnail = hasVideo ? `https://i.ytimg.com/vi/${level.videoId}/hqdefault.jpg` : "/img/placeholder.png";

    useEffect(() => {
        if (cachedColor) {
            setLevelColor(cachedColor);
        } else {
            Vibrant.from(background).getPalette().then((palette) => {
                let color;

                if (palette.Vibrant) {
                    color = palette.Vibrant.hex;
                } else {
                    color = "white";
                };
                
                setLevelColor(color);
                setCachedColor(color);
            });
        }
    }, []);

    return (
        <div
            className={styles.level}
            style={{
                backgroundImage: `url("${background}")`,
                border: `2px solid ${levelColor}`,
                boxShadow: `0 0 10px ${levelColor}`
            }}
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
                            style={{ border: `2px solid ${levelColor}` }}
                            title="YouTube Video"
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
                <div className={styles.difficulty}>
                    <img
                        src={`/img/demons/${level.difficulty}.png`}
                        title={`${level.difficulty.charAt(0).toUpperCase() + level.difficulty.slice(1)} Demon`}
                        draggable={false}
                    />
                    <div>
                        <img className={styles.tierBase} src={`/img/tier/bases/base${level.tier}.png`} draggable={false}/>
                        <img className={styles.tierBottom} src="/img/tier/bottom.png" draggable={false}/>
                        <img className={styles.tierTop} src="/img/tier/top.png" draggable={false}/>
                        <p>{level.tier}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
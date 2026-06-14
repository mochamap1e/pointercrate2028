import { useState } from "react";

import { Page } from "../components/Page";

import { list } from "../data/list";
import { users } from "../data/users";
import { calculatePointsForUser } from "../data/points";

import styles from "./Statsviewer.module.css";

export function Statsviewer() {
    const [targetUser, setTargetUser] = useState<typeof leaderboard[number] | undefined>(undefined);

    const leaderboard = users
        .map((user) => {
            const verifiedLevels = list.filter((level) => level.verifier.username === user.username);
            const beatenLevels = list.filter((level) => level.victors.some((victor) => victor.username === user.username));

            const points = calculatePointsForUser(user);

            return {
                ...user,
                points,
                verifiedLevels,
                beatenLevels
            };
        })
        .sort((a, b) => b.points - a.points)
        .map((user, index) => ({
            ...user,
            placement: index + 1,
        }));

    return (
        <Page className={styles.page}>
            {!targetUser && (<h1>Select a user!</h1>)}
            <div className={styles.container}>
                <div className={styles.list}>
                    {leaderboard.map((user, index) => (
                        <p
                            key={index}
                            onClick={() => setTargetUser(user)}
                        >#{user.placement}: {user.username} ({user.points} points)</p>
                    ))}
                </div>
                {targetUser && (
                    <div className={styles.viewer}>
                        <h1>#{targetUser.placement}: {targetUser.username}</h1>
                        <p>{targetUser.points} points</p>

                        <div>
                            <h2>Levels verified:</h2>
                            {targetUser.verifiedLevels.map((level, index) => (<p key={index}>{level.name}</p>))}
                        </div>
                        
                        <div>
                            <h2>Levels beaten:</h2>
                            {targetUser.beatenLevels.map((level, index) => (<p key={index}>{level.name}</p>))}
                        </div>
                    </div>
                )}
            </div>
        </Page>
    );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Page } from "../components/Page";

import { list } from "../data/list";
import { users } from "../data/users";
import { calculatePointsForUser } from "../data/points";

import styles from "./Statsviewer.module.css";

export function Statsviewer() {
    const navigate = useNavigate();
    const { target } = useParams();

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
    
    useEffect(() => {
        if (target) {
            const targetAsUser = leaderboard.find(user => user.username.toLowerCase() === target);
            if (targetAsUser) {
                setTargetUser(targetAsUser);
            }
            navigate("/statsviewer");
        }
    }, []);

    return (
        <Page className={styles.page}>
            {!targetUser && (<h1>Select a user!</h1>)}
            <div className={styles.container}>
                <div className={styles.list}>
                    {leaderboard.map((user, index) => (
                        <button
                            key={index}
                            onClick={() => setTargetUser(user)}
                        >#{user.placement}: {user.username} ({user.points} points)</button>
                    ))}
                </div>
                {targetUser && (
                    <div className={styles.viewer}>
                        <h1>#{targetUser.placement}: {targetUser.username}</h1>
                        <p>{targetUser.points} points</p>

                        {targetUser.verifiedLevels.length > 0 && (
                            <>
                                <h2>Levels verified:</h2>
                                <div>
                                    {targetUser.verifiedLevels.map((level, index) => (<p key={index}>{level.name}</p>))}
                                </div>
                            </>
                        )}

                        {targetUser.beatenLevels.length > 0 && (
                            <>
                                <h2>Levels beaten:</h2>
                                <div>
                                    {targetUser.beatenLevels.map((level, index) => (<p key={index}>{level.name}</p>))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </Page>
    );
}
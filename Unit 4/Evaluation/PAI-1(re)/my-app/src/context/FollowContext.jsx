import { createContext, useContext, useMemo, useState } from "react";

const FollowContext = createContext(null);

export function FollowProvider({ children }) {
    const [following, setFollowing] = useState([]); // array of user objects

    const isFollowing = (userId) => following.some(u => u.id === userId);

    const follow = (user) =>
        setFollowing(prev => (isFollowing(user.id) ? prev : [...prev, user]));

    const unfollow = (userId) =>
        setFollowing(prev => prev.filter(u => u.id !== userId));

    const value = useMemo(() => ({
        following, isFollowing, follow, unfollow
    }), [following]);

    return (
        <FollowContext.Provider value={value}>
            {children}
        </FollowContext.Provider>
    );
}

export const useFollow = () => {
    const ctx = useContext(FollowContext);
    if (!ctx) throw new Error("useFollow must be used within FollowProvider");
    return ctx;
};

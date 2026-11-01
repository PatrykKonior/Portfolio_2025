import { createContext, useContext } from "react";

export const AUDIENCES = ["clients", "hiring"];

export const AudienceContext = createContext({ audience: "clients", setAudience: () => {} });

export const useAudience = () => useContext(AudienceContext);

// ?for=hiring|clients wins (links sent to recruiters or clients), then the visitor's last choice.
export const initialAudience = () => {
    const fromUrl = new URLSearchParams(window.location.search).get("for");
    if (AUDIENCES.includes(fromUrl)) return fromUrl;
    try {
        const saved = localStorage.getItem("audience");
        if (AUDIENCES.includes(saved)) return saved;
    } catch {
        // Storage can be blocked; fall through to the default.
    }
    return "clients";
};

export const persistAudience = (audience) => {
    const url = new URL(window.location.href);
    url.searchParams.set("for", audience);
    window.history.replaceState(null, "", url);
    try {
        localStorage.setItem("audience", audience);
    } catch {
        // Not critical: the URL already carries the choice.
    }
};

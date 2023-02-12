import { HorizontalRuleIcon, XIcon } from "@primer/octicons-react";
import clsx from "clsx";
import { render } from "preact";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import "../../base.css";
import "../styles.scss";
import ChatContent from "./ChatContent";
const usePopup = create<{
    show: boolean;
    toggle: (status?: boolean) => void;
}>((set) => ({
    show: true,
    toggle: (status?: boolean) =>
        set((state) => ({ show: status === undefined ? !state.show : status })),
}));

const ChatPopup = () => {
    const { toggle, show } = usePopup();
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [grabbing, grabbingSet] = useState(false);
    const state = useRef({
        dragged: false,
        position: {
            x: 0,
            y: 0,
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
        },
    });

    useEffect(() => {
        const el = ref.current;
        const containerEl = containerRef.current;
        if (!el || !containerEl) return;
        const updateEl = ({ left, top }: { left: number; top: number }) => {
            // const { left, top } = state.current.position;
            containerEl.style.left = left + "px";
            containerEl.style.top = top + "px";
        };

        const handlePointDown = (e: PointerEvent) => {
            state.current.position.x = e.pageX;
            state.current.position.y = e.pageY;
            state.current.dragged = true;
            grabbingSet(true);
        };
        const handlePointMove = (e: PointerEvent) => {
            if (!state.current.dragged) return;
            const { x, y, left, top } = state.current.position;

            updateEl({
                left: left + (e.pageX - x),
                top: top + (e.pageY - y),
            });
        };
        const handlePointUp = (e: PointerEvent) => {
            if (!state.current.dragged) return;
            state.current.dragged = false;
            const { x, y } = state.current.position;
            state.current.position.left += e.pageX - x;
            state.current.position.top += e.pageY - y;
            grabbingSet(false);
        };

        el.addEventListener("pointerdown", handlePointDown);
        document.body.addEventListener("pointermove", handlePointMove);

        document.body.addEventListener("pointerout", handlePointUp);
        document.body.addEventListener("pointerover", handlePointUp);
        document.body.addEventListener("pointercancel", handlePointUp);
        document.body.addEventListener("pointerup", handlePointUp);
        return () => {
            el.removeEventListener("pointerdown", handlePointDown);
            document.body.removeEventListener("pointermove", handlePointMove);
            document.body.removeEventListener("pointerup", handlePointUp);
            document.body.removeEventListener("pointerout", handlePointUp);
            document.body.removeEventListener("pointerover", handlePointUp);
            document.body.removeEventListener("pointercancel", handlePointUp);
        };
    }, []);
    return (
        <div
            className="chatgpt-popup chat-gpt-container fixed w-[400px] rounded-md overflow-hidden border-2 border-solid z-10 border-slate-800 bg-slate-700 "
            style={{
                left: state.current.position.left,
                top: state.current.position.top,
            }}
            ref={containerRef}
        >
            <div
                ref={ref}
                className={clsx(
                    "flex justify-between select-none px-4 py-2 bg-slate-900 border-0 border-b-[0.5px] border-slate-800 border-solid",
                    {
                        "cursor-grab": !grabbing,
                        "cursor-grabbing": grabbing,
                    }
                )}
            >
                <span>ChatGpt</span>
                <button
                    onClick={() => {
                        toggle();
                    }}
                    className="button border-0 cursor-pointer hover:text-red-600 p-0"
                >
                    {show ? (
                        <XIcon size={24}></XIcon>
                    ) : (
                        <HorizontalRuleIcon size={16} className="p-1" />
                    )}
                </button>
            </div>
            <div
                style={{
                    height: show ? window.innerHeight / 2 - 30 : 0,
                }}
                className="transition-all overflow-hidden"
            >
                <ChatContent />
            </div>
        </div>
    );
};

export function injectChatPopup() {
    const div = document.createElement("div");

    document.body.appendChild(div);
    render(<ChatPopup />, div);
}

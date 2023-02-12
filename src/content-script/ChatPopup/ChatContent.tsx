import { PaperAirplaneIcon } from "@primer/octicons-react";
import clsx from "clsx";

const ChatContent = () => {
    return (
        <div className="flex flex-col h-full">
            {/* <Select>
                <Select.Option value="value1">Value1</Select.Option>
                <Select.Option value="value2">Value2</Select.Option>
                <Select.Option value="value3">Value3</Select.Option>
            </Select> */}
            <div className="flex-auto overflow-auto">
                {Array(100)
                    .fill(1)
                    .map((_, i) => (
                        <div
                            key={i}
                            className={clsx("py-4 px-2", {
                                "bg-slate-900": i % 2 === 0,
                                "bg-slate-800": i % 2 !== 0,
                            })}
                        >
                            <div className="max-w-[350px] mx-auto">
                                How are you today?
                            </div>
                        </div>
                    ))}
            </div>
            <div className="mt-auto max-h-min p-2 flex relative">
                <textarea
                    placeholder="Write whawt you want "
                    className="border-0 w-full outline-none bg-slate-900 rounded-md pr-10 p-2 max-h-[300px]"
                >
                    123123
                </textarea>
                <button className=" block cursor-pointer hover:text-sky-300 absolute top-4 right-4 w-8 h-8 p-0 border-0 rounded-full bg-slate-700">
                    <PaperAirplaneIcon
                        size={16}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </button>
            </div>
        </div>
    );
};

export default ChatContent;

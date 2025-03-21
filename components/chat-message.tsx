import Markdown from "react-markdown";
import { Message } from "ai/react";
import remarkGfm from "remark-gfm"; // ✅ suport pentru imagini, tabele, linkuri etc.

const UserMessage = ({ text }: { text: string | undefined }) => {
  return (
    <div className="text-white bg-black self-end py-2 px-4 rounded-3xl max-w-[75%] text-sm leading-tight">
      {text}
    </div>
  );
};

const AssistantMessage = ({ text }: { text: string | undefined }) => {
  return (
    <div className="bg-[#efefef] py-2 px-4 rounded-3xl w-fit max-w-[75%] text-sm leading-tight">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 no-underline"
            />
          ),
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="rounded-xl mt-3 max-w-full h-auto"
              alt={props.alt || "image"}
            />
          ),
        }}
      >
        {text || ""}
      </Markdown>
    </div>
  );
};

export default function ChatMessage({ role, content }: Partial<Message>) {
  switch (role) {
    case "user":
      return <UserMessage text={content} />;
    case "assistant":
      return <AssistantMessage text={content} />;
    default:
      return null;
  }
}


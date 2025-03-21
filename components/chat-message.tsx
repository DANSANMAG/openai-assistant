Skip to content
Sanmag's projects
Sanmag's projects

Hobby

openai-assistant

cn2taeic1

Changelog
Help
Docs

Source
Output
components/chat-message.tsx

import Markdown from "react-markdown";
import { Message } from "ai/react";

const UserMessage = ({ text }: { text: string | undefined }) => {
  return (
    <div className="text-white bg-black self-end py-2 px-4 rounded-3xl max-w-[75%]">
      {text}
    </div>
  );
};

const AssistantMessage = ({ text }: { text: string | undefined }) => {
  return (
    <div className="bg-[#efefef] py-2 px-4 rounded-3xl w-fit max-w-[75%]">
      <Markdown
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
openai-assistant – Deployment Source – Vercel



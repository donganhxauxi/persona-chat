import React, { useState, useEffect, useRef } from "react";
import Classes from "./Chatbox.module.scss";

const endpoint = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
export const Chatbox = () => {
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const chatRef = useRef<HTMLInputElement>(null);

  const submitChathandler = async () => {
    try {
      setChat((prevChat) => [
        ...prevChat,
        { role: "user", content: chatRef?.current?.value as string },
      ]);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            ...chat,
            { role: "user", content: chatRef?.current?.value },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response!");
      }

      const data: ChatResponse = await res.json();
      const newMessages = data.choices.map((choice) => ({
        role: choice.message.role,
        content: choice.message.content,
      }));
      setChat((prevChat) => [...prevChat, ...newMessages]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className={Classes.Chatbox}>
      <div className={Classes.Chatbox__Header}>Persona</div>
      <div className={Classes.Chatbox__MessagesContainer}>
        {chat.map((message) => (
          <div>{message.content}</div>
        ))}
      </div>
      <div className={Classes.Chatbox__ActionsContainer}>
        <input className={Classes.Chatbox__Chatbar} ref={chatRef} />
        <button className={Classes.SubmitBtn} onClick={submitChathandler}>
          Send
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from "react";
import Classes from "./Chatbox.module.scss";
import { Message } from "@/types/response";
import { ChatService } from "@/services/ChatService";
import cl from "classnames";

export const Chatbox = () => {
  const [chat, setChat] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const chatRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const submitChathandler = async () => {
    setMessage(chatRef?.current?.value as string);
    setChat((prevChat) => [
      ...prevChat,
      { role: "user", content: chatRef?.current?.value as string },
    ]);
  };

  const chatServiceInstance = new ChatService("/v1/chat/completions");

  useEffect(() => {
    if (chat.length === 0) return;
    chatRef?.current?.value ? (chatRef.current.value = "") : null;
    const getMessage = async () => {
      try {
        const newMessage = await chatServiceInstance.getMessage(chat);
        setChat((prevChat) => [
          ...prevChat,
          ...newMessage.choices.map((choice) => ({
            role: choice.message.role,
            content: choice.message.content,
          })),
        ]);
      } catch (error) {
        console.error((error as any).message);
      }
    };

    getMessage();
  }, [message]);

  useEffect(() => {
    console.log(chat);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [JSON.stringify(chat)]);

  return (
    <div className={Classes.Chatbox}>
      <div className={Classes.Chatbox__Header}>Persona</div>
      <div className={Classes.Chatbox__MessagesContainer}>
        {chat.map((message, index) => (
          <div
            className={cl(Classes.Chatbox__Message, {
              [Classes.Chatbox__UserMessage]: message.role === "user",
              [Classes.Chatbox__AssistantMessage]: message.role === "assistant",
            })}
          >
            {message.content}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className={Classes.Chatbox__ActionsContainer}>
        <input
          className={Classes.Chatbox__Chatbar}
          ref={chatRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitChathandler();
            }
          }}
        />
        <button className={Classes.SubmitBtn} onClick={submitChathandler}>
          Send
        </button>
      </div>
    </div>
  );
};

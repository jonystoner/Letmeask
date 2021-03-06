import { ReactNode } from "react";

import "../styles/question.scss"


type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

export function Question({ content, author, children }: QuestionProps) {
  return (
    <>
      <div className="question">
        <p> {content} </p>
        <footer>
          <div className="user-info">
            <img src={author.avatar} alt={author.name}></img>
            <span> {author.name} </span>
          </div>
        </footer>
        <div className="flex flex-row justify-end">{children}</div>
      </div>
    </>
  );
}

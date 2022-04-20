import "./styles.css";
import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [notCompleteTodos, setNotCompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (e) => setTodoText(e.target.value);
  const onClickAdd = () => {
    if (todoText === "") {
      return;
    }
    const newTodos = [...notCompleteTodos, todoText];
    setNotCompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...notCompleteTodos];
    newTodos.splice(index, 1);
    setNotCompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newNotCompleteTodos = [...notCompleteTodos];
    newNotCompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, notCompleteTodos[index]];
    setNotCompleteTodos(newNotCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newNotCompleteTodos = [...notCompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setNotCompleteTodos(newNotCompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <div className="not-complete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {notCompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

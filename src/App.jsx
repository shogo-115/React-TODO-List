import "./styles.css";
import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { NotCompleteTodos } from "./components/NotCompleteTodos";
import { CompleteTodos } from "./components/completeTodos";

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
        disabled={notCompleteTodos.length >= 5}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      {notCompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです</p>
      )}
      <NotCompleteTodos
        todos={notCompleteTodos}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

import React, { useState } from "react";
import "./index.css";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue) {
      const _tasks = tasks;
      _tasks.push({ name: inputValue, stage: 0 });
      setTasks(_tasks);
      setInputValue("");
    }
  };

  const back = (name) => {
    let _tasks = tasks;
    _tasks = _tasks.map((task) => {
      if (task.name == name)
        return { name: task.name, stage: task.stage == 0 ? 0 : task.stage - 1 };
      else return task;
    });
    setTasks(_tasks);
  };

  const forward = (name) => {
    let _tasks = tasks;
    _tasks = _tasks.map((task) => {
      if (task.name == name)
        return { name: task.name, stage: task.stage == 3 ? 3 : task.stage + 1 };
      else return task;
    });
    setTasks(_tasks);
  };

  const remove = (name) => {
    let _tasks = tasks;
    _tasks = _tasks.filter((e) => e.name != name);
    setTasks(_tasks);
  };

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          value={inputValue}
          onChange={onInputChange}
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
        />
        <button
          onClick={addTask}
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-name`}
                          >
                            {task.name}
                          </span>
                          <div className="icons">
                            <button
                              onClick={() => back(task.name)}
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-back`}
                              disabled={task.stage == 0}
                            >
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button
                              onClick={() => forward(task.name)}
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-forward`}
                              disabled={task.stage == 3}
                            >
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button
                              onClick={() => remove(task.name)}
                              className="icon-only danger x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-delete`}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default KanbanBoard;

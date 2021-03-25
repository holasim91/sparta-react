
const ADD_TODOS = "todos/ADD_TODOS"
const TOGGLE_TODO='todos/TOGGLE_TODO'

const initialState = {
  todos:[
    {
      date:'2021-03-22',
      todo:[{
          id:1,
          todo:'알고리즘 복습',
          isDone: true,
      },
      {
        id: 2,
        todo: "리액트 복습",
        isDone: false,
      },
]
  },
  {
    date:'2021-03-23',
    todo:[{
        id:1,
        todo:'리액트 복습',
        isDone: false,
    }]
},
{
  date:'2021-03-25',
  todo:[{
      id:1,
      todo:'숑이 산책',
      isDone: true,
  }]
}
]
};



export const toggleTodo = (toggleData) =>{
  console.log(toggleData)
  return {type:TOGGLE_TODO, toggleData}
}
export const addTodos = (data) =>{
  return{type:ADD_TODOS,data}
}

/*
디스패치 -> 일정토글 상태 업데이트 
 */


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "todos/TOGGLE_TODO": {
      const toggleDate = state.todos.find(
        (v) => v.date === action.toggleData.date
      );
      const targetData = toggleDate.todo.find(
        (v) => v.id === action.toggleData.id
      );
      targetData['isDone'] = !targetData['isDone']
      return {
        ...state,
        todos: [...state.todos],
      };
    }
    case "todos/ADD_TODOS": {
      const target = state.todos.find((v) => v.date === action.data.date);
      if (target === undefined) {
        state.todos.push({
          date: action.data.date,
          todo: [{ id: 1, todo: action.data.todo, isDone: action.data.isDone }],
        });
      } else {
        const new_index = target.todo.length + 1;
        target.todo.push({
          id: new_index,
          todo: action.data.todo,
          isDone: action.data.isDone,
        });
      }

      return {
        ...state,
        todos: [...state.todos],
      };
    }
    default:
      return state;
  }
}

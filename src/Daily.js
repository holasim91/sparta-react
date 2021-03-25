import React, { useState } from "react";
import { useSelector } from "react-redux";
import Detail from "./Detail";
import styled from 'styled-components'

const DoneTodoDiv = styled.div`
background: #23689b; 
cursor: pointer;
margin: 10px;
color: #FFF;

`
const NotDoneTodoDiv = styled.div`
background: #ef4f4f; 
cursor: pointer;
margin: 10px;
`

const Daily = ({ day }) => {
const [openModal, setOpenModal] = useState(false)
const[info,setInfo]=useState(null)
const {todos} = useSelector(state => state.todos)

  const modalOpen = (id, date, todo,toggle) => {
    setOpenModal(true);
    
    setInfo([date, id, todo, toggle])

}
 
const modalClose = () => {
  setOpenModal(false);
}
  
  function todo_exist(day) {
    const exist_plan = todos.find((v) => v.date === day.format("YYYY-MM-DD")); //더미데이터중에서 해당 날짜의 데이터찾기
    if (!exist_plan) {
      return <span className={`text`}>{day.format("D")}</span>; // 없으면 그냥 날짜
    } else {
      return (
        <>
          <span className={`text today`}>
            {day.format("D")}
            {/*  있다면 날짜를 우선 띄우고*/}

            {/*  일정을 불러오는 로직*/}
            {exist_plan.todo.map((d, i) =>
              d.isDone ? (
                <DoneTodoDiv
                  key={i}
                  onClick={()=>modalOpen(d.id, day.format('YYYY-MM-DD'), d.todo, d.isDone )}
               
               >
                  {d.todo}
                </DoneTodoDiv>
              ) : (
                <NotDoneTodoDiv
                  key={i}
                  onClick={()=>modalOpen(d.id, day.format('YYYY-MM-DD'), d.todo, d.isDone )}
                >
                  {d.todo}
                </NotDoneTodoDiv>
              )
            )}
          </span>
          <Detail
            open={openModal}
            close={modalClose}
            date={day.format("YYYY-MM-DD")}
            data={info}
          />
          {/* 모달 띄울시 모든 일정이 다 출력됨 */}
        </>
      );
    }
  }
  return(

     <div className={`box`}>{todo_exist(day)}
     </div>

     );
};

export default Daily;


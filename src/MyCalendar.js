import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import moment from "moment";
import Daily from "./Daily";
import { useSelector } from "react-redux";


const CalerdarContainer = styled.div`
  width: 1080px;
  height: 1000px;
  margin: 0 auto;
  border-top: 1px solid black;
`;

const Head = styled.div`
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid black;
`;

const Back = styled(ArrowBackIosIcon)`
  cursor: pointer;
  &:hover {
    color: #eee;
  }
`;

const Forward = styled(ArrowForwardIosIcon)`
  cursor: pointer;
  &:hover {
    color: #eee;
  }
`;

const Month = styled.span`
  font-size: 48px;
`;

const Body = styled.div`
  .row {
    display: flex;
    cursor: pointer;
    &:first-child {
      cursor: initial;

      .box {
        font-weight: bold;
        padding-bottom: 50px;
      }
    }
  }

  .box {
    position: relative;
    display: inline-flex;
    width: calc(100% / 7);
    height: 0;
    padding-bottom: calc(100% / 7);
    font-size: 12pt;
    border-bottom: 1px solid black;

    .sun {
      color: red;
    }
    .sat {
      color: #588dff;
    }
    &:hover {
      span.text {
        background-color: #d2d2d2;
      }
      span.schedule {
        background-color: initial;
      }
    }
  }

  span.yoil {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  span.text {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  span.today {
    display: inline-block;
    text-align:center;
    padding-top: 20px;
    &:hover {
      background: yellow;
    }
  }
`;


const AddTodoBtn = styled.button``;
const MyCalendar = (props) => {
  const {todos} = useSelector(state => state.todos)
  
  const [done, setDone] = useState(false)
  const [today, setToday] = useState(moment());

  const goBack = () => {
    const prevMonth = today.clone().subtract(1, "month");
    setToday(prevMonth);
  };

  const goForward = () => {
    let nextMonth = today.clone().add(1, "month");
    setToday(nextMonth);
  };

  const startWeek = today.clone().startOf("month").week();
  const endWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  function generate() {
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      <div className="row" key={week}>
        {Array(7)
          .fill(0)
          .map((n, i) => {
            let current = today
              .clone()
              .week(week)
              .startOf("week")
              .add(n + i, "day");
            return calendar.push(current);
          })}
      </div>;
    }
    return calendar;
  }

  return (
    <>
      <CalerdarContainer>
        <Head>
          <Back fontSize={"large"} onClick={goBack} />
          <Month>
            {today.format("MMMM").toUpperCase()} {today.format("YYYY")}
          </Month>
          <AddTodoBtn onClick={()=>props.history.push("/add")}>Add ToDo</AddTodoBtn>
          {done?
          <AddTodoBtn onClick={()=>setDone(prev => !prev)}>모든 일정</AddTodoBtn>
          :
          <AddTodoBtn onClick={()=>setDone(prev => !prev)}>완료 일정만</AddTodoBtn>

        }
          <Forward fontSize={"large"} onClick={goForward} />
        </Head>
        <Body>
          <div className="row yoil">
            <div className="box">
              <span className="yoil sun">SUN</span>
            </div>
            <div className="box">
              <span className="yoil">MON</span>
            </div>
            <div className="box">
              <span className="yoil">TUE</span>
            </div>
            <div className="box">
              <span className="yoil">WED</span>
            </div>
            <div className="box">
              <span className="yoil">THU</span>
            </div>
            <div className="box">
              <span className="yoil">FRI</span>
            </div>
            <div className="box">
              <span className="yoil sat">SAT</span>
            </div>
          </div>
          {generate().map((d) => (
            <Daily
            data ={todos}
              day={d}
              key={d.format("YYYY-MMMM-DD")}
            />
          ))}
        </Body>
      </CalerdarContainer>
    </>
  );
};

export default MyCalendar;

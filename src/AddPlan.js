import React, { useState } from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd';
import moment from "moment";
import { useDispatch } from 'react-redux';
import { addTodos } from './redux/modules/todos';


  
  const AddContainer = styled.div`
    width:700px;
    margin: 0 auto;
    height: 800px;
    text-align: center;
  `

  const Title = styled.h1`
    font-size: 58px;
    margin-top: 10px;
  `

  const Label = styled.label`
    font-size:24px;
  `

  const InputBlock = styled.div`
    margin-bottom:24px;
  `
  const AddBtn = styled.button`
    margin-right:30px;
  `
const AddPlan = (props) => {
   const dispatch = useDispatch()
    const [todo, setTodo] = useState('')
    const onChangeTodo = (e) => {setTodo(e.target.value)}
    const [date, setDate] = useState('')
    const onChangeDate= (dateString) =>{setDate(dateString)} 
      const onSubmitForm =(e) => {
        e.preventDefault()
        // console.log({date:moment(date).format('YYYY-MM-DD'), todo: todo, isDone: false});
        let data = {
          date:moment(date).format('YYYY-MM-DD'), 
          todo: todo, 
          isDone: false}
        
        dispatch(addTodos(data))
        props.history.push('/')
      }
  
      return (
        <AddContainer>
          <form onSubmit={onSubmitForm}>
            <Title>일정추가</Title>
            <InputBlock>
            <Label >일정: </Label>
            <input type="text" value={todo} onChange={onChangeTodo}/>
            </InputBlock>
            <InputBlock>
            <Label>날짜: </Label>
            <DatePicker onChange={onChangeDate}  value={date} />
            </InputBlock>
            <AddBtn htmlType="submit" >일정추가</AddBtn>
            <button onClick={()=>{props.history.push('/')}}>취소</button>
            </form>
        </AddContainer>
    )
}
export default AddPlan

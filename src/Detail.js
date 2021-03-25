import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { toggleTodo} from './redux/modules/todos'

const Back = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.6);`

const Modal = styled.div`
    width: 90%;
    max-width: 450px;
    margin:0 auto;
    border-radius: .3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show .3s;
    overflow: hidden;    
`
const Header = styled.header`
   position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
    font-weight: 700;

    & button{
        position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
    }
`
const Body = styled.main`
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
`
const Footer = styled.footer`
  padding: 12px 16px;
  text-align: right;

  & button{
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;

  }
`
const Detail = ({open, close,  date, data}) => {
  const dispatch = useDispatch()
    return (
      <>
        {open ? (
          <Back>
            <Modal>
              <section>
                <Header>
                  {data[0]}
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                </Header>
                <Body>{data[2]}</Body>
                <Footer>
                  {data[3] === true ? (
                    <button
                      className="close"
                      onClick={() => {
                        let toggleData = {
                          date: date,
                          id: data[1],
                          
                        };
                        dispatch(toggleTodo(toggleData));
                 
                      }}
                    >
                      완료취소
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        let toggleData = {
                          date: date,
                          id: data[1],
                        };
                        dispatch(toggleTodo(toggleData));

                      }}
                    >
                      완료하기
                    </button>
                  )}
                  <button className="close" onClick={close}>
                    close
                  </button>
                </Footer>
              </section>
            </Modal>
          </Back>
        ) : null}
      </>
    );
}

export default Detail

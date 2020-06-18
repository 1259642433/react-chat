import React from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import io from 'socket.io-client'
import './index.scss'

// 创建socket连接，http使用ws协议，https使用wss协议
const socket = io('ws://localhost:9999', {
    reconnectionAttempts: 10
})

function Chat() {
    const [notice, setNotice] = React.useState('');
    const [msg, setMsg] = React.useState('');
    const [msgsList, setMsgsList] = React.useState([]);
    const [noticeOpen, setNoticeOpen] = React.useState(false);
    (() => {
        socket.on('serverMsg', res => {
            if (res.type === 'chatMsg') {
                setMsgsList([...msgsList,res])
            }
        })
    })()
    const textAreachange = (e) => {
        setMsg(e.target.value)
    }
    const send = () => {
        if (!msg) {
            setNotice('请输入要发送的内容')
            setNoticeOpen(true)
            return
        }
        let data = {
            type: 'chatMsg',
            userType: 'me',
            name: 'John',
            msg: msg
        }
        console.log(msgsList)
        socket.emit('clientMsg', data)
        setMsgsList([...msgsList,data])
        setTimeout(()=>{
            console.log(msgsList)
        },100)
        
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setNoticeOpen(false);
    };
    return (
        <div className="chat">
            <div className="chat-wrapper">
                <h1 className="title">Chat</h1>
                <div className="msgs-wrapper">
                    <div className="msgs-container">
                    <div className="msgs">
                        {
                            msgsList
                                .map((item, index) => {
                                    return <Person date={item} key={index}></Person>
                                })
                        }
                    </div>
                    </div>
                </div>
                <div className="edit">
                    <textarea
                        value={msg}
                        onChange={textAreachange}
                        cols="30"
                        rows="10"></textarea>
                    <Button
                        onClick={() =>{send()}}
                        className="btn-send"
                        variant="contained"
                        color="primary">发送</Button>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={noticeOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                message={notice}
                key={'Snackbar'}
            />
        </div>
    );
}
function Person(props){
    if(props.date.userType === 'friend'){
        return(
            <div className="friend">
                <img src="https://images.pexels.com/photos/3704460/pexels-photo-3704460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="头像" />
                <div className="info">
                    <p className="name">{props.date.name}</p>
                    <p className="msg">{props.date.msg}</p>
                </div>
            </div>
        );
    }else if(props.date.userType === 'me'){
        return (
            <div className="me">
                <div className="info">
                    <p className="name">{props.date.name}</p>
                    <p className="msg">{props.date.msg}</p>
                </div>
                <img src={require('../../common/img/chat/me.jpg')} alt="头像" />
            </div>
        )
    } else {
        return null
    }

}
export default Chat
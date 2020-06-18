import React from 'react'
import io from 'socket.io-client'
import './index.scss'
// 创建socket连接，http使用ws协议，https使用wss协议

const socket = io('ws://localhost:9999', {
reconnectionAttempts: 10
})

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgsList:[]
        }
    }
    
    send(msg){
        socket.emit('clientMsg', {
            type:'chatMsg',
            userType:'me',
            name:'John',
            msg: msg
        })
    }

    componentDidMount(){
        // 接收消息
        socket.on('serverMsg', res => {
            if(res.type==='chatMsg'){
                let result = JSON.parse(JSON.stringify(this.state.msgsList))
                result.push(res)
                this.setState({
                    msglist: result
                })
            }
        })
    }

    render() {
        return (
            <div className="chat">
                <div className="chat-wrapper">
                    <h1 className="title">Chat</h1>
                    <div className="msgs-container">
                        <div className="msgs">
                        {
                            this.state.msgsList.map((item,index)=>{
                                return <Person date={item} key={index}></Person>
                            })
                        }
                        <p>{console.log(this.state)}</p>
                        </div>
                    </div>
                    <div className="edit">
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <button className="btn-send" onClick={()=>{this.send('123456')}}>发送</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}
function Person(props){
    console.log(props)
    if(props.date.type === 'friend'){
        return(
            <div className="friend">
                <img src="https://images.pexels.com/photos/3704460/pexels-photo-3704460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="头像" />
                <div className="info">
                    <p className="name">{props.date.name}</p>
                    <p className="msg">{props.date.msg}</p>
                </div>
            </div>
        );
    }else if(props.date.type === 'me'){
        return (
            <div className="me">
                <div className="info">
                    <p className="name">{props.date.name}</p>
                    <p className="msg">{props.date.msg}</p>
                </div>
                <img src={require('../../common/img/chat/me.jpg')} alt="头像" />
            </div>
        )
    }

}
export default Chat
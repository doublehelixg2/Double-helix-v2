import React from 'react'
import ReactDOM from 'react-dom'
import User from '../../scripts/User'

import {Card, Typography, TextField, Button} from '@material-ui/core'


class StreamingCheck extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData : this.props.userData,
            enabled : false, 
            otp : '',
            bedID : '',
            message : ''
        }
    }

    componentWillMount() {
        console.log(this.state.userData.patientID)
        new User().checkStreaming(this.state.userData.patientID, (result) => {
            console.log(result)
            if(!result.error && result.enabled) this.setState({enabled : true, bedID : result.bedID})
            else this.setState({enabled : false})
        })
    }

    otpLogin(otp, bedID) {
        new User().verifyOTP(otp, bedID, (result) => {
            if(result.verified) {
                console.log(result)
                this.setState({message : 'OTP verified'})
            }else this.setState({message : 'OTP not verified'})
        })
    }

    render() {

        if(!this.state.enabled)
          return (
             <div style = {{margin : '40px auto', width : '80%', padding : '20px'}}>
                 <Card style = {{width : '90%', padding : '20px', textAlign : 'center'}}>
                    <img src = "streaming.png" width = "200px" height = "200px"/>
                    <Typography variant = "h5">Streaming is not enabled at the moment</Typography>
                 </Card>
             </div>
         )
        else 
           return (
            <div style = {{margin : '40px auto', width : '80%', padding : '20px'}}>
            <Card style = {{width : '90%', padding : '20px', textAlign : 'center'}}>
                   <div style = {{margin : '40px auto'}}>
                       <TextField 
                             variant = "outlined" 
                             magin = "normal" 
                             value = {this.state.otp} 
                             type = "password"
                             onChange = {(e) => {this.setState({otp  : e.target.value})}}
                       />
                       <div style = {{margin : '20px auto'}}>
                          <Button variant = "contained" color = "secondary" onClick = {() => {
                              this.otpLogin(this.state.otp, this.state.bedID)
                          }}>Login</Button>
                       </div>
                       <div style = {{margin : '20px auto'}}>
                          <p>{this.state.message}</p>
                       </div>
                   </div>
        
            </Card>
            </div>
           )
    }
}

export default StreamingCheck
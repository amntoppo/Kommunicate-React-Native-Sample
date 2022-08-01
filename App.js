import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, NativeModule } from 'react-native';
//import {RNKommunicateChat} from 'react-native-kommunicate-chat';

var RNKommunicateChat = NativeModule.RNKommunicateChat;
export default function App() {
  this.appid = "eb775c44211eb7719203f5664b27b59f"

  // constructor() {
  //   super();
  //   this.appid = "eb775c44211eb7719203f5664b27b59f"
  // }

  loginVisitor = () => {
    RNKommunicateChat.loginAsVisitor(this.appid, (status, message) => {
      if(status == 'Success') {
        RNKommunicateChat.isLoggedIn((response) => {
            if(response == "True") {
              this.props.navigation.navigate('Home');
            } else {
              console.log("Error logging in : " + message);
            }
          });
          this.props.navigation.replace('Home');
     
      } else if (obj == 'Error') {
        console.log("Error logging in : " + message);
      }
  });
  }

  loginUser = () => {
      // if(this.state.email == '' || this.state.password == '') {
      //   console.log('Email and password cannot be empty.');
      //   return;
      // }
      
      var kmUser = {
        userId : 'aman',
        password: 'aman',
        applicationId : this.appid,  
        authenticationTypeId: 1,
        deviceApnsType : 0 
        };

        RNKommunicateChat.loginUser(kmUser, (status, message) => {
          if(status == 'Success') {
            RNKommunicateChat.isLoggedIn((response) => {
                if(response == "True") {
                  // this.props.navigation.navigate('Home');
                } else {
                  console.log("Error logging in")
                }
              });
              // this.props.navigation.replace('Home');
         
          } else if (status == 'Error') {
              console.log("Error logging in : " + message);
          }
      });
  }

  createConversation = () => {
    let kmUser = {
      'userId' : 'aman',
      'password' : 'aman'
    }
    RNKommunicateChat.buildConversation(
      {
        appId: this.appid,
        kmUser: JSON.stringify(kmUser),
        isSingleConversation: false,
        conversationInfo: JSON.stringify({
          "key1": "value1",
          "key2": "value2"
        })
      }, (status, message) => {
        console.log("Received while creating conversation, status : " + status + " and message : " + message);
    });
  }


  openConversation = () => {
    RNKommunicateChat.openConversation((status, message) => {
      if(status == 'Error') {
        console.log("Error in opening conversation : " + message);
      }
    });
  }
    logout = () => {
      RNKommunicateChat.logout((response) => {
        if(response == "Success") {
          this.props.navigation.replace('Login');
        } else {
          console.log("Error logging out");
        }
      }); 
    }

    updateUserDetails = () => {
      let date = new Date();
      RNKommunicateChat.updateUserDetails({
        email: "reytum007+" + date.getTime()%100000 + "@gmail.com",
        displayName: ("RN-" + (Platform.OS === 'android' ? "Android-" : "iOS-") + date.getTime()%100000),
        metadata: {
          'Email-ID': "reytum007+" + date.getTime()%100000 + "@gmail.com",
          'Phone number': date.getTime()%100000,
          'Platform': ("RN-" + (Platform.OS === 'android' ? "Android" : "iOS"))
        } 
      }, (status, message) => {
        console.log("Update user details, status : " + status + " and message : " + message);
      });
    }

    updateConversationAssignee = () => {
      RNKommunicateChat.updateConversationAssignee({
          clientConversationId: "58458073",
          conversationAssignee: "aman.toppo@kommunicate.io"}, (success, error) => {
            console.log("Update conversation assignee, status : " + success + " and message : " + error);
          });
    }

    updateTeamId = () => {
      RNKommunicateChat.updateTeamId({
        clientConversationId: "58458073",
        teamId: "52170696"
       }, (success, error) => {
          console.log("Update teamId, status : " + success + " and message : " + error);
        });
    }

    updateConversationInfo = () => {
      RNKommunicateChat.updateConversationInfo({
        clientConversationId: "58458073",
        conversationInfo: {
          "test1": "value1",
          "test2": "value2"
        }
      }, (success, error) => {
          console.log("Update conversation info, status : " + success + " and message : " + error);
        });
    }


  return(
    <View style={styles.maincontainer}>
      <Text style={styles.title}>kommunicate.io</Text>
      <View style={styles.inputcontainer}>
      <TextInput placeholder="userId" onChangeText={(text) => {this.setState({email: text})}} style={styles.input}></TextInput>
      <TextInput secureTextEntry={true} placeholder="password" onChangeText={(text) => {this.setState({password: text})}} style={styles.default}></TextInput>
      </View>
      <View style={styles.buttoncontainer}>
        <Button title='Login' style={styles.button} onPress={() => loginUser()} alignItems='center'/>
        <Button title='Login as Visitor' style={styles.button} onPress={() => loginAsVisitor()} alignItems='center'/>
        <Button title='Conversation Builder' style={styles.button} onPress={() => createConversation()} alignItems='center'/>
        <Button title='Open Conversation' style={styles.button} onPress={() => openConversation()} alignItems='center'/>
        <Button title='Update Team' style={styles.button} onPress={() => updateTeamId()} alignItems='center'/>
        <Button title='Update Conversation Info' style={styles.button} onPress={() => updateConversationInfo()} alignItems='center'/>
        <Button title='Update Conversation Assignee' style={styles.button} onPress={() => updateConversationAssignee()} alignItems='center'/>
        <Button title='Update User details' style={styles.button} onPress={() => updateUserDetails()} alignItems='center'/>

        <Button title='Logout' style={styles.button} onPress={() => logout()} alignItems='center'/>

        {/* <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.loginUser}><Text style={{color: 'white'}}>LOGIN</Text></TouchableOpacity></LinearGradient>
        <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.loginVisitor}><Text style={{color: 'white'}}>LOGIN AS VISITOR</Text></TouchableOpacity></LinearGradient>
        <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.createConversation}><Text style={{color: 'white'}}>Create Conversation without login</Text></TouchableOpacity></LinearGradient> */}
        <Text style={styles.infotext}>When logging in as visitor, you dont need to fill the email, name and 
        password fields. Clicking the 'Login as visitor' button will log you in with a random userId.</Text>
      </View>
      <Text style={styles.privacytext}></Text>
    </View>
        );
  // return (
  //   <View style={styles.container}>
  //     <StatusBar style="auto" />
  //     <Button
  //       title="Login"
  //       color="#f194ff"
  //       onPress={() => loginUser()}
  //     />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maincontainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 20 
  },
  title: {
    marginTop: 30,
    textAlign: "center", 
    color: '#43e97b', 
    fontSize: 20
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    padding : 0,
    fontSize: 16,
  },
  inputcontainer: {
    marginTop: 25, 
    alignItems: 'stretch',
  },
  buttoncontainer: {
    marginTop: 30,
  },
  infotext: {
    textAlign: "center",
    fontSize: 12,
    color: 'grey',
    marginStart: 6,
    marginEnd: 6,
  }, 
  privacytext: {
    
  },
  button: {
    borderRadius: 30,
    marginBottom: 8,
  }
});

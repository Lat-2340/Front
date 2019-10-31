import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { StyleSheet, View} from 'react-native';
import { Left } from 'native-base';

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2019-11-1"}
  }

  functionCombined(date){
    this.props.handler(date);
    this.setState({date: date});
  }

  render(){
    return (
     <View style = {styles.view}>
        <DatePicker
          style={styles.datepicker}
          date={this.state.date}
          mode="date"
          placeholder="When"
          format="YYYY-MM-DD"
          minDate="2019-01-01"
          maxDate="2019-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
                alignItems: "flex-start" ,
                height: 50,
                borderWidth: 1,
                borderBottomWidth: 1,
                paddingLeft: 9
            },
            placeholderText: {
                fontSize: 20,
                color: "#C7C7C7"
              },
              dateText: {
                fontSize: 16,
                color: "black",
                textAlign: "left"
              }
          }}
          onDateChange= {(date) => this.functionCombined(date)}    
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
    datepicker: {
      top: 50,
      width: 250, 
      paddingTop: 10,
      borderColor: 'gray'
    },
    
    view: {
      marginTop: 5
      
    }
  });
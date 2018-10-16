import { observer,inject } from "mobx-react";
import React from 'react';

@observer
class Num extends React.Component {

  constructor(props) {
    super(props);
    this.state = { num : ''};
  }

  getNum(len){
    len = len || 10;
    let res=[];
    for(res.length; res.length<len; ){
      let n = Math.floor(Math.random() * 10);
      if(res[res.length-1]!=n){
        res.push(n);
      }
    }
    let result = res.reduce((init, curr)=>{
      init += curr;
      return init;
    },'');

    console.log(result);    
  }

  render() {
    return (
      <div>
        <p>Num</p>
        <button onClick={()=>this.getNum()}>生成</button>
        {/* <div className="random">
          {this.state.num.toString()}
        </div> */}
      </div>
    );
  }
}

export default Num;

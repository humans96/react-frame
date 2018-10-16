import { observer } from "mobx-react";
import React from 'react';



@observer
class Random extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    Highcharts.chart('container', {
      exporting: {
        chartOptions: { // specific options for the exported image
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true
              }
            }
          }
        },
        // fallbackToExportServer: false
      },
      title: {
        text: '离线导出（浏览器端导出，无需提交数据到导出服务器）'
      },
      subtitle: {
        text: '请点击右侧导出按钮进行操作'
      },
      chart: {
        type: 'area',
        width: 1000
      }, 
      xAxis: {
        categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 126.0, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    });
  }
  render() {
    
    return (
      // <ReactHighcharts config={options} ref="chart"></ReactHighcharts>
      <div id="container"></div>
    );
  }
}

export default Random;

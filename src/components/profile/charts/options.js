export const StyleOptions = {
  plugins: {
        title: {
            display: false,
            text: 'Top Repos By Size',
            color:'black',
            backgroundColor: 'yellow',
            font: {
                size:14
            },
            responsive:true
        },
        legend : {
          position: 'left'
        }
    }
}

export const plugin = [
{
  afterDraw: function (chart) {
    //console.log(chart);
    if (chart.data.datasets[0].data.length < 1) {
      let ctx = chart.ctx;
      let width = chart.width;
      let height = chart.height;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "1rem Arial";
      ctx.fillText("No data to display", width / 2, height / 2);
      ctx.restore();
    }
  },
},
];

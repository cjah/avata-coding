(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{254:function(e,t,a){},263:function(e,t,a){"use strict";a.r(t);var r=a(0),o=a.n(r),n=a(12),s=a.n(n),l=(a(93),a(42)),c=a.n(l),i=a(75),u=a(76),h=a(77),p=a(85),d=a(78),m=a(86),v=a(79),g=a.n(v),b=a(87),w=a(43),f=(a(254),function(e){function t(){var e,a;Object(u.a)(this,t);for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return(a=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={data:null,selectedOption:"",searchSuggestionsArr:[],searchResultsArr:[],noAutoCompleteDuplicateObj:{},barData:[],barLabels:[75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],doughnutLabels:["1 book","2 books","3+ books"],doughnutData:[]},a.buildSearchSuggestionsArr=function(){for(var e=[],t={},r={},o={1:0,2:0,3:0},n=a.state.searchResultsArr,s=1;s<=n.length-1;s++)t[n[s].author]||(e.push({label:"Author: "+(n[s].author||"Anonymous"),value:n[s].author,type:"author"}),t[n[s].author]=[],r[n[s].author]=0),t[n[s].title]||(e.push({label:"Title: "+n[s].title,value:n[s].title,type:"title"}),t[n[s].title]=[]),t[n[s].review_score]||(e.push({label:"Review Score: "+n[s].review_score,value:n[s].review_score,type:"review_score"}),t[n[s].review_score]=[]),t[n[s].author].push(n[s]),t[n[s].title].push(n[s]),t[n[s].review_score].push(n[s]),r[n[s].author]++;for(var l in r)o[r[l]]++;var c=[o[1],o[2],o[3]],i=a.state.barLabels.map(function(e){return t[e]?t[e].length:0});a.setState({searchSuggestionsArr:e,noAutoCompleteDuplicateObj:t,barData:i,doughnutData:c})},a.onChangeInput=function(e){a.setState({selectedOption:e.target.value})},a.getBooks=Object(i.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=[],g.a.post("https://di37ol03g7.execute-api.us-west-2.amazonaws.com/dev/").then(function(e){for(var r=0;r<=e.data.results.length-1;r++)e.data.results[r].review_score>74&&t.push(e.data.results[r]);t.length>100&&(t.sort(function(e,t){return e.review_score<t.review_score?-1:e.review_score>t.review_score?1:0}),t.splice(100)),t.sort(function(e,t){return e.title<t.title?-1:e.title>t.title?1:0}),a.setState({searchResultsArr:t}),a.buildSearchSuggestionsArr()}).catch(function(e){console.log(e)});case 2:case"end":return e.stop()}},e)})),a.handleChange=function(e){a.setState({selectedOption:e,searchResultsArr:a.state.noAutoCompleteDuplicateObj[e.value]})},a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.getBooks().catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e=this.state.searchResultsArr.map(function(e,t){return o.a.createElement("li",{className:"row",key:t},o.a.createElement("h2",null,"Title: ",e.title," "),o.a.createElement("h2",null,"Author: ",e.author," "),o.a.createElement("h2",null,"Review Score: ",e.review_score," "),o.a.createElement("h3",null,"Book Summary"),o.a.createElement("p",null,e.summary))});return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("h1",{className:"App-title"},"Top Rated Books!")),o.a.createElement("div",{onKeyUp:this.onChangeInput},o.a.createElement(b.a,{value:this.state.selectedOption,onChange:this.handleChange,options:this.state.searchSuggestionsArr})),o.a.createElement("button",{className:"btn green",onClick:this.getBooks},"Refresh Books Results"),o.a.createElement("div",{className:"container"},o.a.createElement("h2",null,"Books Review Score Bar Graph"),o.a.createElement(w.a,{data:{labels:this.state.barLabels,datasets:[{label:"Books with this review score",backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:1,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",data:this.state.barData}]},width:100,height:50,options:{maintainAspectRatio:!0,scales:{xAxes:[{}],yAxes:[{ticks:{stepSize:1}}]}}})),o.a.createElement("div",{className:"container"},o.a.createElement("h2",null,"Authors With 75+ Review Score Have"),o.a.createElement(w.b,{data:{labels:this.state.doughnutLabels,datasets:[{data:this.state.doughnutData,backgroundColor:["#FF6384","#36A2EB","#FFCE56"],hoverBackgroundColor:["#FF6384","#36A2EB","#FFCE56"]}]}})),o.a.createElement("div",null,o.a.createElement("ol",null,e)))}}]),t}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},88:function(e,t,a){e.exports=a(263)},93:function(e,t,a){}},[[88,1,2]]]);
//# sourceMappingURL=main.77e39fe5.chunk.js.map
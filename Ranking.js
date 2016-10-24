var Data = React.createClass({
	render : function(){
		var userdate = this.props.date.map(function(val,index){
			return (
				<tr>
					<td>{index + 1}</td>
					<td className="user"><a href={"https://www.freecodecamp.com/"+val.username}><img src={val.img}/>{val.username}</a></td>
					<td>{val.recent}</td>
					<td>{val.alltime}</td>
				</tr>
			)
		});
		return <tbody>{userdate}</tbody>
	},
});
var Table = React.createClass({
	getInitialState: function(){
		return {
			userdate: [],
		}
	},
	ajax: function(urlval){
		var recent = new XMLHttpRequest();
		var url = "https://fcctop100.herokuapp.com/api/fccusers/top/"+urlval;
		recent.open("GET",url);
		recent.responseType="json";
		recent.send(null);
		recent.onload=function(){
			var date = recent.response;
			this.setState({
				userdate: date
			})
		}.bind(this)
	},
	componentDidMount: function(){
		this.ajax("recent");
	},
	render: function(){
		return (
			<table>
				<thead>
					<tr>
						<th className="No">序号</th>
						<th className="username">用户</th>
						<th ref="recent" className="point30d" onClick={this.ajax.bind(this,"recent")}>30天分数</th>
						<th ref="alltime" className="pointall" onClick={this.ajax.bind(this,"alltime")}>总共分数</th>
					</tr>
				</thead>
				<Data date={this.state.userdate} />
			</table>
		)
	}
});
ReactDOM.render(
	<Table />,
	document.body
)
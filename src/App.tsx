import { Vue ,Component } from 'vue-property-decorator';
import './style/index.less'

@Component
export default class App extends Vue{
	render(){
		return (
			<div id="app">
        <router-view></router-view>
      </div>
		)
	}
}
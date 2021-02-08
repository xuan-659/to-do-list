import "../style/index.less";
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Index extends Vue {
  current() {
    const link = document.querySelectorAll(".link-color");
    // console.log(this.$el.firstChild?.baseURI);
    if (this.$el.firstChild?.baseURI == "http://localhost:8080/progress") {
      link[0].classList.add("current");
      link[1].classList.remove("current");
    } else {
      link[1].classList.add("current");
      link[0].classList.remove("current");
    }
  }

  render() {
    return (
      <div>
        <el-row class="header">
          <el-col span={4} offset={8}>
            <div class="font-center grid-content-left" onClick={this.current}>
              <router-link class="link-color current" to="/progress">
                progress
              </router-link>
            </div>
          </el-col>
          <el-col span={4}>
            <div class="font-center grid-content-right" onClick={this.current}>
              <router-link class="link-color" to="/compete">
                compete
              </router-link>
            </div>
          </el-col>
        </el-row>
        <el-row class="main">
          <el-col span={8} offset={8}>
            <div class="content">
              <router-view></router-view>
            </div>
          </el-col>
        </el-row>
      </div>
    );
  }
}

import { Vue, Component } from "vue-property-decorator";
import "../style/content.less";
@Component
export default class Progress extends Vue {
  public todo: Array<string | any> = [];
  public com: Array<string | any> = [];

  saveDate(todo: Array<string | any>, com: Array<string | any>) {
    localStorage.setItem(
      "todo",
      JSON.stringify(todo.filter((item) => item != null))
    );
    localStorage.setItem(
      "com",
      JSON.stringify(com.filter((item) => item != null))
    );
  }

  getDate(str: string) {
    const list = localStorage.getItem(str);
    if (list !== null) {
      // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
      return JSON.parse(list);
    } else {
      return [];
    }
  }

  addToDoItem() {
    this.$prompt("please input ToDo", "ToDoList", {
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
      .then((data: any) => {
        console.log(data.value);
        const todo = this.getDate("todo");
        const com = this.getDate("com");

        todo.push({ title: data.value, favorites: "no", done: "no" });
        this.saveDate(todo, com);
        // this.$forceUpdate();
        location.reload();

        // console.log(local);
        this.$message({
          type: "success",
          message: "success",
        });
      })
      .catch(() => {
        // console.log(e);

        this.$message({
          type: "info",
          message: "Cancel",
        });
      });
  }

  modifyItem(e: any) {
    // console.log(e.target);
    const index: number = e.target.getAttribute("index");
    // console.log(index);
    // e.target.setAttribute('done','false')
    const done: string = e.target.getAttribute("done");
    // console.log(done);

    // console.log(e.target);
    const todo = this.getDate("todo");
    const com = this.getDate("com");

    if (done == "no") {
      const item = todo[index];
      console.log(item);
      
      delete todo[index];
        if(item.favorites == 'no'){
          // item.favorites = 'yes';
          com.push(item);
        }
        else {
          // item.favorites = 'no';
          com.unshift(item)
  
        }
        } else {
            const item = com[index];
            delete com[index];
            // console.log(index);
            
            console.log(item);
            
              if(item.favorites == 'no'){
                item.favorites = 'yes';
                com.unshift(item);
              }
              else {
                item.favorites = 'no';
                todo.push(item)
        
              }
      }

    this.saveDate(todo, com);
    location.reload();
  }

  deleteItem(e: any) {
    // this.$message({
    //   type: 'warning',
    //   message: 'deleted',
    // })
    // console.log(111);

    //  console.log(e.target.siblings('input'));
    const index: number = e.target.previousElementSibling.previousElementSibling.getAttribute(
      "index"
    );
    console.log(index);
    // e.target.setAttribute('done','false')
    const done: string = e.target.previousElementSibling.previousElementSibling.getAttribute(
      "done"
    );
    console.log(done);

    // console.log(e.target);
    const todo = this.getDate("todo");
    const com = this.getDate("com");

    if (done == "no") {
      delete todo[index];
    } else {
      delete com[index];
    }

    this.saveDate(todo, com);
    location.reload();
    // this.load();
  }

  favorites(e: any) {
    const index: number = e.target.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute(
      "index"
    );
    console.log(index);
    // e.target.setAttribute('done','false')
    const done: string = e.target.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute(
      "done"
    );
    console.log(done);

    // console.log(e.target);
    const todo = this.getDate("todo");
    const com = this.getDate("com");
    
    if (done == "no") {
    const item = todo[index];
    delete todo[index];
      if(item.favorites == 'no'){
        item.favorites = 'yes';
        todo.unshift(item);
      }
      else {
        item.favorites = 'no';
        todo.push(item)

      }
      } else {
          const item = com[index];
          delete com[index];
          console.log(com);
          
          // console.log(index);
          
          console.log(item);
          
            if(item.favorites == 'no'){
              item.favorites = 'yes';
              com.unshift(item);
            }
            else {
              item.favorites = 'no';
              todo.push(item)
      
            }
    }

    this.saveDate(todo, com);
    location.reload();
  }

  load() {
    this.todo = this.getDate("todo");
    this.com = this.getDate("com");
    // this.i = [{a:1,b:2},{c:3,d:4,b:2},{e:5,b:2}];
    // console.log(this.data);
  }
  render() {
    return (
      <div>
        {/* {this.current} */}
        <ol id="todolist">
          {this.load()}
          {this.todo.map((item, index) => {
            // console.log(item);
            return (
              <li favorites={item.favorites}
              >
                <input
                  type="checkbox"
                  done={item.done}
                  index={index}
                  onClick={this.modifyItem}
                />
                <span>{item.title}</span>
                <em class="delete" onClick={this.deleteItem}></em>
                <em class="favorites" onClick={this.favorites}></em>
              </li>
            );
          })}
        </ol>
        <div class="el-icon-plus" onClick={this.addToDoItem}></div>
        {/* <div class="el-icon-plus" onClick={this.increase}></div> */}
      </div>
    );
  }
}

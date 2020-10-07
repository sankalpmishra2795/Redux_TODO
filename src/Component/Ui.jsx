import React, { Component } from 'react';
import { addTodo } from '../Redux/Action';
import { complet } from '../Redux/Action';
import { remove } from '../Redux/Action';
import { store } from '../Redux/Store';
import Swal from 'sweetalert2';
class Ui extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      flag: false,
    };
  }
  handler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  add = () => {
    let obj = {
      id: Date.now(),
      text: this.state.name,
      isCompleted: false,
    };
    if (this.state.name == '') {
      Swal.fire('Please Enter Something');
    } else {
      store.dispatch(addTodo(obj));
      this.setState({
        name: '',
      });
    }
  };
  removeData = (id) => {
    store.dispatch(remove(id));
  };
  completTask = (id) => {
    store.dispatch(complet(id));
  };

  render() {
    let completArr = [];
    let inCompletArr = [];
    let todoArr = store.getState().arr;
    todoArr.map((ele) => {
      console.log(ele);
      if (ele.isCompleted) {
        completArr.push(ele);
      } else {
        inCompletArr.push(ele);
      }
      return ele;
    });
    return (
      <div className="">
        <nav className="navbar-dark bg-dark text-center p-3">
          <i class="fas fa-book-open bg-light fa-2x mx-4 p-1"></i>
          <span className="" style={{ color: '#fff', fontSize: 'large' }}>
            To Do List
          </span>
          <i class="fas fa-book-open bg-light fa-2x mx-4 p-1"></i>
        </nav>
        <div
          className="container text-center mx-auto mt-3"
          style={{ width: '400px' }}
        >
          <div
            className="card border-info text-center"
            style={{ width: '400px' }}
          >
            <div className="card-body">
              <h5 className="card-title">Add To Do</h5>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.handler}
              ></input>
              <button
                type="button"
                className="btn btn-dark mt-4"
                onClick={this.add}
              >
                Add
              </button>
              <div className="text-left mt-3">
                {inCompletArr.map((ele, i) => {
                  return (
                    <div key={ele.id} className="m-1">
                      {i === 0 ? (
                        <h4 className="text-center">Task List</h4>
                      ) : (
                        ''
                      )}
                      <div className="d-flex justify-content-between">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                          className="mx-2"
                          onClick={() => this.completTask(ele.id)}
                        />
                        <span>{ele.text} </span>
                        <button
                          value={ele.id}
                          onClick={() => this.removeData(ele.id)}
                          className="btn-warning"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-left mt-3">
                {completArr.map((ele, i) => {
                  return (
                    <div key={ele.id}>
                      {i === 0 ? (
                        <h4 className="text-center">Task Completed</h4>
                      ) : (
                        ''
                      )}
                      <div className="d-flex justify-content-between">
                        {/* <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                          className="mx-2"
                          value={ele.id}
                        /> */}
                        <strike trick className="success">
                          {ele.text}
                        </strike>
                        <button
                          value={ele.id}
                          onClick={() => this.removeData(ele.id)}
                          className="btn-success mt-3"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ui;

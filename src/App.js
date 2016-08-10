import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: [
      {name: "Cooper", breed: "Havapoo", age: 3, id: 1},
      {name: "Nelly", breed: "Goldendoodle", age: 2, id: 2},
      {name: "Shayna", breed: "Maltirat", age: 1000, id: 3},
    ]
  }
  handleSubmit = (dog) => {
    console.log('from handleSubmit', dog);
    var dogs = this.state.data;
    dog.age = dog.dog.age;
    dog.breed = dog.dog.breed;
    dog.name = dog.dog.name;
    dog.id = this.state.data.length + 1;
    var newDogs = dogs.concat([dog])
    this.setState({data: newDogs})
  }
  handleClearDogList = () => {
    this.setState({data: []});
  }
  componentWillMount = () => {
  }
  componentDidMount = () => {
  }
  deleteDog = (name) => {
    console.log('running from deleteDog in App component', name)
  }
  editDog = (dog) => {
    console.log('edit dog', dog)
  }
  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Dogs data={this.state.data} onClearList={this.handleClearDogList} handleDeleteDog={this.deleteDog} handleSaveDog={this.editDog}/>
        <DogForm onDogSubmit={this.handleSubmit}/>
      </div>
    );
  }
}




class Dogs extends Component {
  handleClearClick = (event) => {
    this.props.onClearList();
  }
  render () {
    var dogs = this.props.data.map((dog) => {
      return (
          <Dog name={dog.name} breed={dog.breed} age={dog.age} key={dog.id} onHandleDelete={this.props.handleDeleteDog} onHandleSave={this.props.handleSaveDog}></Dog>
      )
    });
    return (
      <div>
        <h1>These are my dogs!</h1>
        <table className="dog-table">
          <DogTableHeader />
          <tbody>
            {dogs}
          </tbody>
        </table>
        <div>
          <button onClick={this.handleClearClick}>Clear Dog List</button>
        </div>
      </div>
    )
  }
};

class DogTableHeader extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th className="dog-table-header">Name</th>
          <th className="dog-table-header">Breed</th>
          <th className="dog-table-header">Age</th>
          <th className="dog-table-header">Actions</th>
        </tr>
      </thead>
    );
  }
}

class Dog extends Component {
  state = {
    color: 'blue',
    isEditing: false
  }
  handleClick = (event) => {
    if (this.state.color === 'blue') {
      this.setState({color: 'red'});
    } else if (this.state.color === 'red') {
      this.setState({color: 'blue'});
    }
  }
  handleEdit = () => {
    this.setState({
      isEditing: true
    });
  }
  handleSave = () => {
    console.log('handling save', this.refs)
    let dog = {
      name: this.refs.editName.value,
      breed: this.refs.editBreed.value,
      age: this.refs.editAge.value,
    }
    this.props.onHandleSave(dog)
  }
  handleCancel = () => {
    this.setState({
      isEditing: false
    });
  }
  renderDogName = () => {
    if (this.state.isEditing === true) {
      return (
        <td><input type="text" defaultValue={this.props.name} ref="editName"></input></td>
      );
    }
    return (
      <td>{this.props.name}</td>
    )
  }
  renderDogBreed = () => {
    if (this.state.isEditing === true) {
      return (
        <td><input type="text" defaultValue={this.props.breed} ref="editBreed"></input></td>
      );
    }
    return (
      <td className={this.state.color} onClick={this.handleClick}>{this.props.breed}</td>
    );
  }
  renderDogAge = () => {
    if (this.state.isEditing === true) {
      return (
        <td><input type="text" defaultValue={this.props.age} ref="editAge"></input></td>
      );
    }
    return (
      <td className={this.state.color} onClick={this.handleClick}>{this.props.age}</td>
    );
  }
  renderActionSection() {
    if (this.state.isEditing === false) {
      return (
        <td>
          <button onClick={this.handleEdit}>Edit Dog</button>
          <button onClick={() => this.handleDelete(this.props.name)}>Delete Dog</button>
        </td>
      );
    }
    return (
      <td>
        <button onClick={this.handleSave}>Save Dog</button>
        <button onClick={this.handleCancel}>Cancel</button>
      </td>
    );
  }
  handleDelete = (name) => {
    console.log('running from onHandleDelete', name)
    this.props.onHandleDelete(name);
  }
  render () {
    return (
      <tr>
        {this.renderDogName()}
        {this.renderDogBreed()}
        {this.renderDogAge()}
        {this.renderActionSection()}
      </tr>

    );
  }
};

class DogForm extends Component {
  state = {
    name: '',
    breed: '',
    age: ''
  }
  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }
  handleBreedChange = (event) => {
    this.setState({breed: event.target.value});
  }
  handleAgeChange = (event) => {
    this.setState({age: event.target.value});
  }
  handleNewDog = (event) => {
    event.preventDefault();
    let dog = this.state;
    this.props.onDogSubmit({dog}); // sends dog object up to handleSubmit func in App component
    this.setState({name: '', breed: '', age: ''})
  }
  render () {
    return (
      <form className="dog-form" onSubmit={this.handleNewDog}>
        <h4> Do you want to add a dog? </h4>
        <input type="text" placeholder="Dog Name" value={this.state.name} onChange={this.handleNameChange}/>
        <br />
        <input type="text" placeholder="Dog Breed" value={this.state.breed} onChange={this.handleBreedChange}/>
        <br />
        <input type="text" placeholder="Dog Age" value={this.state.age} onChange={this.handleAgeChange}/>
        <br />
        <input type="submit" value="Post" />
      </form>
    )
  }
};

export default App;

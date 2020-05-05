import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  );
}

const Content = (props) => {
  const parts = [];

    props.course.parts.forEach(element => {
      parts.push(<Part courseName={element.name} amountOfExercises={element.exercises} />)
    });

    return(
      <div>
        {parts}
      </div>
    );

}

const Part = (props) => {
  return(
    <p>{props.courseName} {props.amountOfExercises}</p>
  );
}

const Total = (props) => {
  let total = 0;
  props.course.parts.forEach(element => {
    total += element.exercises;
  });

  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  } 

  return (
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
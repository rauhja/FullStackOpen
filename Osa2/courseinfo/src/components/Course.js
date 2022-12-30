const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => {
    return (
    <div>
        {course.map(part =>
            <Part key={part.id} part={part} />
        )}
    </div>
    )
}

const Total = ({ course }) => {
    const total = course.reduce((total, amount) => total + amount.exercises, 0)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = ({ courses }) => {
    return (
        courses.map(course =>
            <div key={course.id}>
                <Header course={course.name} />
                <Content course={course.parts} />
                <Total course={course.parts} />
            </div>
        )
    )
}

export default Course
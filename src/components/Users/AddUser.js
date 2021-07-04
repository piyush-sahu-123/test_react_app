import { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function Adduser(props) {
	const [enteredUsername, setEnteredUsername] = useState("");
	const [enteredAge, setEnteredAge] = useState("");
  const [error,setError]=useState();

	const addUserHandler = (event) => {
		event.preventDefault();
		if (
			enteredUsername.trim().length === 0 ||
			enteredAge.trim().length === 0
		) {
      setError({
        title:'invalid input',
        message:'enter valid name and age',
      })
			return;
		}
		if (+enteredAge < 1) {
      setError({
        title:'invalid age',
        message:'enter valid age (>0)',
      })
			return;
		}
		props.onAddUsers(enteredUsername, enteredAge);

		setEnteredAge("");
		setEnteredUsername("");
	};

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value);
	};

	const ageChangeHandler = (event) => {
		setEnteredAge(event.target.value);
	};
  const errorHandler=()=>{
    setError(null);
  }
	return (
		<div>
			{error && <ErrorModal
				title={error.title}
				message={error.message}
        onConfirm={errorHandler}
			/>}
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						value={enteredUsername}
						onChange={usernameChangeHandler}
					/>
					<label htmlFor="age">Age</label>
					<input
						id="age"
						type="number"
						value={enteredAge}
						onChange={ageChangeHandler}
					/>
					<Button type="submit">Add user</Button>
				</form>
			</Card>
		</div>
	);
}
export default Adduser;

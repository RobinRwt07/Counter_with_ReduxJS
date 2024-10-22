import { useState } from "react"
import styles from "./Counter.module.css"
import { store } from "../../app/store"
import { increment, decreament, incrementByAmount, increamentIfOdd, incrementAsync, selectCount, selectStatus } from "./counterSlice";
import { useDispatch, useSelector } from "react-redux";


export const Counter = () => {
	// when we dispatch an action. redux store call the reducer and updated the state value base on the action type and old state.
	// and when redux root state updated useSelector hook re-run the selector function which return a value.
	// if value return by selector function is diffrenet them the last time. then useSeletor function ensure that the component re-render.
	const count = useSelector(selectCount);
	const status = useSelector(selectStatus);


	const dispatch = useDispatch();  // return dispatch function from redux store
	const [incrementAmount, setIncrementAmount] = useState("2")
	const incrementValue = Number(incrementAmount) || 0;

	return (
		<div>
			{console.log(store.getState())}
			<div className={styles.row}>
				<button
					className={styles.button}
					aria-label="Decrement value"
					onClick={() => { dispatch(decreament()) }}
				>
					-
				</button>
				<span aria-label="Count" className={styles.value}>
					{count}
				</span>
				<button
					className={styles.button}
					aria-label="Increment value"
					onClick={() => {
						dispatch(increment());
					}}
				>
					+
				</button>
			</div>
			<div className={styles.row}>
				<input
					className={styles.textbox}
					aria-label="Set increment amount"
					value={incrementAmount}
					type="number"
					onChange={e => {
						setIncrementAmount(e.target.value)
					}}
				/>
				<button
					className={styles.button}
					onClick={() => {
						dispatch(incrementByAmount(incrementValue))
					}}
				>
					Add Amount
				</button>
			</div>
			<div className={styles.row}>
				<button
					className={styles.asyncButton}
					disabled={status !== "idle"}
					onClick={() => {
						dispatch(incrementAsync(incrementValue))
					}}
				>
					Add Async
				</button>
				<button
					className={styles.oddButton}
					onClick={() => {
						dispatch(increamentIfOdd(incrementValue))
					}}
				>
					Add If Odd
				</button>
			</div>
		</div>
	)
}

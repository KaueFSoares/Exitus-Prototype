import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid"

import { ILog, IPerson, IOnChangeData, TDate, TDateForAge, TDateForLeave } from "../../../types/types"

import "./coderegister.sass"

function CodeRegister() {

	//Global variabel to storage the message and message type
	const [message, setMessage] = useState<string>("")
	const [messageType, setMessageType] = useState<"success" | "fail">("success")
	//-----------------------------------------------------------------------------------//



	//Global date variable for the functions
	var firstDate: Date = new Date()
	const [systemDate, setSystemDate] = useState<Date>(firstDate)

	useEffect(() => {
		setTimeout(() => {

			let date: Date = new Date()

			setSystemDate(date)

		}, 60000)
	}, [systemDate])
	//-----------------------------------------------------------------------------------//



	//Setting the focus to always go on the input
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current!.focus()
	}, [])
	//-----------------------------------------------------------------------------------//



	//Getting the value from the input whenever it changes using the on change on the input element
	const [code, setCode] = useState<string>("null")
	//-----------------------------------------//



	//Run the register function when the input value length gets to 36 - the uuidv4 size
	useEffect(() => {
		if (code.length > 35) {

			register()

		}
	}, [code])
	//-----------------------------------------------------------------------------------//



	//Register function
	async function register() {
		var data: IPerson | undefined = await loadData(code)

		if (data) {

			if (data.onSchool === true) {

				//apply the rules for leaving

				if (canLeave(data) === true) {

					data.onSchool = !data.onSchool

					let localLog: ILog = {
						id: uuidv4(), createdAt: {
							day: systemDate.getDate(),
							month: systemDate.getMonth() + 1,
							year: systemDate.getFullYear(),
							hour: systemDate.getHours(),
							min: systemDate.getMinutes()
						}
					}

					data.logs.push(localLog)

					fetch(`http://localhost:5001/person/${code}`, {
						method: "PATCH",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify(data)
					})
						.then((resp) => resp.json())
						.then(() => {

							reloadPage()

						})
						.catch(err => {
							setMessage(`Exit denied due to: ${err}`)
							setMessageType("fail")
							reloadPage()
						})

				}


			} else {

				//apply the rules for entering

				if (canEnter(data) === true) {

					data.onSchool = !data.onSchool

					let localLog: ILog = {
						id: uuidv4(), createdAt: {
							day: systemDate.getDate(),
							month: systemDate.getMonth() + 1,
							year: systemDate.getFullYear(),
							hour: systemDate.getHours(),
							min: systemDate.getMinutes()
						}
					}

					data.logs.push(localLog)

					fetch(`http://localhost:5001/person/${code}`, {
						method: "PATCH",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify(data)
					})
						.then((resp) => resp.json())
						.then(() => {


							reloadPage()

						})
						.catch(err => {
							setMessage(`Exit denied due to: ${err}`)
							setMessageType("fail")
							reloadPage()
						})

				}

			}

		}

	}
	//-----------------------------------------------------------------------------------//



	//Function for loading person data from the database for cheking if it can go in or out of the school on the moment
	async function loadData(id: string) {
		const res = await fetch(`http://localhost:5001/person/${id}`)
		const data: IPerson = await res.json()

		if (data.id) {
			return data
		} else {
			setMessage(`Exit denied due to: problem on reading the code or invalid id!`)
			setMessageType("fail")
			reloadPage()
		}
	}
	//-----------------------------------------------------------------------------------//



	//Function for cheking if the person can LEAVE the school
	function canLeave(data: IPerson) {

		let nowDate: TDateForLeave = {
			hour: systemDate.getHours(),
			min: systemDate.getMinutes()
		}

		if (data.shift === "morning") {

			if (nowDate.hour > 12) {
				setMessage("Exit approved!")
				setMessageType("success")
				return true
			} else if (nowDate.hour === 12 && nowDate.min >= 15) {
				setMessage("Exit approved!")
				setMessageType("success")
				return true
			} else {

				if (checkAge(data.dateOfBirth) === true) {
					setMessage("Exit approved!")
					setMessageType("success")
					return true
				} else if (data.permissionToLeaveEarly === true) {
					setMessage("Exit approved!")
					setMessageType("success")
					return true
				} else {
					setMessage("Exit denied due to it is not 12:15 and you have no permission to leave earlier!")
					setMessageType("fail")
					reloadPage()
				}
			}

		} else if (data.shift === "afternoon") {

			if (nowDate.hour > 18) {
				setMessage("Exit approved!")
				setMessageType("success")
				return true
			} else if (nowDate.hour === 18 && nowDate.min >= 15) {
				setMessage("Exit approved!")
				setMessageType("success")
				return true
			} else {

				if (checkAge(data.dateOfBirth) === true) {
					setMessage("Exit approved!")
					setMessageType("success")
					return true
				} else if (data.permissionToLeaveEarly === true) {
					setMessage("Exit approved!")
					setMessageType("success")
					return true
				} else {
					setMessage("Exit denied due to it is not 12:15 and you have no permission to leave earlier!")
					setMessageType("fail")
					reloadPage()
				}
			}

		} else {

			//--------------------------------------------------------------//

			//THE VALIDATION MOST BE CHANGED FOR THE NIGHT SHIFT LEAVING TIME

			//--------------------------------------------------------------//

			if (nowDate.hour > 18) {
				setMessage("Exit approved!")
				setMessageType("success")
				return true
			} else if (nowDate.hour === 18 && nowDate.min >= 15) {
				setMessage("Exit approved!")
				setMessageType("success")
				return true
			} else {

				if (checkAge(data.dateOfBirth) === true) {
					setMessage("Exit approved!")
					setMessageType("success")
					return true
				} else if (data.permissionToLeaveEarly === true) {
					setMessage("Exit approved!")
					setMessageType("success")
					return true
				} else {
					setMessage("Exit denied due to it is not 12:15 and you have no permission to leave earlier!")
					setMessageType("fail")
					reloadPage()
				}
			}

		}
	}
	//-----------------------------------------------------------------------------------//



	//Function for cheking if the person can ENTER the school
	function canEnter(data: IPerson) {

		let nowDate: TDateForLeave = {
			hour: systemDate.getHours(),
			min: systemDate.getMinutes()
		}

		if (data.shift === "morning") {

			if (nowDate.hour > 6) {
				setMessage("Acess approved!")
				setMessageType("success")
				return true
			} else if (nowDate.hour === 6 && nowDate.min >= 30) {
				setMessage("Acess approved!")
				setMessageType("success")
				return true
			} else {

				if (data.permissionToEnterOnOtherShift === true) {
					setMessage("Acess approved!")
					setMessageType("success")
					return true
				} else {
					setMessage("Acess denied due tue it is not your shift!")
					setMessageType("fail")
					reloadPage()
				}
			}

		} else if (data.shift === "afternoon") {

			if (nowDate.hour > 12) {
				setMessage("Acess approved!")
				setMessageType("success")
				return true
			} else if (nowDate.hour === 12 && nowDate.min >= 30) {
				setMessage("Acess approved!")
				setMessageType("success")
				return true
			} else {

				if (data.permissionToEnterOnOtherShift === true) {
					setMessage("Acess approved!")
					setMessageType("success")
					return true
				} else {
					setMessage("Acess denied due tue it is not your shift!")
					setMessageType("fail")
					reloadPage()
				}
			}

		} else {

			//--------------------------------------------------------------//

			//THE VALIDATION MOST BE CHANGED FOR THE NIGHT SHIFT ENTERING TIME

			//--------------------------------------------------------------//

			if (nowDate.hour > 18) {
				setMessage("Acess approved!")
				setMessageType("success")
				return true
			} else if (nowDate.hour === 18 && nowDate.min >= 30) {
				setMessage("Acess approved!")
				setMessageType("success")
				return true
			} else {

				if (data.permissionToEnterOnOtherShift === true) {
					setMessage("Acess approved!")
					setMessageType("success")
					return true
				} else {
					setMessage("Acess denied due tue it is not your shift!")
					setMessageType("fail")
					reloadPage()
				}
			}

		}

	}
	//-----------------------------------------------------------------------------------//



	//Function for the the person age - returns true for > 18 year and false for < 18 year
	function checkAge(dateOfBirth: TDateForAge) {
		let nowDate: TDateForAge = {
			day: systemDate.getDate(),
			month: systemDate.getMonth() + 1,
			year: systemDate.getFullYear()
		}

		if ((nowDate.year - dateOfBirth.year) < 18) {
			return false
		} else if ((nowDate.year - dateOfBirth.year) > 18) {
			return true
		} else if ((nowDate.month - dateOfBirth.month) > 0) {
			return true
		} else if ((nowDate.month - dateOfBirth.month) < 0) {
			return false
		} else if ((nowDate.day - dateOfBirth.day) >= 0) {
			return true
		} else {
			return false
		}
	}
	//-----------------------------------------------------------------------------------//



	//Function to show the result message and reload the page
	const [showResultMessage, setShowResulteMessage] = useState<boolean>(false)
	function reloadPage() {

		setShowResulteMessage(true)

		setTimeout(() => {
			window.location.reload()
		}, 5000)

	}
	//-----------------------------------------------------------------------------------//




	return (
		<>
			{showResultMessage ? (
				<div className={`result-box ${["type-" + messageType]}`}>
					<p>{message}</p>
				</div>
			) : (
				<input
					type='text'
					id='code-input'
					maxLength={36}
					placeholder='Scan the QR code'
					ref={inputRef}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setCode(e.target.value)
					}}
				/>
			)}
		</>
	)
}

export default CodeRegister
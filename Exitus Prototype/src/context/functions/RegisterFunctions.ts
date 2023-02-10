import React, { useState, useRef, useEffect } from 'react'
import { ILog, IPerson, TDateForAge, TDateForLeave } from "../../types/types"

//Function for check the person age - returns true for > 18 year and false for < 18 year
export function checkAge(dateOfBirth: TDateForAge, systemDate: Date) {
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
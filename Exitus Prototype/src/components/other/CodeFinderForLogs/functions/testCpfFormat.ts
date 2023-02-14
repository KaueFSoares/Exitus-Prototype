export default function testCpfFormat(cpfValue: string) {
    cpfValue = cpfValue.replace(/\D/g, '')

    if (cpfValue.length === 11) {

        //turns the cpf into an array
        const array = Array.from(String(cpfValue), num => Number(num))

        //variables for counting and keeping the sum
        let counter = 10
        let sum = 0;

        //makes the sum from the first 9 digits multiplied by the counter
        for (let i = 0; i < 9; i++) {
            sum += array[i] * counter
            counter--
        }

        // if sum divided by 11 is equal to 0 or 1, the last but one digit will be 0 either it will be the 11 - the rest of sum / 11
        const testOne = (sum % 11 === 0 || sum % 11 === 1) ? 0 : 11 - (sum % 11)

        //reset the counter and sum
        counter = 10
        sum = 0

        if (testOne === array[9]) {

            //makes the sum from the seccond to the 10th digit multipling by the counter
            for (let i = 1; i < 10; i++) {
                sum += array[i] * counter
                counter--
            }

            // if sum divided by 11 is equal to 0 or 1, the last digit will be 0 either it will be the 11 - the rest of sum / 11
            const testTwo = (sum % 11 === 0 || sum % 11 === 0) ? 0 : 11 - (sum % 11)

            if (testTwo === array[10]) {
                return true
            }

        }

    }

    return false
}
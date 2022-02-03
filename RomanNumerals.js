
function romanNumerals(num) {

   
    /**
     * we take the fundamental decimal numbers which would be converted to roman numerals
     * the fundamental decimal numbers are 1,5,10,50,100,500,1000
     * Between 1 to 5 we have I,II,III,IV,V
     * moving from 1 towards 5, gives us 2 and 3
     * but 4 is a little different
     * we do (5-1) to get 4
     * now when we move from 5 to 10 with +1, we reach from 5 to 8, and the steps are simple
     * but for 9 we have to use 10(for this fundamental decimal number there exists roman numeral)
     * finally 4,9 have been taken into consideration though not in the fundamental decimal numbers, and added to the array named decimal
     * again 40 is not a fundamental decimal number, it is built by using 50 and 10, (50-10) to get 40
     * Now, 20 and 30 are XX and XXX respectively, but they are not required to be added in the array because they are being built using 10
     * Similar to 40, 90 has been built with the influence of 100 and 10
     * the rest of the numbers like 400,900 have been built using 100 and 500,1000 respectively
     */
    var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    /**
     * corrsponding to the above decimal numbers, we pre-define the roman numerals
     */
    var fraction = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

     /**
     * we take an empty string called roman
     */

      var roman = ''; 

    /**
     * we take the example of 99
     * so 99 is greater than 0
     * while 99 is greater than decimal[0]=1000 which is not the case, so we move on to i=1 and later i=7
     * when i=7, we get the roman numeral for the decimal number, 90, from the array fraction.
     * We store that value in the the variable named roman. This variable is an empty string. So roman=90 now
     * now we continue to the next step where we see num=num-decimal[i]. here num=99 initially and decimal[7]=90 so new num=9
     * Thus we found that i=7, so num=99-decimal[5]=9
     * Now, we move move out of the while loop, but make i=8 and for i=8 we wont get anything because the value of 100 exists and that cannot be used to build 9
     * we get out of the while loop altogether and start from 0
     * with i=0, we wont get anything but with i=3 we have num=decimal[3] and voila!
     * we add to the roman which was XC till now and now XCIX
    */

    

    var i = 0;
    while (num > 0) {
        while (num >= decimal[i]) {
            roman += fraction[i];
            num -= decimal[i];
        }
        i++;
    }
    return roman;
}
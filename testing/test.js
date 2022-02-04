const{romanNumerals}=require('./index');


let result,expected

result=romanNumerals(676);
expected= "DCLXXVI"

//simple if else way to do testing

if(result===expected){
    console.log("Test Passed")
}else{
    console.log("Test Failed")
}

// the above way of testing is not good enough, we need to use a test framework like jest
test('testing romanNumerals function', () => {
    expect(romanNumerals(676)).toBe("DCLXXVI");
});

test('testing the function to convert from decimal to roman::unhappy path', () => {
    expect(romanNumerals(676)).toBe("");
});

test('testing the function to convert from decimal to roman::happy path', () => {
    expect(romanNumerals(676)).toBe("DCLXXVI");
});

function test(title, callback){
    try{
        callback();
        console.log(`${title} test passed`);
    }catch(error){
        console.log(`${title} test failed`);
    }
}

function expect(actual){
    return {
        toBe: function(expected){
            if(actual !== expected){
                throw new Error(`${actual} is not equal to ${expected}`);
            }
        }
    }
}
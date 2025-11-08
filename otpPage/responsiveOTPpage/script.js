const inputs = document.querySelectorAll(".otp input");

inputs.forEach((inp,i)=>{
    inp.addEventListener("input", ()=>{
        if(inp.value && i < 3){
            inputs[i+1].focus();
        }
    })

    // backspace delete inputs
    inp.addEventListener("keydown", (e)=>{
        if(e.key == "Backspace" && !inp.value && i >0){
            inputs[i-1].focus();
        }
    })
})
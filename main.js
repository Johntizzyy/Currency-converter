const select = document.querySelector("select");

document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector("select");
  const result = document.querySelector("div");
  let option;
  try {
    //Working on the api
    const button = (document.getElementById("bttn").disabled = true);

    // if ((document.getElementById("bttn").disabled = true)) {
    //     document.getElementById("bttn").style.backgroundColor = "#4f6dac";
    //     document.getElementById("bttn").style.color = "#fff";
    // } else {
    //     document.getElementById("bttn").style.backgroundColor = "#1543a5";
    // }

    fetch(
      "https://v6.exchangerate-api.com/v6/89458816db95447c76368015/latest/USD"
    )
      .then((response) => response.json())
      .then((data) => {
        const rates = data.conversion_rates;

        //To get the key from the api
        for (const key in rates) {
          option = document.createElement("option");
          option.value = key;
          option.textContent = key;
          select.appendChild(option);
        }

        // select.onchange = () => {

        document.getElementById("amount").onkeyup = () => {
          const button = (document.getElementById("bttn").disabled = false);

          document.querySelector("form").onsubmit = (event) => {
            event.preventDefault();

            const selectedCurrency = select.value;

            let api = data.conversion_rates[select.value];
            //   rates[selectedCurrency];
            const input = document.getElementById("amount").value;
            //   console.log(input)
            let USD = `${input} ${selectedCurrency} is equivalent to $${(
              input / api
            ).toFixed(2)} USD`;

            result.innerHTML = USD;
            //   result.style.color = 'red'
            result.style.marginTop = "20px";
            result.style.boxShadow = "0px 0px 5px #666565";
            result.style.padding = "10px 25px";
            result.style.maxWidth = "270px";
            result.style.textAlign = "center";
            result.style.borderRadius = '5px'
            result.style.backgroundColor ='#e7e9f046'
            result.style.border = 'none'

            if (/[^0-9]/.test(input)) {
              result.innerHTML = "Invalid Input. please enter a number";
            }
          };
        };

        // };
      });
  } catch (error) {
    result.innerHTML = "Error fetching data, try again";
  }
});

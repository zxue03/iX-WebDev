const countryInput = document.getElementById("countryname");
countryInput.addEventListener("keyup", searchForCountry);

async function searchForCountry(event) {
  event.preventDefault();

  const countryname = event.target.value;

  const URL = `https://restcountries.eu/rest/v2/name/${countryname}?fullText=true`;
  console.log(URL);

  try {
    const response = await fetch(URL);
    const countryData = await response.json();
    console.log("Data: ", countryData);

    const result = document.getElementById("result");
    result.innerHTML = `
        <div>${countryData[0].capital}</div>
        <br>
        <img src=${countryData[0].flag} style="width: 20%; height: 20%">
      `;
  } catch (err) {
    console.log("Aww...", err);
  }
}

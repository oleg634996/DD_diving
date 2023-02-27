const data = document.querySelector("h1");
const selectHeight = document.querySelector(".height");
const selectPosition = document.querySelector(".position");
const input = document.querySelector("input");
const text = document.querySelector("p");
const modalSum = document.querySelector(".modal-sum");
const inputRating = document.querySelectorAll('.input-rating')
const score = document.querySelector('.score')


selectHeight.onchange = (event) => {
  selectValue(event);
};
selectPosition.onchange = (event) => {
  selectPos(event);
};
const DD = async () => {
  const response = await (await fetch("./index.json")).json();
  return response;
};
///////////////SELECT HEIGHT DIVE ////////////////
const selectValue = (event) => {
  optionValue = event.target.value;

  DD().then((data) => {
    const currentObject = data.find((elem) => {
      return elem[optionValue];
    });

    selectPosition.onchange = (event) => {
      selectPos(event, currentObject);
    };
  });
};
//////////////////  SELECT POSITION DIVE ///////////
const selectPos = (event, data) => {
  optionValue = event.target.value;
  const positionKey = Object.values(data);
  const positionObject = positionKey[0][optionValue];

  if (positionObject !== undefined) {
    input.removeAttribute("disabled");
  } else {
    input.setAttribute("disabled", "true");
  }

  input.oninput = (event) => {
    inputSearch(positionObject, event);
  };
};
////////////// INPUT DIVE ///////////////////
const inputSearch = (data, event) => {
  const inputValue = event.target.value;

  if (data[inputValue] === undefined) {
    return (text.innerHTML = "Стрибок не найдено");
  }
  text.innerHTML = `коефіціент ${data[inputValue]}`;
  ratingDive(data[inputValue])
};
//////////////////INPUT RATING DIVE ////////////////
 const ratingDive = (value )=>{
  var sum = 0
  let array = [...inputRating].map((event)=>{
    event.onchange = (event)=> {
     let sumRating= sum += Number(event.target.value)
    //  sumRating *= Number(value)
     score.innerHTML = sumRating *= Number(value)
      console.log(sumRating)
      }
  })
 }
// const ratingDive = (event)=>{
//   console.log(event)

// }
// event.onchange = (event)=> {
//   sum =+ event.target.value
//   }

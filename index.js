const data = document.querySelector("h1");
const selectHeight= document.querySelector(".height");
const selectPosition = document.querySelector('.position')
const input = document.querySelector('input')
const text = document.querySelector('p')


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



const selectValue = (event) => {
  optionValue = event.target.value;
  // console.log(optionValue);

  DD().then((data) => {
    const currentObject = data.find((elem) => { 
      return elem[optionValue]
    });
  
    selectPosition.onchange = (event) => {
      selectPos(event,currentObject);

    };
    
  });
};


const selectPos = (event, data)=> {
  optionValue = event.target.value;
  const positionKey  = Object.values(data)
  const positionObject = positionKey[0][optionValue]
 
    if(positionObject !== undefined){
      input.removeAttribute('disabled')
    }else{
      input.setAttribute('disabled','true')
    }

  input.oninput = (event)=>{
     inputSearch(positionObject, event)
  }

} 

const inputSearch = (data,event)=>{
  const inputValue = event.target.value
  if(data[inputValue] === undefined){
    return  text.innerHTML = 'Стрибок не найдено'
  }
  text.innerHTML = data[inputValue]

}
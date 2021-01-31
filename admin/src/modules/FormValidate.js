
export default function FormValidate(invalid, type) { 
  if(type === 'step1') {
    Object.keys(invalid).map(
      (i, key) => {
        if(invalid[i] === '') {
          let element = document.getElementById(i);
          let element_icon = document.getElementById(i + '_icon');
          element.style.color = "#e36565";
          element.style.fontWeight = 'bold';
          element_icon.style.color = "#e36565";
        }
        else {
          let element_icon = document.getElementById(i + '_icon');
          let element = document.getElementById(i);
          element.style.color = "#989898";
          element.style.fontWeight = 'normal';
          element_icon.style.color = "#DBDBDB";
        }
      }
    )
  }
  else if(type === 'step2') {
    console.log(invalid.confirmpassword === invalid.password)
    Object.keys(invalid).map(
      (i, key) => {
        if(invalid[i] === '') {
          let element = document.getElementById(i);
          let element_icon = document.getElementById(i + '_icon');
          element.style.color = "#e36565";
          element.style.fontWeight = 'bold';
          element_icon.style.color = "#e36565";
        }
        else {
          let element_icon = document.getElementById(i + '_icon');
          let element = document.getElementById(i);
          element.style.color = "#989898";
          element.style.fontWeight = 'normal';
          element_icon.style.color = "#DBDBDB";
        }
      }
    )
    if(invalid.email !== invalid.confirmemail || invalid.password !== invalid.confirmpassword) {
        if(invalid.email != invalid.confirmemail) {
          let element_icon = document.getElementById('confirmemail_icon');
          let element = document.getElementById('confirmemail');
          element.style.color = "#e36565";
          element.style.fontWeight = 'bold';
          element_icon.style.color = "#e36565";
        }
        else if(invalid.password != invalid.confirmpassword) {
        let element_icon = document.getElementById('confirmpassword_icon');
        let element = document.getElementById('confirmpassword');
        element.style.color = "#e36565";
        element.style.fontWeight = 'bold';
        element_icon.style.color = "#e36565";
      }
    } 
  }
}

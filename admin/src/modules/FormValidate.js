
export default function FormValidate(invalid) { 
  Object.keys(invalid).map(
      (i, key) => {
        if(invalid[i] == '') {
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

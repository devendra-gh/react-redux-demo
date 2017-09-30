const FormData = require('form-data');
export const formDataGenerator = (data) => {
  let formData = new FormData();
  data.map((obj)=>{
    formData.append(obj.key,obj.value);
  });
  return formData;
};

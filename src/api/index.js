import request, { POST, DELETE } from 'api/request';

const user_Infos = request('/user_Infos');
const get_material = request('/batchget_material');
// const user_Infos = request('/user_Infos');

// const fetchResourceApplication = request('/account/create_application', POST);


export {
  user_Infos,
  get_material
};
